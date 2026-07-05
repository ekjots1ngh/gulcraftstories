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
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Website message from ${name}`,
        }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-gold/40 bg-cream-deep/30 p-8 text-center">
        <h2 className="font-display text-xl text-peacock">Message sent</h2>
        <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
          Thank you, {name.split(" ")[0] || "friend"}. A real person reads every
          message, we&apos;ll reply to {email} within a working day or so.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gold/40 bg-cream-deep/30 p-6">
      <h2 className="font-display text-xl">Send a message</h2>
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          type="text"
          required
          aria-label="Your name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-sm border border-ink/20 bg-cream px-4 py-3 text-sm focus:border-ink focus:outline-none"
        />
        <input
          type="email"
          required
          aria-label="Your email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-sm border border-ink/20 bg-cream px-4 py-3 text-sm focus:border-ink focus:outline-none"
        />
        <textarea
          rows={5}
          required
          aria-label="Your message"
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="rounded-sm border border-ink/20 bg-cream px-4 py-3 text-sm focus:border-ink focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="rounded-sm bg-peacock px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-peacock-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send"}
        </button>
        {state === "error" && (
          <p role="alert" className="text-sm text-rani">
            Sorry, that didn&apos;t send. Please email{" "}
            <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>{" "}
            directly.
          </p>
        )}
      </form>
      <p className="text-xs text-ink-soft">
        {ENDPOINT
          ? "Your message goes straight to the studio inbox."
          : "This opens your email app with the message ready to send."}{" "}
        Prefer it direct? Email{" "}
        <a href={`mailto:${SITE.email}`} className="underline hover:text-marigold-ink">
          {SITE.email}
        </a>
        .
      </p>
    </div>
  );
}
