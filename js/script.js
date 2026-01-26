document.addEventListener("DOMContentLoaded", () => {
  const els = {
    loc: document.getElementById("lokasi"),
    date: document.getElementById("tanggal-hari-ini"),
    hijri: document.getElementById("tanggal-hijri"),
    clock: document.getElementById("live-clock"),
    prayers: {
      Subuh: document.getElementById("subuh"),
      Syuruq: document.getElementById("dhuha"),
      Dzuhur: document.getElementById("dzuhur"),
      Ashar: document.getElementById("ashar"),
      Maghrib: document.getElementById("maghrib"),
      Isya: document.getElementById("isya")
    }
  };

  let prayerTimes = null, coords = { lat: -6.5971, lng: 106.7873 }; // Default to Bogor

  setInterval(() => {
    els.clock.textContent = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).replace(/\./g, ":");
  }, 1000);

  els.date.textContent = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });

  const fetchTimes = async (lat, lng, city) => {
    try {
      const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=23`);
      const data = await res.json();
      const t = data.data.timings;
      const hDate = data.data.date.hijri;

      prayerTimes = {
        Subuh: t.Fajr,
        Syuruq: t.Sunrise,
        Dzuhur: t.Dhuhr,
        Ashar: t.Asr,
        Maghrib: t.Maghrib,
        Isya: t.Isha
      };

      Object.entries(prayerTimes).forEach(([k, v]) => {
        if (els.prayers[k]) els.prayers[k].textContent = v;
      });

      els.hijri.textContent = `${hDate.day} ${hDate.month.en} ${hDate.year} H`;
      els.loc.textContent = city;
      startCountdown();
    } catch (e) {
      console.error("Error:", e);
    }
  };

  const startCountdown = () => {
    if (!prayerTimes) return;
    const now = new Date(), today = now.toISOString().split("T")[0];
    const prayers = Object.entries(prayerTimes).map(([n, t]) => ({ name: n, time: t }));
    let next = null, last = null;

    for (let i = 0; i < prayers.length; i++) {
      const dt = new Date(`${today}T${prayers[i].time}:00`);
      if (dt > now) {
        next = prayers[i];
        last = i > 0 ? prayers[i - 1] : { name: "Isya", time: prayerTimes.Isya };
        break;
      }
    }

    if (!next) {
      next = { name: "Subuh", time: prayerTimes.Subuh };
      last = prayers[prayers.length - 1];
    }

    highlightCurrent(last.name);
  };

  const highlightCurrent = (name) => {
    document.querySelectorAll(".prayer-box").forEach(c => c.classList.remove("active"));
    document.querySelector(`.prayer-box[data-prayer="${name}"]`)?.classList.add("active");
  };

  const getLocation = async () => {
    if (!navigator.geolocation) return fetchTimes(coords.lat, coords.lng, "Bogor");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      fetchTimes(lat, lng, "Bogor"); // For simplicity keep Bogor as school location
    }, () => fetchTimes(coords.lat, coords.lng, "Bogor"));
  };

  getLocation();
});
