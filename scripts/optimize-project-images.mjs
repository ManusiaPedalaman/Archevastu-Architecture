import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const imgDir = path.join(rootDir, 'src', 'image', 'img');

const MAX_WIDTH = 1920;
const QUALITY = 80;

async function getAllImages(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(await getAllImages(fullPath));
    } else if (/\.(webp|jpg|jpeg)$/i.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

async function optimizeImages() {
  console.log('🚀 Memulai optimasi gambar di:', imgDir);
  const images = await getAllImages(imgDir);
  console.log(`📁 Ditemukan ${images.length} gambar (.webp / .jpg / .jpeg)`);

  let totalBefore = 0;
  let totalAfter = 0;
  let optimizedCount = 0;

  for (const file of images) {
    const fileBytes = fs.readFileSync(file);
    const sizeBefore = fileBytes.length;
    totalBefore += sizeBefore;

    try {
      const meta = await sharp(fileBytes).metadata();
      const needsResize = meta.width && meta.width > MAX_WIDTH;
      const isLarge = sizeBefore > 400 * 1024; // > 400KB

      if (needsResize || isLarge) {
        const relPath = path.relative(rootDir, file);
        console.log(`⏳ Memproses: ${relPath} (${meta.width}x${meta.height}, ${(sizeBefore / 1024 / 1024).toFixed(2)} MB)`);
        
        const ext = path.extname(file).toLowerCase();
        let pipeline = sharp(fileBytes);

        if (needsResize) {
          pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
        }

        let buffer;
        if (ext === '.webp') {
          buffer = await pipeline.webp({ quality: QUALITY, effort: 4 }).toBuffer();
        } else {
          buffer = await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();
        }

        if (buffer.length < sizeBefore) {
          fs.writeFileSync(file, buffer);
          totalAfter += buffer.length;
          optimizedCount++;
          console.log(`   ✅ Selesai: ${(sizeBefore / 1024 / 1024).toFixed(2)} MB -> ${(buffer.length / 1024 / 1024).toFixed(2)} MB (-${Math.round((1 - buffer.length / sizeBefore) * 100)}%)`);
        } else {
          totalAfter += sizeBefore;
          console.log(`   ⏭️ Sudah optimal, ukuran tidak bertambah kecil.`);
        }
      } else {
        totalAfter += sizeBefore;
      }
    } catch (err) {
      console.error(`   ❌ Gagal mengoptimasi ${file}:`, err.message);
      totalAfter += sizeBefore;
    }
  }

  console.log('\n==========================================');
  console.log(`🎉 Optimasi Gambar Selesai!`);
  console.log(`📊 Gambar yang dioptimasi: ${optimizedCount} dari ${images.length}`);
  console.log(`📉 Ukuran Sebelum: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📈 Ukuran Sesudah: ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💾 Menghemat: ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`);
  console.log('==========================================\n');
}

optimizeImages();
