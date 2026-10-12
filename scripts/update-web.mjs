import { execSync } from 'child_process';

console.log("🚀 Memulai proses sinkronisasi dan update website...\n");

try {
  // 1. Jalankan sinkronisasi Google Drive
  execSync('node scripts/sync-drive-images.mjs', { stdio: 'inherit' });

  // 2. Cek apakah ada file yang berubah
  const status = execSync('git status --porcelain', { encoding: 'utf-8' }).trim();

  if (!status) {
    console.log("\n✨ Tidak ada perubahan baru. Website Anda sudah menggunakan versi paling mutakhir.");
    process.exit(0);
  }

  // 3. Commit dan push ke GitHub untuk memicu deploy Vercel otomatis
  console.log("\n📦 Menyimpan perubahan dan mengirim ke website online (Vercel)...");
  execSync('git add -A', { stdio: 'inherit' });
  const commitMsg = `Update portofolio dari Google Drive (${new Date().toLocaleDateString('id-ID')})`;
  execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });

  console.log("\n=======================================================");
  console.log("🎉 BERHASIL! Website sedang diperbarui otomatis oleh Vercel.");
  console.log("👉 Buka link website Anda dalam 1-2 menit untuk melihat hasilnya.");
  console.log("=======================================================\n");
} catch (error) {
  console.error("\n❌ Terjadi kesalahan saat update:", error.message);
  process.exit(1);
}
