"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

// When a Formspree endpoint is configured (Vercel env var), the form sends
// directly to the studio inbox. Without it, it falls back to opening the
// visitor's own email app, pre-addressed.
const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Message from ${name || "the website"}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nReply to: ${email}`);
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
        body: JSON.stringify({ name, email, message, _subject: `Website message from ${name}` }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="max-w-[620px]">
        <h2 className="t-heading">Message sent</h2>
        <p className="t-body mt-3 text-ink-soft">
          Thank you, {name.split(" ")[0] || "friend"}. A real person reads every message; we will
          reply to {email} within a working day or so.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex max-w-[620px] flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <h2 className="t-heading">Send a message</h2>
      <label className="flex flex-col gap-2">
        <span className="t-small text-ink-soft">Your name</span>
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="field" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="t-small text-ink-soft">Your email</span>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="t-small text-ink-soft">Your message</span>
        <textarea rows={5} required value={message} onChange={(e) => setMessage(e.target.value)} className="field" />
      </label>
      <button type="submit" aria-disabled={state === "sending"} className="action-link t-body self-start">
        {state === "sending" ? "Sending" : "Send"}
      </button>
      {state === "error" && (
        <p role="alert" className="t-small text-clay">
          Sorry, that did not send. Please email{" "}
          <a href={`mailto:${SITE.email}`} className="inline-link">
            {SITE.email}
          </a>{" "}
          directly.
        </p>
      )}
      <p className="t-small text-ink-soft">
        {ENDPOINT
          ? "Your message goes straight to the studio inbox."
          : "This opens your email app with the message ready to send."}
      </p>
    </form>
  );
}
