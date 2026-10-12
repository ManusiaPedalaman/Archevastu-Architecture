import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Config file path
const configPath = path.join(rootDir, 'drive-sync-config.json');
let config = {
  driveFolderPath: "G:\\My Drive\\WEB DATA",
  autoConvertWebp: true,
  quality: 80,
  defaultCategory: "Residensial"
};

if (fs.existsSync(configPath)) {
  try {
    const rawConfig = fs.readFileSync(configPath, 'utf-8');
    config = { ...config, ...JSON.parse(rawConfig) };
  } catch (err) {
    console.warn("⚠️ Warning: Failed to parse drive-sync-config.json, using defaults.");
  }
}

// Override via env variable if present
if (process.env.DRIVE_FOLDER_PATH) {
  config.driveFolderPath = process.env.DRIVE_FOLDER_PATH;
}

const projectsFilePath = path.join(rootDir, 'src', 'data', 'projects.ts');
const targetImgRootDir = path.join(rootDir, 'src', 'image', 'img');

console.log("==========================================");
console.log("📷 ARCHEVASTU - GOOGLE DRIVE IMAGE SYNC");
console.log("==========================================");
console.log(`📂 Scanning Drive Folder: "${config.driveFolderPath}"`);
console.log(`🖼️  Target Image Root:   "${targetImgRootDir}"`);

// Helper to sanitize variable names for imports
function sanitizeVarName(str) {
  return str.replace(/[^a-zA-Z0-9]/g, '_').replace(/^([0-9])/, '_$1');
}

// Helper to sanitize folder name
function sanitizeFolderName(str) {
  return str.trim().replace(/['"]/g, '').replace(/[/\\?%*:|"<>]/g, '_');
}

// Supported image extensions
const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tiff'];

// Smart folder collector: supports both direct project folders and categorized folders (LANSKAP, RESIDENSIAL, KOMERSIAL)
function collectProjectFolders(baseDir) {
  const list = [];
  if (!fs.existsSync(baseDir)) return list;

  const entries = fs.readdirSync(baseDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const fullPath = path.join(baseDir, entry.name);

    // Check if this folder directly contains image files
    let subFiles = [];
    try {
      subFiles = fs.readdirSync(fullPath, { withFileTypes: true });
    } catch (e) {
      continue;
    }

    const hasImagesDirectly = subFiles.some(f => !f.isDirectory() && VALID_EXTENSIONS.includes(path.extname(f.name).toLowerCase()));

    if (hasImagesDirectly) {
      list.push({
        projectName: entry.name,
        projectPath: fullPath,
        category: config.defaultCategory
      });
    } else {
      // Check if this is a Category folder (e.g. LANSKAP, RESIDENSIAL, KOMERSIAL) containing project subfolders
      const rawCat = entry.name.toLowerCase();
      let detectedCategory = config.defaultCategory;
      if (rawCat.includes('lanskap')) detectedCategory = 'Lanskap';
      else if (rawCat.includes('residensial')) detectedCategory = 'Residensial';
      else if (rawCat.includes('komersial')) detectedCategory = 'Komersial';
      else if (rawCat.includes('interior')) detectedCategory = 'Interior';

      for (const sub of subFiles) {
        if (!sub.isDirectory()) continue;
        const subPath = path.join(fullPath, sub.name);
        let projectFiles = [];
        try {
          projectFiles = fs.readdirSync(subPath, { withFileTypes: true });
        } catch (e) {
          continue;
        }

        const projectHasMedia = projectFiles.some(f => !f.isDirectory() && (VALID_EXTENSIONS.includes(path.extname(f.name).toLowerCase()) || path.extname(f.name).toLowerCase() === '.mp4'));

        if (projectHasMedia) {
          list.push({
            projectName: sub.name,
            projectPath: subPath,
            category: detectedCategory
          });
        }
      }
    }
  }

  return list;
}

async function processDriveSync() {
  if (!fs.existsSync(config.driveFolderPath)) {
    console.log(`\n❌ Folder Drive tidak ditemukan pada path: "${config.driveFolderPath}"`);
    console.log("👉 Pastikan Google Drive for Desktop aktif dan path pada drive-sync-config.json sudah tepat.\n");
    return;
  }

  const projectFolders = collectProjectFolders(config.driveFolderPath);

  if (projectFolders.length === 0) {
    console.log("\nℹ️ Tidak ada subfolder proyek dengan gambar di dalam folder Drive.");
    console.log("💡 Tips: Masukkan folder proyek dengan file gambar (.jpg / .png) ke dalam Google Drive.");
    return;
  }

  console.log(`\n📁 Ditemukan ${projectFolders.length} folder proyek di Google Drive.`);

  // Ensure target root exists
  if (!fs.existsSync(targetImgRootDir)) {
    fs.mkdirSync(targetImgRootDir, { recursive: true });
  }

  // Read current projects.ts
  let projectsContent = fs.readFileSync(projectsFilePath, 'utf-8');
  let totalNewImages = 0;

  for (const proj of projectFolders) {
    console.log(`\n🔍 Memproses proyek: "${proj.projectName}" [Kategori: ${proj.category}]...`);

    const targetProjectDir = path.join(targetImgRootDir, proj.category, sanitizeFolderName(proj.projectName));
    if (!fs.existsSync(targetProjectDir)) {
      fs.mkdirSync(targetProjectDir, { recursive: true });
      console.log(`   📁 Membuat folder target: "${targetProjectDir}"`);
    }

    const driveFiles = fs.readdirSync(proj.projectPath, { withFileTypes: true });
    const imageFiles = driveFiles.filter(f => !f.isDirectory() && VALID_EXTENSIONS.includes(path.extname(f.name).toLowerCase())).map(f => f.name);
    const videoFiles = driveFiles.filter(f => !f.isDirectory() && path.extname(f.name).toLowerCase() === '.mp4').map(f => f.name);

    // Copy video files if present
    for (const vFile of videoFiles) {
      const vSrc = path.join(proj.projectPath, vFile);
      const vDst = path.join(targetProjectDir, vFile);
      if (!fs.existsSync(vDst)) {
        fs.copyFileSync(vSrc, vDst);
        console.log(`   🎥 Video disalin: ${vFile}`);
      }
    }

    if (imageFiles.length === 0) {
      console.log(`   - Belum ada file gambar di folder "${proj.projectName}".`);
      continue;
    }

    const projectImagesAdded = [];

    for (const file of imageFiles) {
      const sourcePath = path.join(proj.projectPath, file);
      const fileParsed = path.parse(file);
      const targetFileName = `${fileParsed.name}.webp`;
      const targetFilePath = path.join(targetProjectDir, targetFileName);

      const relPathFromSrc = path.relative(path.join(rootDir, 'src'), targetFilePath).replace(/\\/g, '/');
      const importAliasPath = `@/${relPathFromSrc}`;

      let needsCopy = !fs.existsSync(targetFilePath);
      if (!needsCopy) {
        const srcStat = fs.statSync(sourcePath);
        const tgtStat = fs.statSync(targetFilePath);
        if (srcStat.mtimeMs > tgtStat.mtimeMs) {
          needsCopy = true;
        }
      }

      if (needsCopy) {
        console.log(`   ✨ Mengompres gambar: ${file} -> ${targetFileName}`);
        try {
          const inputBytes = fs.readFileSync(sourcePath);
          if (config.autoConvertWebp) {
            await sharp(inputBytes)
              .resize({ width: 1920, withoutEnlargement: true })
              .webp({ quality: config.quality || 80, effort: 4 })
              .toFile(targetFilePath);
          } else {
            fs.copyFileSync(sourcePath, targetFilePath);
          }
          console.log(`   ✅ Tersimpan di: ${importAliasPath}`);
        } catch (err) {
          console.error(`   ❌ Gagal memproses gambar ${file}:`, err.message);
          continue;
        }
      }

      projectImagesAdded.push({
        fileName: targetFileName,
        aliasPath: importAliasPath,
        varName: sanitizeVarName(`${proj.projectName}_${fileParsed.name}_webp`)
      });
    }

    if (projectImagesAdded.length > 0) {
      totalNewImages += projectImagesAdded.length;

      // Add imports to projects.ts
      for (const item of projectImagesAdded) {
        if (!projectsContent.includes(item.aliasPath)) {
          const importStatement = `import ${item.varName} from "${item.aliasPath}";\n`;
          projectsContent = importStatement + projectsContent;
        }
      }

      // Check if project exists in projects.ts
      const projClean = proj.projectName.toLowerCase().replace(/[-_]/g, ' ').trim();
      const projectMatches = (title) => {
        const clean = title.toLowerCase().replace(/[-_]/g, ' ').trim();
        return clean === projClean || clean.includes(projClean) || projClean.includes(clean);
      };

      // Match against known project titles
      const knownProjects = [
        { key: 'jengki', pattern: /title:\s*["']The Modern Jengki["']/i },
        { key: 'lcalme', pattern: /title:\s*["']L['’]Calme["']/i },
        { key: 'landscape', pattern: /title:\s*["']Zen Garden Estate["']/i }
      ];

      let matchedKey = null;
      if (projClean.includes('jengki')) matchedKey = 'jengki';
      else if (projClean.includes('calme')) matchedKey = 'lcalme';
      else if (projClean.includes('landscape') || projClean.includes('cw2')) matchedKey = 'landscape';

      const renderVars = projectImagesAdded.map(img => `      getMediaUrl(${img.varName})`).join(',\n');
      const firstImageVar = `getMediaUrl(${projectImagesAdded[0].varName})`;

      if (matchedKey === 'jengki') {
        projectsContent = projectsContent.replace(
          /(title:\s*["']The Modern Jengki["'][\s\S]*?image:\s*)[^,\n]+/,
          `$1${firstImageVar}`
        ).replace(
          /(title:\s*["']The Modern Jengki["'][\s\S]*?renderPhotos:\s*\[)[\s\S]*?(\])/,
          `$1\n${renderVars}\n    $2`
        );
        console.log(`   🔄 Berhasil memperbarui gambar proyek "The Modern Jengki" di projects.ts`);
      } else if (matchedKey === 'lcalme') {
        projectsContent = projectsContent.replace(
          /(title:\s*["']L['’]Calme["'][\s\S]*?image:\s*)[^,\n]+/,
          `$1${firstImageVar}`
        ).replace(
          /(title:\s*["']L['’]Calme["'][\s\S]*?renderPhotos:\s*\[)[\s\S]*?(\])/,
          `$1\n${renderVars}\n    $2`
        );
        console.log(`   🔄 Berhasil memperbarui gambar proyek "L'Calme" di projects.ts`);
      } else if (matchedKey === 'landscape') {
        projectsContent = projectsContent.replace(
          /(title:\s*["']Zen Garden Estate["'][\s\S]*?image:\s*)[^,\n]+/,
          `$1${firstImageVar}`
        ).replace(
          /(title:\s*["']Zen Garden Estate["'][\s\S]*?renderPhotos:\s*\[)[\s\S]*?(\])/,
          `$1\n${renderVars}\n    $2`
        );
        console.log(`   🔄 Berhasil memperbarui gambar proyek "Zen Garden Estate" di projects.ts`);
      } else {
        // Check if project title already in file
        const titleRegex = new RegExp(`title:\\s*["']${proj.projectName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i');
        if (!titleRegex.test(projectsContent)) {
          const idMatches = [...projectsContent.matchAll(/id:\s*(\d+)/g)];
          const maxId = idMatches.length > 0 ? Math.max(...idMatches.map(m => parseInt(m[1]))) : 0;
          const newId = maxId + 1;

          const newProjectBlock = `  {
    id: ${newId},
    title: "${proj.projectName}",
    category: "${proj.category}",
    description: "Proyek arsitektur ${proj.projectName} dengan pendekatan desain kontemporer dan fungsional.",
    image: ${firstImageVar},
    tags: ["Modern", "Architecture", "${proj.category}"],
    videoUrl: "",
    renderPhotos: [
${renderVars}
    ],
    story: "Proyek ${proj.projectName} dirancang dengan filosofi keharmonisan ruang, integrasi pencahayaan alami, dan efisiensi fungsional.",
    location: "Indonesia",
    year: "${new Date().getFullYear()}",
    area: "-",
    client: "${proj.projectName}"
  },\n`;

          projectsContent = projectsContent.replace(
            /export const projects:\s*Project\[\]\s*=\s*\[/,
            `export const projects: Project[] = [\n${newProjectBlock}`
          );
          console.log(`   ✨ Berhasil mendaftarkan proyek baru "${proj.projectName}" (ID: ${newId}) ke projects.ts`);
        } else {
          console.log(`   📝 Proyek "${proj.projectName}" sudah terdaftar di projects.ts.`);
        }
      }
    }
  }

  // Save updated projects.ts
  fs.writeFileSync(projectsFilePath, projectsContent, 'utf-8');
  console.log(`\n==========================================`);
  console.log(`🎉 Selesai! Total gambar diproses/disinkronkan: ${totalNewImages}`);
  console.log(`==========================================\n`);
}

processDriveSync().catch(err => {
  console.error("❌ Error saat menjalankan sync:", err);
});
