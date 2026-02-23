import { startIqomah } from "./iqomah.js";

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

  const triggerIqomah = (name) => {
    startIqomah(
      name,
      ({ timeLeft, motivation }) => {
        document.getElementById("iqomah-overlay").classList.remove("hidden");
        if (motivation) document.getElementById("iqomah-motivation").textContent = motivation;

        const m = Math.floor(timeLeft / 60), s = timeLeft % 60;
        document.getElementById("iqomah-min").textContent = String(m).padStart(2, "0");
        document.getElementById("iqomah-sec").textContent = String(s).padStart(2, "0");
      },
      () => {
        document.getElementById("iqomah-overlay").classList.add("hidden");
        document.getElementById("prayer-completion-overlay").classList.remove("hidden");
        setTimeout(() => {
          document.getElementById("prayer-completion-overlay").classList.add("hidden");
        }, 600000); // Back after 10 mins
      }
    );
  };

  const highlightCurrent = (name) => {
    Object.entries(els.prayers).forEach(([k, v]) => {
      v.parentElement.classList.toggle("active", k === name);
    });
  };

  const getLocation = async () => {
    if (!navigator.geolocation) return fetchTimes(coords.lat, coords.lng, "Bogor");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      fetchTimes(lat, lng, "Bogor");
    }, () => fetchTimes(coords.lat, coords.lng, "Bogor"));
  };

  const startCountdown = () => {
    if (!prayerTimes) return;
    const now = new Date(), today = now.toISOString().split("T")[0];
    const prayers = Object.entries(prayerTimes).map(([n, t]) => ({ name: n, time: t }));
    let next = null, last = null;

    for (let i = 0; i < prayers.length; i++) {
      const dt = new Date(`${today}T${prayers[i].time}:00`);

      // Trigger iqomah if exact time (or within 1 min if just loaded)
      const diff = Math.floor((now - dt) / 1000);
      if (diff >= 0 && diff < 60) {
        triggerIqomah(prayers[i].name);
      }

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

  setInterval(startCountdown, 60000); // Check every minute
  getLocation();
});
