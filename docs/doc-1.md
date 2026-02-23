# Panduan Menjalankan Proyek Jadwal Shalat

Dokumen ini menjelaskan langkah-langkah untuk menyiapkan lingkungan pengembangan, menjalankan aplikasi, dan mengeksekusi pengujian otomatis.

## 📋 Prasyarat
Sebelum memulai, pastikan Anda telah menginstal:
1. **Node.js** (Versi 18 atau lebih baru) untuk menjalankan fitur pengujian.
2. **Web Browser** modern (Chrome, Edge, Firefox, dll).
3. **VS Code** (Sangat disarankan) dengan ekstensi "Live Server".

---

## 🚀 Langkah Instalasi
1.  **Clone atau Unduh Proyek**:
    Pastikan semua file berada dalam satu folder kerja.
2.  **Instalasi Dependencies**:
    Buka terminal di folder proyek dan jalankan perintah:
    ```bash
    npm install
    ```
    *Langkah ini hanya perlu dilakukan satu kali untuk mengunduh library pengujian (Vitest & JSDOM).*

---

## 💻 Menjalankan Aplikasi
### Metode A: Menggunakan Live Server (Direkomendasikan)
1. Buka folder proyek di VS Code.
2. Klik kanan pada `index.html`.
3. Pilih **"Open with Live Server"**.
*Metode ini memastikan fitur modul ES JavaScript berjalan dengan lancar.*

### Metode B: Membuka File Langsung
1. Klik dua kali pada file `index.html`.
*Catatan: Beberapa browser mungkin membatasi fitur tertentu karena kebijakan keamanan saat membuka file lokal secara langsung.*

---

## 🧪 Menjalankan Pengujian Otomatis
Proyek ini dilengkapi dengan unit testing untuk memverifikasi logika Iqomah.
1. Buka terminal.
2. Jalankan perintah:
    ```bash
    npm test
    ```
3. Hasil tes akan muncul di terminal, menunjukkan status keberhasilan fitur.

---

## 📂 Struktur Penting
- `index.html`: Halaman utama dashboard.
- `js/script.js`: Logika utama tampilan dan pembaruan waktu.
- `js/iqomah.js`: Logika khusus hitung mundur Iqomah.
- `js/iqomah.test.js`: File skenario pengujian otomatis.
