"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

/**
 * A working contact form with no backend required: on submit it opens the
 * visitor's own email app with a message pre-addressed to the studio inbox.
 * (When a form service like Formspree is connected later, this can post
 * directly instead.)
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailto = () => {
    const subject = encodeURIComponent(`Message from ${name || "the website"}`);
    const body = encodeURIComponent(
      `${message}\n\nFrom: ${name}\nReply to: ${email}`,
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gold/40 bg-cream-deep/30 p-6">
      <h2 className="font-display text-xl">Send a message</h2>
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          mailto();
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
          className="rounded-sm bg-peacock px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-peacock-deep"
        >
          Send
        </button>
      </form>
      <p className="text-xs text-ink-soft">
        This opens your email app with the message ready to send. Prefer it
        direct? Email{" "}
        <a href={`mailto:${SITE.email}`} className="underline hover:text-marigold-ink">
          {SITE.email}
        </a>
        .
      </p>
    </div>
  );
}
