# Penjelasan: Apa yang Terjadi saat "Open with Live Server"?

Saat Anda menggunakan fitur **"Open with Live Server"** di VS Code, aplikasi tidak lagi dibuka sebagai berkas biasa (`file:///...`), melainkan disajikan melalui server web lokal. Berikut adalah proses teknis yang terjadi di balik layar:

## 1. Pembuatan Server Lokal (HTTP Server)
Live Server menjalankan server web minimalis di komputer Anda. Alamatnya biasanya adalah `http://127.0.0.1:5500` atau `http://localhost:5500`.
- **Dulu**: Saat klik ganda `index.html`, Anda menggunakan protokol `file://`.
- **Sekarang**: Anda menggunakan protokol `http://`.

## 2. Mengatasi Kebijakan Keamanan (CORS & ES Modules)
Browser modern memiliki kebijakan keamanan yang sangat ketat. Salah satunya adalah melarang penggunaan fitur **ES Modules** (`import` dan `export` di JavaScript) jika file dibuka melalui protokol `file://`.
- **Proses**: Saat menggunakan Live Server, browser menganggap file tersebut berasal dari sumber yang valid (server), sehingga perintah `import { startIqomah } from "./iqomah.js";` diizinkan untuk berjalan.

## 3. Fitur Live Reload (WebSocket)
Inilah alasan utama fitur ini disebut "Live".
- **Injeksi Kode**: Live Server secara otomatis menyuntikkan (inject) sepotong kecil kode JavaScript ke dalam `index.html` Anda.
- **WebSocket**: Kode tersebut menjalin komunikasi "dua arah" dengan VS Code. Saat Anda menekan `Ctrl + S`, VS Code memberi tahu browser untuk segera melakukan penyegaran halaman tanpa Anda perlu menekan tombol refresh.

## 4. Penanganan Path (Alur Folder)
Dengan server, semua alamat file (gambar, css, js) dihitung dari "akar/root" folder proyek Anda. Ini mencegah masalah "file tidak ditemukan" yang sering terjadi jika file berada di dalam subfolder yang dalam.

---

### Kesimpulan
Live Server mengubah komputer Anda menjadi **server web pribadi**. Tanpa fitur ini, aplikasi modern yang menggunakan modul JavaScript (seperti aplikasi Jadwal Shalat Anda saat ini) tidak akan bisa berjalan karena diblokir oleh sistem keamanan browser.
