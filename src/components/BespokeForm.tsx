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
        body: JSON.stringify({
          name,
          email,
          message: idea,
          _subject: `Bespoke enquiry from ${name}`,
        }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-gold/40 bg-cream p-8 text-center">
        <h2 className="font-display text-xl text-peacock">Your enquiry is on its way</h2>
        <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
          Thank you, {name.split(" ")[0] || "friend"}. A real person reads every
          message, we&apos;ll reply to {email} within a couple of days.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gold/40 bg-cream p-6 sm:p-7">
      <h2 className="font-display text-xl">Start an enquiry</h2>
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
          aria-label="About your piece"
          placeholder="Tell me about the piece you have in mind, materials, colours, occasion, timeline…"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="rounded-sm border border-ink/20 bg-cream px-4 py-3 text-sm focus:border-ink focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="rounded-sm bg-peacock px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-peacock-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        {state === "error" && (
          <p role="alert" className="text-sm text-rani">
            Sorry, that didn&apos;t send. Please email{" "}
            <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>{" "}
            or try WhatsApp below.
          </p>
        )}
      </form>
      <p className="text-center text-xs text-ink-soft">
        {ENDPOINT
          ? "Your enquiry goes straight to the studio inbox."
          : "This opens your email app with the enquiry ready to send."}{" "}
        Prefer to chat?{" "}
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="underline hover:text-marigold-ink">
          Message on WhatsApp
        </a>
        {" "}or email{" "}
        <a href={`mailto:${SITE.email}`} className="underline hover:text-marigold-ink">
          {SITE.email}
        </a>
        .
      </p>
    </div>
  );
}
