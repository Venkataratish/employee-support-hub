import { birthdayDate, birthdaysToday, validateBirthday } from "./birthday-core.js";
export const storageKey = "adecco-personal-birthday-v1";
export function dayKey(date = new Date()) {
  const { year, month, day } = birthdayDate(date);
  return `${year}-${month}-${day}`;
}
export function createCelebration(value, date = new Date()) {
  const birthday = validateBirthday(value);
  if (!birthdaysToday([birthday], date).length) throw new Error("That birthday isn’t today in Eastern time. Come back on your birthday to celebrate!");
  return { ...birthday, expiresOn: dayKey(date) };
}
export function readCelebration(storage, date = new Date()) {
  try {
    const record = JSON.parse(storage.getItem(storageKey));
    if (!record || record.expiresOn !== dayKey(date)) { storage.removeItem(storageKey); return null; }
    return { birthdays: (record.birthdays || [record]).map(row => createCelebration(row, date)), expiresOn: dayKey(date) };
  } catch { return null; }
}
export function addBirthday(current, value, date = new Date()) {
  const birthday = createCelebration(value, date);
  const birthdays = current?.expiresOn === dayKey(date) ? [...(current.birthdays || [current])] : [];
  if (birthdays.some(row => row.name.toLocaleLowerCase() === birthday.name.toLocaleLowerCase() && row.month === birthday.month && row.day === birthday.day)) throw new Error("This person is already in today’s celebration.");
  birthdays.push(birthday);
  return { birthdays, expiresOn: dayKey(date) };
}
let memory;
export function currentCelebration() {
  if (memory !== undefined) return memory?.expiresOn === dayKey() ? memory : null;
  try { return readCelebration(localStorage); } catch { return null; }
}
export function saveBirthday(value) {
  memory = addBirthday(currentCelebration(), value);
  let saved = false;
  try { localStorage.setItem(storageKey, JSON.stringify(memory)); saved = true; } catch { /* Keep current-page state. */ }
  return { record: memory, saved };
}
export function clearCelebration() {
  memory = null;
  try { localStorage.removeItem(storageKey); } catch { /* Clear current-page state regardless. */ }
}
export function reloadCelebration() { memory = undefined; }
