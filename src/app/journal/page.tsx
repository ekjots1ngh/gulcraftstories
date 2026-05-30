import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MotifDivider } from "@/components/MotifDivider";
import { JournalCard } from "@/components/JournalCard";
import { PieceImage } from "@/components/PieceImage";
import { getAllPosts, getFeaturedPost, getUpcomingPosts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "A craft journal — the name, the promise, the hours behind each piece, and the making, in long form.",
};

export default function JournalPage() {
  const featured = getFeaturedPost();
  const posts = getAllPosts().filter((p) => p.slug !== featured?.slug);
  const upcoming = getUpcomingPosts();

  return (
    <main className="flex-1">
      <Container size="narrow" className="pb-4 pt-14 text-center sm:pt-20">
        <span className="eyebrow text-rani">The craft journal</span>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Stories</h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
          The name, the promise, the hours, the making — told slowly, the way the
          pieces are made.
        </p>
        <MotifDivider className="mt-8" />
      </Container>

      {/* FEATURED STORY */}
      {featured && (
        <Container className="py-8 sm:py-12">
          <Link
            href={`/journal/${featured.slug}`}
            className="group grid items-center gap-8 rounded-lg border border-gold/40 bg-cream-deep/30 p-5 sm:p-8 md:grid-cols-2"
          >
            <div className="overflow-hidden rounded-md">
              <PieceImage
                swatch={featured.cover}
                label={featured.title}
                ratio="landscape"
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-3">
              <span className="eyebrow text-marigold-ink">Start here · {featured.kind}</span>
              <h2 className="font-display text-3xl leading-tight sm:text-4xl">{featured.title}</h2>
              <p className="leading-relaxed text-ink-soft">{featured.excerpt}</p>
              <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-ink transition-transform group-hover:translate-x-1">
                Read it · {featured.readTime} →
              </span>
            </div>
          </Link>
        </Container>
      )}

      {/* PUBLISHED GRID */}
      <Container className="py-8 sm:py-12">
        {posts.length > 0 && (
          <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <JournalCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </Container>

      {/* UPCOMING / ON THE BENCH */}
      {upcoming.length > 0 && (
        <section className="border-t border-gold/40 bg-cream-deep/30 py-14 sm:py-20">
          <Container size="narrow">
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="eyebrow text-peacock">On the bench</span>
              <h2 className="text-2xl sm:text-3xl">Coming soon</h2>
              <p className="max-w-md text-sm leading-relaxed text-ink-soft">
                Stories I&apos;m still writing. They&apos;ll appear here as they&apos;re finished.
              </p>
            </div>
            <ul className="mx-auto mt-8 flex max-w-lg flex-col divide-y divide-gold/40 border-y border-gold/40">
              {upcoming.map((post) => (
                <li key={post.slug} className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="font-display text-lg leading-snug">{post.title}</p>
                    <p className="text-sm text-ink-soft">{post.excerpt}</p>
                  </div>
                  <span className="eyebrow shrink-0 text-ink-soft">Soon</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </main>
  );
}
