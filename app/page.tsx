"use client";

import { useState } from "react";

const features = [
  ["Tap or scan to pay", "A single taxi QR opens a low data payment flow. Cash remains available during the pilot."],
  ["Every trip becomes visible", "Owners see verified departures, route distance, driver shifts and unusual movement."],
  ["A daily money record", "Fares, fuel, maintenance and owner settlements roll into one simple operating view."],
  ["Evidence for better cover", "Consented, anonymised fleet patterns can support safer underwriting and tailored products."],
];

const roadmap = [
  ["01", "Prove the loop", "Pilot QR fare collection, trip logs and owner reconciliation on one route."],
  ["02", "Build the risk picture", "Add driving events, vehicle health signals and insurer ready reporting."],
  ["03", "Connect the network", "Give associations and partners privacy safe corridor and fleet insights."],
];

export default function Home() {
  const [sent, setSent] = useState(false);

  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="MzansiMove home">
          <span className="brandMark">MM</span>
          <span>MzansiMove</span>
        </a>
        <div className="navLinks">
          <a href="#solution">Solution</a>
          <a href="#traction">Pilot</a>
          <a href="#founder">Founder</a>
        </div>
        <a className="navCta" href="#contact">Join the pilot</a>
      </nav>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">Built for South Africa’s taxi economy</p>
          <h1>Every trip.<br />Visible value.</h1>
          <p className="lead">
            A practical operating layer for minibus taxi owners, drivers and commuters.
            Capture fares, understand routes and turn daily movement into trusted business records.
          </p>
          <div className="actions">
            <a className="primary" href="#contact">Explore a pilot <span>↗</span></a>
            <a className="textLink" href="#solution">See how it works <span>↓</span></a>
          </div>
          <div className="trustLine">
            <span className="pulse" />
            <span>Pre pilot venture</span>
            <span className="divider" />
            <span>Piloting in Makhanda, Eastern Cape</span>
          </div>
        </div>

        <div className="heroVisual" aria-label="Concept fleet operations dashboard">
          <div className="routeCard">
            <div className="cardTop"><span>Route visibility</span><span className="liveTag">CONCEPT</span></div>
            <div className="map">
              <div className="road roadOne" />
              <div className="road roadTwo" />
              <div className="road roadThree" />
              <div className="routeLine"><span className="taxiDot">TAXI 01</span></div>
              <span className="place placeA">Joza</span>
              <span className="place placeB">CBD</span>
              <span className="place placeC">Rhodes</span>
            </div>
            <div className="miniStats">
              <div><span>Trip state</span><strong>In service</strong></div>
              <div><span>Route match</span><strong>On corridor</strong></div>
              <div><span>Fare events</span><strong>12 logged</strong></div>
            </div>
          </div>
          <div className="payCard">
            <span>PAY THIS TAXI</span>
            <div className="qr" aria-hidden="true">
              <i /><i /><i /><i /><i /><i /><i /><i /><i />
            </div>
            <strong>Scan. Pay. Ride.</strong>
            <small>Illustrative commuter flow</small>
          </div>
        </div>
      </section>

      <section className="proof" id="traction">
        <div className="proofIntro">
          <p className="sectionLabel">Pilot scorecard</p>
          <h2>Traction will be earned in the field.</h2>
          <p>These are first pilot targets, not claimed results. The site can switch to verified live metrics once field data exists.</p>
        </div>
        <div className="scoreGrid">
          <div><strong>1</strong><span>association partner</span><em>Pilot target</em></div>
          <div><strong>10</strong><span>connected taxis</span><em>Pilot target</em></div>
          <div><strong>500</strong><span>fare events</span><em>Validation target</em></div>
          <div><strong>30</strong><span>days of route data</span><em>Evidence target</em></div>
        </div>
      </section>

      <section className="solution" id="solution">
        <div className="sectionHead">
          <p className="sectionLabel">One operating record</p>
          <h2>Make the invisible day visible.</h2>
          <p>Start with owner control and commuter convenience. Build the insurance data product only after trust and data quality are proven.</p>
        </div>
        <div className="featureGrid">
          {features.map(([title, copy], index) => (
            <article className="feature" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dataSection">
        <div className="dataCopy">
          <p className="sectionLabel light">The value exchange</p>
          <h2>Useful first.<br />Valuable later.</h2>
          <p>Owners receive control, reconciliation and maintenance evidence. Partners receive permissioned insight only when the underlying record is reliable.</p>
          <div className="principles">
            <span>Owner controlled</span><span>Consent led</span><span>Privacy by design</span>
          </div>
        </div>
        <div className="flow" aria-label="Data value flow">
          <div className="flowNode source"><b>Daily operations</b><span>Trips, fares, fuel and vehicle events</span></div>
          <div className="connector"><span>clean</span><span>verify</span><span>protect</span></div>
          <div className="flowNode core"><b>Trusted fleet record</b><span>One accountable operating view</span></div>
          <div className="outcomes">
            <div><b>Owners</b><span>Control and margin</span></div>
            <div><b>Insurers</b><span>Risk evidence</span></div>
            <div><b>Industry</b><span>Planning insight</span></div>
          </div>
        </div>
      </section>

      <section className="roadmap">
        <div className="sectionHead compact">
          <p className="sectionLabel">What comes next</p>
          <h2>A disciplined road to scale.</h2>
        </div>
        <div className="roadmapList">
          {roadmap.map(([number, title, copy]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="founder" id="founder">
        <div className="portrait" aria-label="Founder portrait placeholder"><span>AK</span></div>
        <div className="founderCopy">
          <p className="sectionLabel">Meet the founder</p>
          <h2>Ayanda Khoza</h2>
          <p className="founderLead">A student founder building from a real operating problem in South Africa’s most important everyday mobility network.</p>
          <p>Ayanda first pitched the venture through an Allan Gray entrepreneurship competition and earned early prize funding. He is now developing the concept with support from the Rhodes University Centre for Entrepreneurship Rapid Incubator.</p>
          <blockquote>“The taxi industry already moves the country. We want to help its operators see, protect and grow the value they create every day.”</blockquote>
          <small>Founder statement for confirmation</small>
        </div>
      </section>

      <section className="contact" id="contact">
        <div>
          <p className="sectionLabel light">Start the conversation</p>
          <h2>Bring a route.<br />Build the evidence.</h2>
          <p>We are looking for taxi owners, associations, payment partners and insurers willing to shape a responsible pilot.</p>
        </div>
        <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
          <label>Name<input required name="name" placeholder="Your full name" /></label>
          <label>Work email<input required type="email" name="email" placeholder="name@organisation.co.za" /></label>
          <label>I am a<select name="role" defaultValue=""><option value="" disabled>Select your role</option><option>Taxi owner or association</option><option>Insurer or financial partner</option><option>Research or public sector partner</option><option>Other supporter</option></select></label>
          <label>Message<textarea name="message" placeholder="Tell us how you would like to participate" /></label>
          <button type="submit">{sent ? "Interest received" : "Register interest"}<span>↗</span></button>
          {sent && <p className="formNote" role="status">Thank you. This prototype has captured the interaction only. Contact delivery will be connected before launch.</p>}
        </form>
      </section>

      <footer>
        <a className="brand footerBrand" href="#top"><span className="brandMark">MM</span><span>MzansiMove</span></a>
        <p>A pre pilot mobility data venture from the Eastern Cape.</p>
        <span>© 2026 MzansiMove</span>
      </footer>
    </main>
  );
}
