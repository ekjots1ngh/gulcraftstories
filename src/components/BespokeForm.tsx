"use client";

import { useState } from "react";
import { SITE, whatsappLink } from "@/lib/site";

/**
 * Bespoke enquiry form that works with no backend: on submit it opens the
 * visitor's own email app with the enquiry pre-addressed to the studio inbox.
 * (Can post to a form service instead once one is connected.)
 */
export function BespokeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idea, setIdea] = useState("");

  const send = () => {
    const subject = encodeURIComponent(`Bespoke enquiry from ${name || "the website"}`);
    const body = encodeURIComponent(
      `${idea}\n\nFrom: ${name}\nReply to: ${email}`,
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gold/40 bg-cream p-6 sm:p-7">
      <h2 className="font-display text-xl">Start an enquiry</h2>
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          send();
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
          className="rounded-sm bg-peacock px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-peacock-deep"
        >
          Send enquiry
        </button>
      </form>
      <p className="text-center text-xs text-ink-soft">
        This opens your email app with the enquiry ready to send. Prefer to
        chat?{" "}
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
