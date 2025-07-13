const hijriMonths = [
  "Muharram",
  "Safar",
  "Rabiul Awal",
  "Rabiul Akhir",
  "Jumadil Awal",
  "Jumadil Akhir",
  "Rajab",
  "Syaban",
  "Ramadhan",
  "Syawal",
  "Dzulqadah",
  "Dzulhijjah",
];

const hijriDays = [
  "Ahad",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export function formatGregorianDate(date) {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getHijriDate(date) {
  // Pastikan date adalah Date object valid
  if (!(date instanceof Date) || isNaN(date)) return "-";

  // Get Hijri date components
  const hijri = new Intl.DateTimeFormat("ar-SA-u-nu-latn", {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    calendar: "islamic",
  }).formatToParts(date);

  // Extract values
  const weekday = hijriDays[date.getDay()];
  const day = hijri.find((part) => part.type === "day").value;
  const month =
    hijriMonths[
      parseInt(hijri.find((part) => part.type === "month").value) - 1
    ];
  const year = hijri.find((part) => part.type === "year").value;

  return `${weekday}, ${day} ${month} ${year} H`;
}
