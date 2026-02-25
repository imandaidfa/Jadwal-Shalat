# Durasi Muncul Pesan "Selamat menunaikan ibadah salat"

Pesan tersebut muncul setelah hitung mundur iqomah selesai. Durasi kemunculannya diatur di dalam file:

### 📍 Lokasi: `js/script.js`

Pada fungsi `triggerIqomah`, terdapat bagian `setTimeout` yang mengatur kapan pesan tersebut akan hilang (kembali ke tampilan utama):

```javascript
// js/script.js: L69-71
setTimeout(() => {
  document.getElementById("prayer-completion-overlay").classList.add("hidden");
}, 600000); // Back after 10 mins
```

### Detail Durasi:
- **Nilai di kode**: `600000` milidetik.
- **Konversi**: 600.000 ms = 600 detik = **10 menit**.

Jadi, pesan "Selamat menunaikan ibadah salat" akan muncul di layar selama **10 menit** sebelum layar kembali ke tampilan jadwal sholat utama.
