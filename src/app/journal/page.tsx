import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { MotifDivider } from "@/components/MotifDivider";
import { JournalCard } from "@/components/JournalCard";
import { getAllPosts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Stories · Gul Craft Stories",
  description:
    "Longer reads from the bench — the making process, the inspiration behind a piece, and the time spent on a collection.",
};

export default function JournalPage() {
  const posts = getAllPosts();

  return (
    <main className="flex-1">
      <Container size="narrow" className="pt-14 pb-4 text-center sm:pt-20">
        <span className="eyebrow text-rani">The craft, in long form</span>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Stories</h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
          Slower reads from the bench — how a piece is made, where it came from,
          and the hours spent getting it right.
        </p>
        <MotifDivider className="mt-8" />
      </Container>

      <Container className="py-12 sm:py-16">
        {posts.length > 0 ? (
          <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <JournalCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-ink-soft">
            New stories are on their way.
          </p>
        )}
      </Container>
    </main>
  );
}
