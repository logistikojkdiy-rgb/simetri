# 🔒 SIMETRI (Sistem Inspeksi, Manajemen & Evaluasi Terpadu Rekam Inventaris)

> **⚠️ PERINGATAN KERAHASIAAN (CONFIDENTIALITY NOTICE)**
> Repositori ini dan seluruh kode sumber di dalamnya bersifat **Sangat Rahasia (Strictly Confidential)** dan merupakan hak milik eksklusif **Otoritas Jasa Keuangan (OJK) Provinsi Daerah Istimewa Yogyakarta** (dikelola oleh Tim LMSt). Dilarang keras melakukan *cloning*, distribusi, modifikasi, atau penggunaan kode ini oleh pihak yang tidak memiliki otorisasi tertulis dari instansi terkait.

---

## 📌 Deskripsi Sistem

**SIMETRI** adalah aplikasi web tertutup berformat *Progressive Web App* (PWA) yang dirancang khusus untuk digitalisasi proses inspeksi, validasi, dan pelaporan Barang Milik Negara (BMN) di lingkungan internal OJK DIY. 

Aplikasi ini menggunakan arsitektur *Decoupled Serverless*, di mana *frontend* berbasis HTML/Vanilla JS murni di-hosting secara statis, dan berinteraksi secara aman dengan *backend* tertutup menggunakan endpoint eksekusi Google Apps Script (GAS).

## 🛡️ Hak Akses & Autentikasi (RBAC)

Akses ke dalam sistem SIMETRI dibatasi secara ketat melalui protokol *Role-Based Access Control*. Pendaftaran akun baru harus melalui proses persetujuan (Validasi) oleh Administrator.

*   **Super Admin**: Akses absolut terhadap manajemen pengguna, validasi pendaftaran, pengaturan API, manajemen *Signatories* (Penandatangan DBR), dan seluruh fitur operasional.
*   **Supervisor**: Hak akses analitik untuk memonitor progres inspeksi aset secara *live*, memvalidasi pengajuan kendala aset (rusak/pindah), export rekapitulasi (PDF/Excel), dan pencetakan Daftar Barang Ruangan (DBR).
*   **Petugas**: Hak akses operasional lapangan untuk mengeksekusi inspeksi aset menggunakan *Native Mobile Barcode/QR Scanner* dan mengajukan laporan kendala aset fisik.

## ⚙️ Spesifikasi Teknis Internal

*   **Platform**: Progressive Web App (PWA) - Mendukung *caching offline* parsial dan instalasi *native* di iOS/Android.
*   **Frontend**: Vanilla JS (ES6+), HTML5, Custom CSS Grid. Zero dependencies (Tanpa NPM, React, atau framework eksternal) untuk meminimalkan *attack surface*.
*   **Hardware Interface**: Menggunakan protokol `navigator.mediaDevices` dan `BarcodeDetector API` untuk inspeksi fisik via kamera perangkat.
*   **Data Sync**: Menggunakan algoritma sinkronisasi halus (*soft-refresh*) dengan latensi monitoring maksimal 10 detik.

## 🛠️ Prosedur Deployment & Pemeliharaan (Khusus Tim IT)

Karena aplikasi berjalan sebagai layanan statis yang membutuhkan izin akses perangkat keras (Kamera), kode ini **harus** di-*deploy* pada environment berbasis **HTTPS**.

1.  **Pembaruan Kode**:
    Setiap perubahan antarmuka atau logika bisnis dilakukan langsung pada file `index.html`. Tidak ada proses *build* atau *compilation*.
2.  **Konfigurasi Endpoint Backend**:
    Pembaruan URL Google Apps Script hanya boleh dilakukan oleh *Lead Developer* melalui variabel konfigurasi berikut:
    
```javascript
    const CONFIG = {
      DATA_MODE: "real",
      API_BASE_URL: "[REDACTED_INTERNAL_GAS_MACRO_URL]",
      LIVE_INTERVAL_MS: 10000,
      REAL_SCAN_ONLY: true
    };
    ```
    *Dilarang keras mengekspos URL backend di luar repositori ini.*
3.  **Deployment (GitHub Pages/Internal Server)**:
    Pastikan repositori disetel ke **Private**. Jika menggunakan GitHub Pages untuk hosting *frontend*, pastikan visibilitas halaman diatur dengan benar dan terhubung dengan domain internal (jika ada). Proses *push* ke *branch* `main` akan secara otomatis memperbarui *cache* PWA pengguna setelah *reload*.

## 📞 Dukungan Teknis

Untuk kendala operasional, pengaturan ulang kata sandi tingkat lanjut, atau laporan *bug* sistem, silakan hubungi:
**Tim Manajemen Sistem & Logistik (LMSt) - OJK DIY**
*Informasi kontak internal tersedia pada direktori kepegawaian kantor.*

---
*Copyright © 2026 Otoritas Jasa Keuangan Daerah Istimewa Yogyakarta. All rights reserved.*
