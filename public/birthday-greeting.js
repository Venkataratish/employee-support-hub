import { birthdaysToday } from "./birthday-core.js";
import { currentCelebration, reloadCelebration } from "./birthday-local.js";
import "./birthday-signup.js";

// Independent of the resource directory: a birthday failure never blocks resources.
class BirthdayGreeting extends HTMLElement {
  connectedCallback() {
    this.hidden = true;
    this.rows = [];
    this.signature = "";
    this.onPersonal = event => { this.personal = event.detail; this.refresh(); };
    document.addEventListener("birthday-personal", this.onPersonal);
    this.onStorage = () => { reloadCelebration(); this.refresh(); };
    window.addEventListener("storage", this.onStorage);
    this.onVisibility = () => { if (!document.hidden) this.refresh(); };
    document.addEventListener("visibilitychange", this.onVisibility);
    this.timer = setInterval(() => this.refresh(), 60000);
    this.refresh();
  }
  disconnectedCallback() {
    clearInterval(this.timer);
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.controller?.abort();
    document.removeEventListener("birthday-personal", this.onPersonal);
    window.removeEventListener("storage", this.onStorage);
    this.stopGold?.();
    document.body.classList.remove("birthdayDay");
  }
  refresh() {
    const record = currentCelebration();
    this.rows = record?.birthdays || [];
    this.renderToday();
  }
  renderToday() {
    const today = birthdaysToday(this.rows);
    const signature = JSON.stringify(today);
    if (signature === this.signature) return;
    this.signature = signature;
    this.stopGold?.();
    this.replaceChildren();
    this.hidden = today.length === 0;
    document.body.classList.toggle("birthdayDay", today.length > 0);
    if (!today.length) return;
    const section = document.createElement("section");
    section.className = "birthdayGreeting";
    section.setAttribute("aria-label", "Today's birthday appreciation");
    section.innerHTML = '<span class="birthdayEyebrow">WITH APPRECIATION, FROM ALL OF US</span><h1>A wonderful day.<br>A wonderful you.</h1><div class="birthdayNames"></div><p>Wishing you a wonderful birthday and a year full of good things.</p><p>From your Adecco team</p>';
    const names = section.querySelector(".birthdayNames");
    today.forEach((row, i) => {
      const name = document.createElement("span");
      name.textContent = row.name + (i < today.length - 1 ? " ·" : "");
      names.append(name);
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) name.animate([{ transform: "translateY(-35px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }], { duration: 900, delay: Math.min(i * 90, 500), fill: "backwards", easing: "cubic-bezier(.16,1,.3,1)" });
    });
    this.append(section);

    this.stopGold = startGold();
  }
}

export function startGold() {
  const canvas = document.createElement("canvas");
  canvas.className = "birthdayGold";
  canvas.setAttribute("aria-hidden", "true");
  document.body.append(canvas);
  const context = canvas.getContext("2d");
  if (!context) { canvas.remove(); return () => {}; }
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let width, height, pieces = [], frame = 0, last = 0;
  const colors = ["#b58a3c", "#d9b764", "#efd69a", "#af7930", "#d0a653"];
  function piece(seed = false) {
    const depth = .45 + Math.random() * .8;
    return { x: Math.random() * width, y: seed ? Math.random() * height : -40, v: 32 + depth * 65, size: 5 + depth * 5, phase: Math.random() * 6.28, spin: .8 + Math.random() * 2, depth, color: colors[Math.floor(Math.random() * colors.length)], ribbon: Math.random() < .3 };
  }
  function resize() {
    width = innerWidth; height = innerHeight;
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = width * ratio; canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    pieces = Array.from({ length: width < 650 ? 32 : 65 }, () => piece(true));
  }
  function tick(now) {
    const dt = Math.min((now - last) / 1000, .05); last = now;
    context.clearRect(0, 0, width, height);
    for (const p of pieces) {
      p.y += p.v * dt;
      if (p.y > height + 40) Object.assign(p, piece());
      const time = now / 1000;
      context.save(); context.translate(p.x + Math.sin(time + p.phase) * 20, p.y);
      context.rotate(time * p.spin * .35 + p.phase);
      context.scale(1, Math.cos(time * p.spin + p.phase));
      context.globalAlpha = .45 + p.depth * .25;
      if (p.ribbon) {
        const gradient = context.createLinearGradient(-p.size, 0, p.size, 0);
        gradient.addColorStop(0, p.color); gradient.addColorStop(.45, "#fff0c9"); gradient.addColorStop(1, p.color);
        context.strokeStyle = gradient; context.lineWidth = 2.5 * p.depth;
        context.beginPath(); context.moveTo(-p.size, -p.size * 3);
        context.bezierCurveTo(p.size * 2, -p.size * 2, -p.size * 2, p.size * 2, p.size, p.size * 3); context.stroke();
      } else { context.fillStyle = p.color; context.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * .65); }
      context.restore();
    }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);
    context.clearRect(0, 0, width, height);
    if (!document.hidden && !reduced.matches) { last = performance.now(); frame = requestAnimationFrame(tick); }
  }
  resize(); sync();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", sync);
  reduced.addEventListener("change", sync);
  return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); document.removeEventListener("visibilitychange", sync); reduced.removeEventListener("change", sync); canvas.remove(); };
}
if (!customElements.get("birthday-greeting")) customElements.define("birthday-greeting", BirthdayGreeting);

