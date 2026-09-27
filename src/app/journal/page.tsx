import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageIntro } from "@/components/Page";
import { getAllPosts, getUpcomingPosts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Stories",
  description: "A craft journal: the name, the promise, the hours behind each piece, and the making, in long form.",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function JournalPage() {
  const posts = getAllPosts();
  const upcoming = getUpcomingPosts();

  return (
    <PageShell>
      <PageIntro title="Stories" lead="The name, the promise, the hours, the making, told slowly, the way the pieces are made." />

      <ul className="mt-10 max-w-[620px] divide-y divide-brass/40 border-y border-brass/40">
        {posts.map((post) => (
          <li key={post.slug} className="py-7">
            <Link href={`/journal/${post.slug}`} className="group block">
              <h2 className="t-heading transition-colors group-hover:text-clay">{post.title}</h2>
              <p className="t-small mt-2 text-ink-soft">
                {formatDate(post.date)}, {post.readTime} read
              </p>
              <p className="t-body mt-3">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>

      {upcoming.length > 0 && (
        <section className="mt-14 max-w-[620px]" aria-labelledby="coming">
          <h2 id="coming" className="t-heading text-ink-soft">
            Still being written
          </h2>
          <ul className="t-small mt-4 flex flex-col gap-2 text-ink-soft">
            {upcoming.map((post) => (
              <li key={post.slug}>{post.title}</li>
            ))}
          </ul>
        </section>
      )}
    </PageShell>
  );
}
