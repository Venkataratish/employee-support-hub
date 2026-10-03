"use client";

import { useMemo, useState } from "react";
import BirthdayGreeting from "./BirthdayGreeting";

type Resource = { icon: string; title: string; description: string; category: string; keywords: string; href?: string; note?: string; featured?: boolean };

const resources: Resource[] = [
  { icon: "⏰", title: "Time Off / ATO", description: "Request planned Approved Time Off through the official form.", category: "Payroll & Time", keywords: "absence vacation day off leave", href: "https://tinyurl.com/adeccotimeoff", steps: ["Submit planned time-off requests in advance.", "Wait for approval before finalizing plans.", "ATO approval and paid sick-time entry are separate processes."] },
  { icon: "💰", title: "Pay & Paystubs", description: "View paystubs, W-2s, holiday pay status, and payroll information.", category: "Payroll & Time", keywords: "payroll paycheck direct deposit w2", href: "https://www.adomyinfo.com" },
  { icon: "🤒", title: "Sick Time", description: "Check your sick-leave balance and enter eligible sick-time hours.", category: "Payroll & Time", keywords: "illness absence paid leave balance", href: "https://www.adomyinfo.com", steps: ["Review your available balance in ADOMYinfo.", "Enter eligible sick-time hours.", "Confirm current eligibility and policy rules with HR."] },
  { icon: "🕐", title: "Clock In / Clock Out", description: "See guidance for starting, ending, or correcting your shift.", category: "Payroll & Time", keywords: "time punch missed clock late shift", steps: ["Use the approved workplace clocking method.", "Report missing or incorrect punches to your site lead or HR contact."] },
  { icon: "🏥", title: "Benefits & Insurance", description: "Medical, dental, vision, life, disability, and voluntary benefits.", category: "Benefits", keywords: "health dental vision fmla telemedicine", href: "https://worklife.alight.com/theadeccogroup/" },
  { icon: "🩺", title: "Work-Related Injury", description: "Follow the injury process and notify your supervisor promptly.", category: "Safety & Health", keywords: "accident safety emergency injury report", steps: ["For an emergency, call 911 or seek immediate care.", "Notify your supervisor promptly.", "Follow the approved site reporting process."], actions: [{ label: "Call 911", href: "tel:911" }], featured: true },
  { icon: "📱", title: "My Adecco", description: "Access assignments, pay information, jobs, and support in the app.", category: "Work Resources", keywords: "mobile app assignment recruiter", href: "https://www.adecco.com/en-us/job-seekers/app" },
  { icon: "🔍", title: "Job Postings", description: "Search and apply for current Adecco job opportunities.", category: "Work Resources", keywords: "jobs openings careers apply employment opportunities", href: "https://www.adecco.com/en-us/job-seekers" },
  { icon: "👤", title: "Employee Portal", description: "Open ADOMYinfo for pay, sick leave, holiday pay, and tax forms.", category: "Work Resources", keywords: "adomyinfo account portal w2 paystub", href: "https://www.adomyinfo.com" },
  { icon: "📊", title: "Timesheet & Expenses", description: "Open Bullhorn/Peoplenet for timesheets and expense support.", category: "Payroll & Time", keywords: "hours expense bullhorn peoplenet", href: "https://www.mypeoplenet.com" },
  { icon: "💼", title: "401(k)", description: "Access retirement-plan information and account resources.", category: "Financial", keywords: "retirement 401k savings pension alight worklife", href: "https://worklife.alight.com/theadeccogroup/", note: "Open the official Alight Worklife portal to review available retirement-plan information and account resources. Confirm plan-specific enrollment or contribution questions with HR." },
  { icon: "🧠", title: "Employee Assistance", description: "Confidential emotional, legal, financial, wellness, and life support.", category: "HR & Employee Support", keywords: "eap counseling stress legal wellness optum", href: "https://www.liveandworkwell.com", note: "Use Adecco’s employee assistance resource for confidential emotional support, work-and-life assistance, legal guidance, financial resources, and wellness support. The employer access code is Adecco." },
  { icon: "⚖️", title: "Legal / Employee Relations", description: "Contact Employee Relations and Human Resources (the HUB).", category: "HR & Employee Support", keywords: "human resources hub complaint concern email phone", href: "mailto:thehub@adeccona.com", note: "Email thehub@adeccona.com or call (800) 793-7657 and select option 6." },
  { icon: "🚗", title: "Transportation", description: "Review Pittsfield Township transportation and People’s Express information.", category: "Transportation", keywords: "bus ride flexride commute reservation ann arbor peoples express", href: "https://www.pittsfield-mi.gov/2417/Peoples-Express", note: "Open the Township’s official transportation page for current booking details, service hours, fares, and contact information." },
  { icon: "🎁", title: "Employee Discounts", description: "Access savings on shopping, travel, insurance, and more.", category: "Benefits", keywords: "beneplace deals vacation theme parks", href: "https://www.beneplace.com/adecco", note: "Use Adecco’s Associate Discount Program for available savings on hotels, car rentals, electronics, travel, and other offers." },
  { icon: "🛡️", title: "Workplace Benefits", description: "Open Alight Worklife to manage workplace benefits.", category: "Benefits", keywords: "alight worklife enrollment coverage", href: "https://worklife.alight.com/theadeccogroup/", note: "First-time users create their own Alight Worklife credentials on the official portal. Enter identity-verification information only on the verified Alight website." },
  { icon: "📄", title: "Employment Verification", description: "Use The Work Number for employment or income verification.", category: "Work Resources", keywords: "equifax proof income employer", href: "https://www.theworknumber.com" },
  { icon: "📋", title: "Attendance Policy", description: "Request the current attendance, absence, and reporting policy from HR.", category: "HR & Employee Support", keywords: "policy tardy late absence occurrence holiday", steps: ["Attendance rules can vary by assignment and site.", "Contact the HUB to request the current approved attendance policy.", "When calling, select option 6."], actions: [{ label: "Email HUB", href: "mailto:thehub@adeccona.com" }, { label: "Call HUB", href: "tel:18007937657" }] },
  { icon: "📅", title: "2026 Observed Holidays", description: "Review the workplace’s posted 2026 observed-holiday dates.", category: "Payroll & Time", keywords: "new year mlk memorial independence labor thanksgiving black friday christmas", steps: ["New Year’s Day — Jan 1", "MLK Day — Jan 19", "Memorial Day — May 25", "Independence Day observed — Jul 3", "Labor Day — Sep 7", "Thanksgiving — Nov 26", "Black Friday — Nov 27", "Christmas Day — Dec 25", "Confirm assignment-specific eligibility with your site lead."] },
  { icon: "👥", title: "Adecco Leadership Contacts", description: "Contact Global Operations, the Site Manager, Program Manager, or Area Operations Partner.", category: "Leadership Contacts", keywords: "joe mills john welton jamie schmitt gloria zuniga leadership contacts", contacts: [
    { name: "Joe Mills", role: "Global Operations", email: "joe.mills@adeccona.com", phone: "7342490976" },
    { name: "John Welton", role: "Site Manager", email: "john.welton@adeccona.com" },
    { name: "Jamie Schmitt", role: "Program Manager", email: "jamieson.schmitt@adeccona.com", phone: "5174283623" },
    { name: "Gloria Zuniga", role: "Area Operations Partner", email: "gloria.zuniga@adeccona.com", phone: "8182776273", text: true },
  ] },
  { icon: "🎂", title: "Birthdays & Celebrations", description: "Share your birthday for a greeting from your Adecco team.", category: "HR & Employee Support", keywords: "birthday birth date celebration signup recognition", href: "/birthday.html" },
];

const allResourcesLabel = "All resources";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(allResourcesLabel);

  const categories = useMemo(() => [allResourcesLabel, ...Array.from(new Set(resources.map((resource) => resource.category)))], []);
  const metrics = useMemo(() => [
    { value: resources.length, label: "Total resources", detail: "Available in one directory" },
    { value: categories.length - 1, label: "Categories", detail: "Based on current resources" },
  ], [categories.length]);
  const shown = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    return resources.filter((resource) => {
      const categoryMatches = category === allResourcesLabel || resource.category === category;
      const searchMatches = `${resource.title} ${resource.description} ${resource.category} ${resource.keywords}`.toLowerCase().includes(normalizedQuery);
      return categoryMatches && searchMatches;
    });
  }, [query, category]);

  return <main id="top">
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Adecco Employee Resource Hub home">
        {/* The supplied brand asset is already optimized and intentionally served directly. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="brandLogo" src="/adecco-logo.png" alt="Adecco"/>
        <span><strong>Adecco Employee Resource Hub</strong><small>Support at your fingertips</small></span>
      </a>
      <nav aria-label="Primary navigation"><a href="#resources">Resources</a></nav>
    </header>

    <BirthdayGreeting />
    <section className="hero">
      <div className="heroCopy"><span className="eyebrow">EVERYDAY EMPLOYEE SUPPORT</span><h1>How can we help you today?</h1><p>Find HR, payroll, benefits, attendance, safety, transportation, and workplace resources in one reliable directory.</p><a className="primary" href="#resources">Browse resources</a></div>
      <dl className="overview" aria-label="Resource overview">{metrics.map((metric) => <div className="metric" key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd><span>{metric.detail}</span></div>)}</dl>
    </section>

    <section className="resourceSection" id="resources">
      <div className="sectionHeading"><div><span>EMPLOYEE RESOURCE DIRECTORY</span><h2>Find the right resource</h2></div><p>Search the directory or choose a category.</p></div>
      <div className="directoryControls">
        <label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title, description, or category" aria-label="Search employee resources"/>{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search">Clear</button>}</label>
        <div className="chips" role="group" aria-label="Filter resources by category">{categories.map((item) => <button type="button" className={item === category ? "active" : ""} aria-pressed={item === category} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
      </div>
      <div className="resultsHeader" aria-live="polite"><strong>{shown.length} {shown.length === 1 ? "resource" : "resources"}</strong>{(query || category !== allResourcesLabel) && <span>matching your current filters</span>}</div>
      {shown.length > 0 ? <div className="resourceGrid">{shown.map((resource) => <article className={`resourceCard ${resource.featured ? "featured" : ""}`} key={resource.title}><div className="cardTop"><span className="resourceIcon" aria-hidden="true">{resource.icon}</span>{resource.featured && <span className="featuredTag">Featured</span>}</div>{resource.title !== "Birthdays & Celebrations" && <small>{resource.category}</small>}<h3>{resource.title}</h3><p>{resource.description}</p>{resource.contacts ? <div className="leadershipContacts">{resource.contacts.map((contact) => <section className="leadershipContact" key={contact.email}><strong>{contact.name}</strong><span>{contact.role}</span><div><a href={`mailto:${contact.email}`}>Email</a>{contact.phone ? <a href={`${contact.text ? "sms" : "tel"}:${contact.phone}`}>{contact.text ? "Text" : "Call"}</a> : <span className="contactUnavailable">Phone not listed</span>}</div></section>)}</div> : resource.href && !resource.steps ? <a className="cardAction" href={resource.href}>{resource.href.startsWith("mailto:") ? "Email resource" : "Open resource"}</a> : <details className="cardInstructions"><summary>View instructions</summary>{resource.steps ? <ul className="instructionList">{resource.steps.map((step) => <li key={step}>{step}</li>)}</ul> : <p>{resource.note}</p>}{(resource.href || resource.actions) && <div className="instructionActions">{resource.href && <a href={resource.href}>Open resource</a>}{resource.actions?.map((action) => <a href={action.href} key={action.href}>{action.label}</a>)}</div>}</details>}</article>)}</div> : <div className="empty" role="status"><span aria-hidden="true">⌕</span><strong>No resources found</strong><p>Try a different search term or select another category.</p><button type="button" className="secondary" onClick={() => { setQuery(""); setCategory(allResourcesLabel); }}>Reset filters</button></div>}
    </section>

    <aside className="contactJamie" aria-labelledby="contact-jamie-title">
      <div><span>NEED MORE HELP?</span><h2 id="contact-jamie-title">Have more questions? Contact Jamie.</h2><p>Send Jamie a message for additional assistance with employee resources.</p></div>
      <a className="contactJamieButton" href="mailto:jamieson.schmitt@adeccona.com?subject=Employee%20Resource%20Hub%20Question">Email Jamie</a>
    </aside>

    <footer><strong>Adecco Employee Resource Hub</strong><span>Centralized access to everyday support</span></footer>

  </main>;
}

