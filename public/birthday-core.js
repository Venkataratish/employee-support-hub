export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function validateBirthday(value) {
  if (!value || typeof value.name !== "string") throw new Error("Enter your name.");
  const name = value.name.normalize("NFC").trim().replace(/\s+/gu, " ");
  if (name.length < 2 || name.length > 80 || /[\p{Cc}\p{Cf}<>]/u.test(name)) throw new Error("Use a name between 2 and 80 characters, without special control characters.");
  const { month, day } = value;
  const days = [31,29,31,30,31,30,31,31,30,31,30,31];
  if (!Number.isInteger(month) || !Number.isInteger(day) || month < 1 || month > 12 || day < 1 || day > days[month - 1]) throw new Error("Choose a valid birthday month and day.");
  return { name, month, day };
}

export function validateDirectory(data) {
  if (data?.version !== 1 || !Array.isArray(data.birthdays) || data.birthdays.length > 2000) throw new Error("Invalid birthday directory.");
  const ids = new Set();
  return data.birthdays.map(row => {
    if (typeof row.id !== "string" || !/^[a-zA-Z0-9_-]{1,80}$/.test(row.id) || ids.has(row.id)) throw new Error("Invalid or duplicate birthday ID.");
    ids.add(row.id);
    return { id: row.id, ...validateBirthday(row) };
  });
}

export function birthdayDate(date = new Date(), timeZone = "America/New_York") {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "numeric", day: "numeric" }).formatToParts(date).map(p => [p.type, p.value]));
  return { year: Number(parts.year), month: Number(parts.month), day: Number(parts.day) };
}

export function birthdaysToday(rows, date = new Date(), timeZone = "America/New_York") {
  const today = birthdayDate(date, timeZone);
  const leap = today.year % 4 === 0 && (today.year % 100 !== 0 || today.year % 400 === 0);
  return rows.filter(row => row.month === today.month && (row.day === today.day || (row.month === 2 && row.day === 29 && !leap && today.day === 28)));
}
