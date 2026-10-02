import { months } from "./birthday-core.js";
import { createCelebration, storageKey } from "./birthday-local.js";

function fillForm(host, onSuccess) {
  host.innerHTML = `<form class="birthdayForm"><label>Your name<input name="name" autocomplete="name" required minlength="2" maxlength="80" placeholder="First and last name"></label><div class="birthdayDateFields"><label>Birthday month<select name="month" required><option value="">Select month</option></select></label><label>Birthday day<select name="day" required><option value="">Select day</option></select></label></div><p class="birthdayHelp">Your celebration is just for you on this browser until midnight Eastern time. Nothing is sent to GitHub or to an administrator.</p><p class="birthdayHelp">February 29 birthdays are celebrated on February 28 in other years.</p><p class="birthdayStatus" role="status" aria-live="polite"></p><button class="primary" type="submit">Submit</button></form>`;
  const form = host.querySelector("form"), month = form.elements.month, day = form.elements.day;
  months.forEach((label, i) => month.add(new Option(label, i + 1)));
  const update = () => {
    const previous = day.value; day.replaceChildren(new Option("Select day", ""));
    const count = [31,29,31,30,31,30,31,31,30,31,30,31][Number(month.value) - 1] || 31;
    for (let i = 1; i <= count; i++) day.add(new Option(String(i), i));
    if (Number(previous) <= count) day.value = previous;
  };
  update(); month.addEventListener("change", update);
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const status = form.querySelector(".birthdayStatus");
    try {
      const record = createCelebration({ name: form.elements.name.value, month: Number(month.value), day: Number(day.value) });
      let saved = false;
      try { localStorage.setItem(storageKey, JSON.stringify(record)); saved = true; } catch { /* The current page can still celebrate. */ }
      onSuccess(record, saved);
    } catch (error) { status.textContent = error.message; status.dataset.error = "true"; }
  });
}

const standalone = document.querySelector("#birthday-personal-form");
if (standalone) fillForm(standalone, (record, saved) => {
  if (saved) location.assign("./#top");
  else {
    document.dispatchEvent(new CustomEvent("birthday-personal", { detail: record }));
    standalone.hidden = true;
    document.querySelector(".birthdayIntro").textContent = "Your browser cannot save this celebration, so it lasts while this page stays open.";
  }
});

let dialog;
document.addEventListener("click", event => {
  const link = event.target.closest?.('a[href]');
  if (!link || !new URL(link.href).pathname.endsWith("/birthday.html") || standalone || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  if (!dialog) {
    dialog = document.createElement("dialog"); dialog.className = "birthdayDialog";
    dialog.setAttribute("aria-labelledby", "birthday-dialog-title");
    dialog.innerHTML = '<button type="button" class="birthdayClose" aria-label="Close birthday form">×</button><h2 id="birthday-dialog-title">Let’s celebrate your birthday.</h2><div class="birthdayFormHost"></div>';
    document.body.append(dialog);
    dialog.querySelector(".birthdayClose").addEventListener("click", () => dialog.close());
  }
  fillForm(dialog.querySelector(".birthdayFormHost"), record => {
    document.dispatchEvent(new CustomEvent("birthday-personal", { detail: record }));
    dialog.close(); window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  });
  dialog.showModal();
});
