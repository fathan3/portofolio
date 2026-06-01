"use client";

import { useForm, ValidationError } from "@formspree/react";

export default function Contact({ personalInfo }: { personalInfo: any }) {
  // Replace this with your actual Formspree ID, e.g. "xjkrvpzo"
  // It's the string at the end of the URL formspree.io/f/YOUR_ID
  const [state, handleSubmit] = useForm("mvzyqnog");

  return (
    <section id="contact-box" className="bento-box box-contact cyber-border">
      <div className="box-header">
        <span className="icon">
          <i className="fas fa-satellite-dish"></i>
        </span>
        <span className="title">SECURE_COMM_CHANNEL</span>
      </div>
      <div className="box-content">
        {state.succeeded && (
          <div className="system-msg success">
            &gt; TRANSMISSION SENT AND SECURELY LOGGED.
          </div>
        )}

        <div
          className="contact-text"
          style={{
            marginBottom: "20px",
            color: "var(--neon-blue)",
            fontSize: "0.9rem",
            padding: "10px",
            background: "rgba(255, 255, 255, 0.05)",
            borderLeft: "2px solid var(--neon-blue)",
          }}
        >
          <div>&gt; EMAIL_NODE: {personalInfo.email}</div>
          <div>&gt; COMM_LINK: {personalInfo.phone}</div>
        </div>

        {!state.succeeded && (
          <form onSubmit={handleSubmit} className="cyber-form">
            <div className="input-group">
              <label htmlFor="name">&gt; IDENTIFIER</label>
              <input
                id="name"
                type="text"
                name="name"
                required
                placeholder="ENTER_NAME..."
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>
            <div className="input-group">
              <label htmlFor="email">&gt; RETURN_NODE (EMAIL)</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="ENTER_EMAIL..."
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
            <div className="input-group">
              <label htmlFor="message">&gt; PAYLOAD (MESSAGE)</label>
              <textarea
                id="message"
                name="message"
                rows={3}
                required
                placeholder="ENTER_MESSAGE..."
              ></textarea>
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>
            <button
              type="submit"
              disabled={state.submitting}
              className="cyber-btn full-width"
            >
              TRANSMIT_DATA
            </button>
          </form>
        )}

        <div className="social-links">
          {Object.entries(personalInfo.socials).map(([network, link]) => (
            <a
              key={network}
              href={link as string}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <i className={`fab fa-${network}`}></i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
