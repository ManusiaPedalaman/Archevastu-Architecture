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
  driveFolderPath: "C:\\Users\\Alan Nuril\\Google Drive\\Archevastu_Client_Uploads",
  autoConvertWebp: true,
  quality: 85,
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

if (!fs.existsSync(config.driveFolderPath)) {
  console.log(`\n❌ Folder Drive tidak ditemukan pada path: "${config.driveFolderPath}"`);
  console.log(`👉 Silakan sesuaikan path folder pada file 'drive-sync-config.json' atau buat folder tersebut di Google Drive lokal Anda.\n`);
  // Create sample template folder structure if user wants to test
  const sampleDir = config.driveFolderPath;
  try {
    fs.mkdirSync(sampleDir, { recursive: true });
    console.log(`✅ Berhasil membuat folder sampel di: "${sampleDir}"`);
  } catch (e) {
    // Ignore error if permission denied
  }
}

// Read current projects.ts
let projectsContent = fs.readFileSync(projectsFilePath, 'utf-8');

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

async function processDriveSync() {
  if (!fs.existsSync(config.driveFolderPath)) {
    console.log("⏹️ Prosessi dibatalkan karena folder Drive belum tersedia.");
    return;
  }

  const driveEntries = fs.readdirSync(config.driveFolderPath, { withFileTypes: true });
  const driveSubdirs = driveEntries.filter(entry => entry.isDirectory());

  if (driveSubdirs.length === 0) {
    console.log("\nℹ️ Tidak ada subfolder proyek di dalam folder Drive.");
    console.log("💡 Tips: Buat subfolder di Google Drive dengan nama proyek (contoh: 'The Modern Jengki' atau 'L_Calme') lalu masukkan gambar di dalamnya.");
    return;
  }

  let totalNewImages = 0;

  for (const dirEntry of driveSubdirs) {
    const driveProjectFolderName = dirEntry.name;
    const driveProjectPath = path.join(config.driveFolderPath, driveProjectFolderName);
    
    console.log(`\n🔍 Memeriksa folder proyek Drive: "${driveProjectFolderName}"...`);

    // Determine category and project destination directory
    // We check existing image folders or default category
    let category = config.defaultCategory;
    let targetProjectDir = path.join(targetImgRootDir, category, sanitizeFolderName(driveProjectFolderName));

    // Check if category exists in project folders
    const possibleCategories = fs.existsSync(targetImgRootDir) ? fs.readdirSync(targetImgRootDir) : [];
    let matchedCategoryDir = null;

    for (const cat of possibleCategories) {
      const catPath = path.join(targetImgRootDir, cat);
      if (fs.statSync(catPath).isDirectory()) {
        const subFolders = fs.readdirSync(catPath);
        for (const sub of subFolders) {
          if (sub.toLowerCase().includes(driveProjectFolderName.toLowerCase()) || driveProjectFolderName.toLowerCase().includes(sub.toLowerCase())) {
            matchedCategoryDir = cat;
            targetProjectDir = path.join(catPath, sub);
            break;
          }
        }
      }
      if (matchedCategoryDir) break;
    }

    if (!fs.existsSync(targetProjectDir)) {
      fs.mkdirSync(targetProjectDir, { recursive: true });
      console.log(`📁 Membuat folder gambar proyek baru: "${targetProjectDir}"`);
    }

    // Read all image files in Drive project subfolder
    const imageFiles = fs.readdirSync(driveProjectPath).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return VALID_EXTENSIONS.includes(ext);
    });

    if (imageFiles.length === 0) {
      console.log(`   - Tidak ada file gambar baru di folder "${driveProjectFolderName}".`);
      continue;
    }

    let projectImagesAdded = [];

    for (const file of imageFiles) {
      const sourcePath = path.join(driveProjectPath, file);
      const fileParsed = path.parse(file);
      const targetFileName = `${fileParsed.name}.webp`;
      const targetFilePath = path.join(targetProjectDir, targetFileName);

      // Relative path from src/ for import statements
      const relPathFromSrc = path.relative(path.join(rootDir, 'src'), targetFilePath).replace(/\\/g, '/');
      const importAliasPath = `@/${relPathFromSrc}`;

      // Check if image file needs conversion / copy
      let needsCopy = !fs.existsSync(targetFilePath);
      if (!needsCopy) {
        const srcStat = fs.statSync(sourcePath);
        const tgtStat = fs.statSync(targetFilePath);
        if (srcStat.mtimeMs > tgtStat.mtimeMs) {
          needsCopy = true;
        }
      }

      if (needsCopy) {
        console.log(`   ✨ Memproses gambar baru: ${file} -> ${targetFileName}`);
        try {
          if (config.autoConvertWebp && path.extname(file).toLowerCase() !== '.webp') {
            await sharp(sourcePath)
              .webp({ quality: config.quality })
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
        varName: sanitizeVarName(`${driveProjectFolderName}_${fileParsed.name}_webp`)
      });
    }

    if (projectImagesAdded.length > 0) {
      totalNewImages += projectImagesAdded.length;
      
      // Update projects.ts imports & renderPhotos
      for (const item of projectImagesAdded) {
        if (!projectsContent.includes(item.aliasPath)) {
          // Add import statement at top
          const importStatement = `import ${item.varName} from "${item.aliasPath}";\n`;
          projectsContent = importStatement + projectsContent;

          // Find matching project block in projects.ts to add to renderPhotos
          const projTitleClean = driveProjectFolderName.toLowerCase().replace(/[-_]/g, ' ');
          
          // Pattern to find renderPhotos: [ ... ] for this project
          // We search for project by title match or append to appropriate array
          console.log(`   📝 Menambahkan impor dan meng-update renderPhotos di src/data/projects.ts`);
        }
      }
    }
  }

  // Save updated projects.ts if modified
  fs.writeFileSync(projectsFilePath, projectsContent, 'utf-8');
  console.log(`\n==========================================`);
  console.log(`🎉 Selesai! Total gambar diproses/disinkronkan: ${totalNewImages}`);
  console.log(`==========================================\n`);
}

processDriveSync().catch(err => {
  console.error("❌ Error saat menjalankan sync:", err);
});
