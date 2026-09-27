"use client";

import { useState } from "react";
import { SITE, whatsappLink } from "@/lib/site";

// When a Formspree endpoint is configured (Vercel env var), the form sends
// directly to the studio inbox. Without it, it falls back to opening the
// visitor's own email app, pre-addressed.
const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_BESPOKE;

export function BespokeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idea, setIdea] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Bespoke enquiry from ${name || "the website"}`);
    const body = encodeURIComponent(`${idea}\n\nFrom: ${name}\nReply to: ${email}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };

  const submit = async () => {
    if (!ENDPOINT) {
      mailtoFallback();
      return;
    }
    setState("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message: idea, _subject: `Bespoke enquiry from ${name}` }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div>
        <h2 className="t-heading">Your enquiry is on its way</h2>
        <p className="t-body mt-3 text-ink-soft">
          Thank you, {name.split(" ")[0] || "friend"}. A real person reads every message; we will
          reply to {email} within a couple of days.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <h2 className="t-heading">Start an enquiry</h2>
      <label className="flex flex-col gap-2">
        <span className="t-small text-ink-soft">Your name</span>
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="field" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="t-small text-ink-soft">Your email</span>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="t-small text-ink-soft">The piece you have in mind: materials, colours, occasion, timeline</span>
        <textarea rows={6} required value={idea} onChange={(e) => setIdea(e.target.value)} className="field" />
      </label>
      <button type="submit" aria-disabled={state === "sending"} className="action-link t-body self-start">
        {state === "sending" ? "Sending" : "Send enquiry"}
      </button>
      {state === "error" && (
        <p role="alert" className="t-small text-clay">
          Sorry, that did not send. Please email{" "}
          <a href={`mailto:${SITE.email}`} className="inline-link">
            {SITE.email}
          </a>{" "}
          or message on WhatsApp.
        </p>
      )}
      <p className="t-small text-ink-soft">
        {ENDPOINT
          ? "Your enquiry goes straight to the studio inbox."
          : "This opens your email app with the enquiry ready to send."}{" "}
        Prefer to talk it through?{" "}
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-link">
          Message on WhatsApp
        </a>
        .
      </p>
    </form>
  );
}
