SIMETRI FRONTEND v13 + BACKEND v7.3.1

PERBAIKAN FRONTEND
- Halaman scan dibangun ulang menjadi satu layout; kartu sesi, counter, daftar aset, dan aktivitas tidak lagi berulang atau tumpang tindih.
- Loading bergaya iOS dengan blur, spinner 12 segmen, progres halus, dan tampilan responsif.
- Kamera iPhone: secure-context check, fallback constraints, autoplay + muted + playsinline + webkit-playsinline, explicit video.play(), status izin, recovery dialog, foto kode fallback, dan input manual.
- Manifest PWA memakai id.html dan display standalone.

PENTING UNTUK IPHONE
- Buka melalui HTTPS.
- Berikan izin Kamera untuk Safari.
- Instal dari Safari ke Layar Utama.
- Setelah update, hapus PWA/cache lama dan pasang kembali.
- BarcodeDetector tidak tersedia di semua versi iOS; bila tidak tersedia gunakan Ambil Foto Kode atau Input Manual.

BACKEND
Gunakan Backend/Code.gs v7.3.1, jalankan setupPart17(), testPart17(), lalu deploy Web App versi baru.
