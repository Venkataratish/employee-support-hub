const requests = [
  { emoji: "🍽️", title: "Food suggestion", detail: "Suggest meals, snacks, or dietary options", tone: "mint", href: "https://docs.google.com/forms/d/e/1FAIpQLScrp1YjJMashsS9CQHSlJUNGAmT8Q82C0fynkY9gM8MCiUWSw/viewform" },
  { emoji: "⏰", title: "Missed clock-in/out", detail: "Report a missing time punch", tone: "blue", href: "https://docs.google.com/forms/d/e/1FAIpQLScCO2yiAHXxQnos2k1_flfANRUx9mura9oKcIfU0K2UUoP9bg/viewform" },
  { emoji: "🕒", title: "Late entry", detail: "Let the team know about a late arrival", tone: "amber", href: "https://docs.google.com/forms/d/e/1FAIpQLSdpmQAooJmIh_4JxWtAhcfdNXe7wkyoLdA0I-YDxZRRBtg9nw/viewform" },
  { emoji: "🤒", title: "Sick leave update", detail: "Share a sickness-related absence update", tone: "rose", href: "https://docs.google.com/forms/d/e/1FAIpQLSfIQJFOTJwEvMqStqrY4_aWCZ-G47w5YDiNSMNCCw4RZImX6A/viewform" },
  { emoji: "🏖️", title: "Time-off request", detail: "Request a planned day or period off", tone: "violet", href: "https://docs.google.com/forms/d/e/1FAIpQLSeMo30FRAFpcrMgRqfvOCizqTs20wC0QeJPYv17SPN9dyiD-g/viewform" },
  { emoji: "🤝", title: "Referral", detail: "Submit an employee referral", tone: "cyan", href: "https://docs.google.com/forms/d/e/1FAIpQLScIpnmmlb8tgODpby13ZtQqa7sc_NcYPTeltWleXZhkomsApQ/viewform" },
  { emoji: "📝", title: "Other request", detail: "Send a request that does not fit above", tone: "slate", href: "https://docs.google.com/forms/d/e/1FAIpQLSfypTeLXGgE4HaX75qDDDYnELHhreg6LhVeMljAR22LstQ11g/viewform" },
];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Employee Support Hub home">
          <span className="brandMark">EH</span>
          <span><strong>Employee Support Hub</strong><small>Quick requests in one place</small></span>
        </a>
        <span className="privacy"><i /> Responses are private</span>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow">ONE QR · SEVEN SERVICES</div>
        <h1>How can we help today?</h1>
        <p>Choose a request below. A short form will open, and your response will go directly to the support team.</p>
        <div className="steps" aria-label="How it works">
          <span><b>1</b> Scan</span><i /><span><b>2</b> Choose</span><i /><span><b>3</b> Submit</span>
        </div>
      </section>

      <section className="requestSection" aria-labelledby="request-heading">
        <div className="sectionTitle">
          <div><span>REQUEST MENU</span><h2 id="request-heading">Select a category</h2></div>
          <p>Most forms take less than two minutes.</p>
        </div>
        <div className="requestGrid">
          {requests.map((request) => (
            <a className={`requestCard ${request.tone}`} href={request.href} key={request.title}>
              <span className="emoji" aria-hidden="true">{request.emoji}</span>
              <span className="cardCopy"><strong>{request.title}</strong><small>{request.detail}</small></span>
              <span className="arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </section>

      <section className="trust">
        <div className="trustIcon">✓</div>
        <div><strong>Simple, direct, and organized</strong><p>You complete a secure Google Form. Your response is stored privately and reviewed by the responsible person.</p></div>
      </section>

      <footer><span>Employee Support Hub</span><span>One QR code for everyday requests</span></footer>
    </main>
  );
}
