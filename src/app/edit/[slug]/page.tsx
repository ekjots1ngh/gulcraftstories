import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { EDITS, getProducts, isOneOfOne } from "@/lib/catalogue";
import { editContent } from "@/lib/edits";
import { getPostsForEdit } from "@/lib/journal";
import { getSoldSlugs } from "@/lib/sold";

export const revalidate = 60;

export function generateStaticParams() {
  return EDITS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const edit = EDITS.find((e) => e.slug === slug);
  if (!edit) return { title: "Edit not found" };
  return { title: `${edit.name}, an edit`, description: editContent[edit.slug].meaning };
}

/** An edit: its story, then the pieces in it right now, then the other edits. */
export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const edit = EDITS.find((e) => e.slug === slug);
  if (!edit) notFound();

  const content = editContent[edit.slug];
  const soldSlugs = await getSoldSlugs();
  const pieces = getProducts({ edit: edit.slug }).map((p) =>
    isOneOfOne(p) && soldSlugs.includes(p.slug) ? { ...p, status: "sold" as const } : p,
  );
  const stories = getPostsForEdit(edit.slug);
  const others = EDITS.filter((e) => e.slug !== edit.slug);

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1120px] px-5 pt-2 lg:px-10 lg:pt-6">
        <header className="max-w-[620px]">
          <h1 className="t-display">{edit.name}</h1>
          <p className="t-body mt-4 text-ink-soft">{content.meaning}</p>
        </header>

        <div className="story-prose mt-8 max-w-[620px]">
          {content.story.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <blockquote>
            <p>{content.pullQuote}</p>
          </blockquote>
          <p className="t-small text-ink-soft">
            An edit is a living thing, not a restocked line. Every piece is made once; as each finds its
            home the edit slowly becomes something new.
          </p>
        </div>

        <section className="mt-16 lg:mt-24" aria-labelledby="edit-pieces">
          <h2 id="edit-pieces" className="t-heading">
            In {edit.name} now
          </h2>
          <p className="t-small mt-2 text-ink-soft">
            {pieces.length} {pieces.length === 1 ? "piece" : "pieces"}
          </p>
          {pieces.length > 0 ? (
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-14">
              {pieces.map((p, i) => (
                <li key={p.slug}>
                  <ProductCard product={p} priority={i < 2} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="t-body mt-6 max-w-[620px]">
              This edit is resting between pieces just now. New work opens here often.
            </p>
          )}
        </section>

        {stories.length > 0 && (
          <section className="mt-16 max-w-[620px]" aria-labelledby="edit-stories">
            <h2 id="edit-stories" className="t-heading">
              Stories from this edit
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {stories.map((post) => (
                <li key={post.slug}>
                  <Link href={`/journal/${post.slug}`} className="action-link t-body">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-16 max-w-[620px]" aria-labelledby="other-edits">
          <h2 id="other-edits" className="t-heading">
            The other edits
          </h2>
          <ul className="mt-4 flex flex-col gap-2">
            {others.map((e) => (
              <li key={e.slug} className="flex flex-wrap items-baseline gap-x-3">
                <Link href={`/edit/${e.slug}`} className="action-link t-body">
                  {e.name}
                </Link>
                <span className="t-small text-ink-soft">{e.blurb}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link href="/shop" className="action-link t-body">
              All pieces
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
