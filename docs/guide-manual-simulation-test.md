# Dokumentasi Stash: cek manual fungsi iqamah

Dokumen ini mencatat perubahan yang disimpan dalam Git Stash dengan nama **"cek manual fungsi iqamah"**. Perubahan ini ditujukan untuk melakukan pengujian manual fitur Iqomah tanpa menunggu waktu sholat asli.

## Daftar Perubahan

### 1. File: `js/iqomah.js`
- **Tujuan**: Mempercepat durasi tunggu Iqomah untuk simulasi.
- **Perubahan**: Mengubah durasi `Dzuhur` dari **10 menit** menjadi **1 menit**.
- **Kode**:
  ```javascript
  // Sebelum
  export const iqDurations = { Subuh: 12, Dzuhur: 10, ... };
  // Sesudah
  export const iqDurations = { Subuh: 12, Dzuhur: 1, ... };
  ```

### 2. File: `js/script.js`
- **Tujuan**: Memanipulasi waktu sholat agar segera tercapai dan mempercepat pengecekan jadwal.
- **Perubahan A**: Menimpa waktu `Dzuhur` secara statis menjadi jam **11:43**.
  ```javascript
  // Sebelum
  Dzuhur: t.Dhuhr,
  // Sesudah
  Dzuhur: "11:43",
  ```
- **Perubahan B**: Mengubah interval pengecekan jadwal dari **60 detik** menjadi **1 detik** agar trigger iqomah lebih responsif saat waktu tercapai.
  ```javascript
  // Sebelum
  setInterval(startCountdown, 60000);
  // Sesudah
  setInterval(startCountdown, 1000);
  ```

---

## Cara Menggunakan Kembali
Untuk mengaplikasikan kembali perubahan ini dari stash, jalankan perintah:
```bash
git stash pop
```
*Atau jika Anda memiliki banyak stash:*
```bash
git stash apply stash@{0}
```

> [!WARNING]
> Jangan lupa untuk melakukan **revert** atau **git stash** kembali sebelum melakukan commit ke produksi, agar jadwal sholat tetap akurat sesuai API.
