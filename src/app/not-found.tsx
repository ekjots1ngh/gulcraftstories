import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[620px] px-5 py-16 lg:px-10 lg:py-24">
        <h1 className="t-display">This page has wandered off.</h1>
        <p className="t-body mt-6">
          The address may have changed. The pieces are all still here.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
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
