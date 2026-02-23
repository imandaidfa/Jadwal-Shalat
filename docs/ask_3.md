# Tanya Jawab: GitHub Pages vs Netlify

Pertanyaan: *Apakah projek sekarang bisa di-deploy di GitHub Action atau harus di Netlify?*

### Jawaban Singkat
**Bisa keduanya.** Projek Anda adalah aplikasi web statis (HTML, CSS, dan JS), sehingga bisa dideploy di hampir semua layanan hosting web modern, baik itu **GitHub Pages** (lewat GitHub Actions) maupun **Netlify**.

---

### 1. GitHub Pages (via GitHub Actions)
Karena kode Anda sudah ada di GitHub, ini adalah pilihan yang paling terintegrasi.
- **Kelebihan**: Gratis, terpadu dalam satu platform, dan bisa diotomatisasi dengan **GitHub Actions**.
- **Alur Kerja**: Kita bisa membuat konfigurasi agar setiap kali Anda melakukan `push`, GitHub Actions akan menjalankan **Unit Test** (`npm test`) terlebih dahulu. Jika tes lulus, maka aplikasi otomatis di-update ke publik.
- **Kesimpulan**: Sangat cocok jika Anda ingin menjaga semuanya dalam satu ekosistem GitHub.

### 2. Netlify
Netlify adalah salah satu platform hosting statis terpopuler di dunia.
- **Kelebihan**: Sangat mudah (tinggal hubungkan repositori), memiliki fitur *Preview Deploy* (melihat hasil sebelum digabung ke cabang utama), dan performa CDN yang sangat cepat secara global.
- **Alur Kerja**: Netlify akan mendeteksi perubahan di GitHub dan melakukan deploy otomatis.
- **Kesimpulan**: Sangat cocok jika Anda menginginkan fitur manajemen deploy yang lebih canggih dan antarmuka yang lebih ramah pengguna.

---

### Rekomendasi Saya
Untuk projek **Jadwal Shalat** ini:
1. Jika Anda ingin yang paling simpel dan menyatu dengan repositori: Gunakan **GitHub Pages**.
2. Jika Anda ingin performa terbaik dan fitur manajemen yang lebih modern: Gunakan **Netlify**.

**PENTING**: Karena fitur hitung mundur Iqomah kita sekarang menggunakan **ES Modules**, baik GitHub Pages maupun Netlify mendukungnya dengan sempurna karena keduanya menyediakan protokol `http://` yang dibutuhkan oleh browser.

---
> [!TIP]
> Saya bisa membantu membuatkan file konfigurasi GitHub Action (`.github/workflows/deploy.yml`) jika Anda memutuskan untuk menggunakan GitHub Pages.
