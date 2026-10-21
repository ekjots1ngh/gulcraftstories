"use client";

import Link from "next/link";

/** Shown when a page throws. Quiet, in the site's voice; offers a retry. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[620px] px-5 py-16 lg:px-10 lg:py-24">
        <h1 className="t-display">Something went wrong on our side.</h1>
        <p className="t-body mt-6">
          The page did not load properly. It is nothing you did. Trying again usually
          fixes it; if not, the pieces are a tap away.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
          <button type="button" onClick={reset} className="action-link t-body">
            Try again
          </button>
          <Link href="/shop" className="action-link t-body">
            See the pieces
          </Link>
          <Link href="/" className="action-link t-body">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
