const resources = [
  { icon:"⏰", title:"Time Off / ATO", description:"Request planned Approved Time Off through the official form.", category:"Payroll & Time", keywords:"absence vacation day off leave", href:"https://tinyurl.com/adeccotimeoff", note:"Submit planned time-off requests in advance and wait for approval before finalizing plans. ATO approval and entering paid sick-time hours are separate processes." },
  { icon:"💰", title:"Pay & Paystubs", description:"View paystubs, W-2s, holiday pay status, and payroll information.", category:"Payroll & Time", keywords:"payroll paycheck direct deposit w2", href:"https://www.adomyinfo.com" },
  { icon:"🤒", title:"Sick Time", description:"Check your sick-leave balance and enter eligible sick-time hours.", category:"Payroll & Time", keywords:"illness absence paid leave balance", href:"https://www.adomyinfo.com", note:"Use ADOMYinfo to review your available balance and enter eligible sick-time hours. Confirm current eligibility and policy rules with HR." },
  { icon:"🕐", title:"Clock In / Clock Out", description:"See guidance for starting, ending, or correcting your shift.", category:"Payroll & Time", keywords:"time punch missed clock late shift", note:"Use the approved workplace clocking method. Report missing or incorrect punches to your site lead or HR contact." },
  { icon:"🏥", title:"Benefits & Insurance", description:"Medical, dental, vision, life, disability, and voluntary benefits.", category:"Benefits", keywords:"health dental vision fmla telemedicine", href:"https://worklife.alight.com/theadeccogroup/" },
  { icon:"🩺", title:"Work-Related Injury", description:"Follow the injury process and notify your supervisor promptly.", category:"Safety & Health", keywords:"accident safety emergency injury report", note:"For an emergency, call 911 or seek immediate care. Notify your supervisor promptly and follow the approved site reporting process.", featured:true },
  { icon:"📱", title:"My Adecco", description:"Access assignments, pay information, jobs, and support in the app.", category:"Work Resources", keywords:"mobile app assignment recruiter", href:"https://www.adecco.com/en-us/job-seekers/app" },
  { icon:"🔍", title:"Job Postings", description:"Search and apply for current Adecco job opportunities.", category:"Work Resources", keywords:"jobs openings careers apply employment opportunities", href:"https://www.adecco.com/en-us/job-seekers" },
  { icon:"👤", title:"Employee Portal", description:"Open ADOMYinfo for pay, sick leave, holiday pay, and tax forms.", category:"Work Resources", keywords:"adomyinfo account portal w2 paystub", href:"https://www.adomyinfo.com" },
  { icon:"📊", title:"Timesheet & Expenses", description:"Open Bullhorn/Peoplenet for timesheets and expense support.", category:"Payroll & Time", keywords:"hours expense bullhorn peoplenet", href:"https://www.mypeoplenet.com" },
  { icon:"💼", title:"401(k)", description:"Access retirement-plan information and account resources.", category:"Financial", keywords:"retirement 401k savings pension alight worklife", href:"https://worklife.alight.com/theadeccogroup/", note:"Open the official Alight Worklife portal to review available retirement-plan information and account resources. Confirm plan-specific enrollment or contribution questions with HR." },
  { icon:"🧠", title:"Employee Assistance", description:"Confidential emotional, legal, financial, wellness, and life support.", category:"HR & Employee Support", keywords:"eap counseling stress legal wellness optum", href:"https://www.liveandworkwell.com", note:"Use Adecco’s employee assistance resource for confidential emotional support, work-and-life assistance, legal guidance, financial resources, and wellness support. The employer access code is Adecco." },
  { icon:"⚖️", title:"Legal / Employee Relations", description:"Contact Employee Relations and Human Resources (the HUB).", category:"HR & Employee Support", keywords:"human resources hub complaint concern email phone", href:"mailto:thehub@adeccona.com", note:"Email thehub@adeccona.com or call (800) 793-7657 and select option 6." },
  { icon:"🚗", title:"Transportation", description:"Review Pittsfield Township transportation and People’s Express information.", category:"Transportation", keywords:"bus ride flexride commute reservation ann arbor peoples express", href:"https://www.pittsfield-mi.gov/2417/Peoples-Express", note:"Open the Township’s official transportation page for current booking details, service hours, fares, and contact information." },
  { icon:"🎁", title:"Employee Discounts", description:"Access savings on shopping, travel, insurance, and more.", category:"Benefits", keywords:"beneplace deals vacation theme parks", href:"https://www.beneplace.com/adecco", note:"Use Adecco’s Associate Discount Program for available savings on hotels, car rentals, electronics, travel, and other offers." },
  { icon:"🛡️", title:"Workplace Benefits", description:"Open Alight Worklife to manage workplace benefits.", category:"Benefits", keywords:"alight worklife enrollment coverage", href:"https://worklife.alight.com/theadeccogroup/", note:"First-time users create their own Alight Worklife credentials on the official portal. Enter identity-verification information only on the verified Alight website." },
  { icon:"📄", title:"Employment Verification", description:"Use The Work Number for employment or income verification.", category:"Work Resources", keywords:"equifax proof income employer", href:"https://www.theworknumber.com" },
  { icon:"📋", title:"Attendance Policy", description:"Request the current attendance, absence, and reporting policy from HR.", category:"HR & Employee Support", keywords:"policy tardy late absence occurrence holiday", note:"Attendance rules can vary by assignment and site. Contact the HUB at thehub@adeccona.com or call (800) 793-7657, option 6, to request the current approved attendance policy." },
  { icon:"📅", title:"2026 Observed Holidays", description:"Review the workplace’s posted 2026 observed-holiday dates.", category:"Payroll & Time", keywords:"new year mlk memorial independence labor thanksgiving black friday christmas", note:"Posted dates: New Year’s Day — Jan 1; MLK Day — Jan 19; Memorial Day — May 25; Independence Day observed — Jul 3; Labor Day — Sep 7; Thanksgiving — Nov 26; Black Friday — Nov 27; Christmas Day — Dec 25. Confirm assignment-specific holiday eligibility with your site lead." },
  { icon:"👥", title:"Adecco Leadership Contacts", description:"Contact Global Operations, the Site Manager, Program Manager, or Area Operations Partner.", category:"Leadership Contacts", keywords:"joe mills john welton jamie schmitt gloria zuniga leadership contacts", contacts:[
    { name:"Joe Mills", role:"Global Operations", email:"joe.mills@adeccona.com", phone:"7342490976" },
    { name:"John Welton", role:"Site Manager", email:"john.welton@adeccona.com" },
    { name:"Jamie Schmitt", role:"Program Manager", email:"jamieson.schmitt@adeccona.com", phone:"5174283623" },
    { name:"Gloria Zuniga", role:"Area Operations Partner", email:"gloria.zuniga@adeccona.com", phone:"8182776273", text:true },
  ] },
  { icon:"🎂", title:"Birthdays & Celebrations", description:"Share your birthday for a greeting from your Adecco team.", category:"HR & Employee Support", keywords:"birthday birth date celebration signup recognition", href:"birthday.html" },
];

const allResourcesLabel = "All resources";
const categories = [allResourcesLabel, ...new Set(resources.map((resource) => resource.category))];
let activeCategory = allResourcesLabel;

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[character]));
const contactButtons = (contacts) => `<div class="leadershipContacts">${contacts.map((contact) => `<section class="leadershipContact"><strong>${escapeHtml(contact.name)}</strong><span>${escapeHtml(contact.role)}</span><div><a href="mailto:${escapeHtml(contact.email)}">Email</a>${contact.phone ? `<a href="${contact.text ? "sms" : "tel"}:${contact.phone}">${contact.text ? "Text" : "Call"}</a>` : '<span class="contactUnavailable">Phone not listed</span>'}</div></section>`).join("")}</div>`;
const elements = {
  search: document.querySelector("#search"), clear: document.querySelector("#clear-search"), chips: document.querySelector("#chips"), count: document.querySelector("#count"), grid: document.querySelector("#grid"), empty: document.querySelector("#empty"), overview: document.querySelector("#overview")
};

const metrics = [
  { value: resources.length, label: "Total resources", detail: "Available in one directory" },
  { value: categories.length - 1, label: "Categories", detail: "Based on current resources" },
];
elements.overview.innerHTML = metrics.map((metric) => `<div class="metric"><dt>${escapeHtml(metric.label)}</dt><dd>${metric.value}</dd><span>${escapeHtml(metric.detail)}</span></div>`).join("");
elements.chips.innerHTML = categories.map((category) => `<button type="button" data-category="${escapeHtml(category)}" aria-pressed="${category === activeCategory}" class="${category === activeCategory ? "active" : ""}">${escapeHtml(category)}</button>`).join("");

function render() {
  const query = elements.search.value.toLowerCase().trim();
  const visible = resources.filter((resource) => (activeCategory === allResourcesLabel || resource.category === activeCategory) && `${resource.title} ${resource.description} ${resource.category} ${resource.keywords}`.toLowerCase().includes(query));
  elements.count.innerHTML = `<strong>${visible.length} ${visible.length === 1 ? "resource" : "resources"}</strong>${query || activeCategory !== allResourcesLabel ? "<span>matching your current filters</span>" : ""}`;
  elements.clear.hidden = !query;
  elements.grid.hidden = visible.length === 0;
  elements.empty.hidden = visible.length !== 0;
  elements.grid.innerHTML = visible.map((resource) => {
    const action = resource.contacts
      ? contactButtons(resource.contacts)
      : resource.href
      ? `<a class="cardAction" href="${escapeHtml(resource.href)}">${resource.href.startsWith("mailto:") ? "Email resource" : "Open resource"}</a>`
      : `<details class="cardInstructions"><summary>View instructions</summary><p>${escapeHtml(resource.note || "Contact your site lead or HR for assistance.")}</p></details>`;
    return `<article class="resourceCard ${resource.featured ? "featured" : ""}"><div class="cardTop"><span class="resourceIcon" aria-hidden="true">${resource.icon}</span>${resource.featured ? '<span class="featuredTag">Featured</span>' : ""}</div>${resource.title === "Birthdays & Celebrations" ? "" : `<small>${escapeHtml(resource.category)}</small>`}<h3>${escapeHtml(resource.title)}</h3><p>${escapeHtml(resource.description)}</p>${action}</article>`;
  }).join("");
}

elements.search.addEventListener("input", render);
elements.clear.addEventListener("click", () => { elements.search.value = ""; elements.search.focus(); render(); });
elements.chips.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  elements.chips.querySelectorAll("button").forEach((item) => { const selected = item.dataset.category === activeCategory; item.classList.toggle("active", selected); item.setAttribute("aria-pressed", String(selected)); });
  render();
});
document.querySelector("#reset-filters").addEventListener("click", () => { activeCategory = allResourcesLabel; elements.search.value = ""; elements.chips.querySelectorAll("button").forEach((item) => { const selected = item.dataset.category === activeCategory; item.classList.toggle("active", selected); item.setAttribute("aria-pressed", String(selected)); }); render(); });
render();

