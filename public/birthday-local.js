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
    return createCelebration(record, date);
  } catch { return null; }
}
