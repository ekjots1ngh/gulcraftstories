import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { MotifDivider, MotifMark } from "@/components/MotifDivider";
import { ProductBrowser } from "@/components/ProductBrowser";
import { PieceImage } from "@/components/PieceImage";
import { JournalCard } from "@/components/JournalCard";
import { EDITS, getProducts, ONE_OF_ONE } from "@/lib/products";
import { editContent } from "@/lib/edits";
import { getPostsForEdit } from "@/lib/journal";

export function generateStaticParams() {
  return EDITS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const edit = EDITS.find((e) => e.slug === slug);
  if (!edit) return { title: "Edit not found" };
  const c = editContent[edit.slug];
  return { title: `${edit.name} — an edit`, description: c.meaning };
}

export default async function EditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const edit = EDITS.find((e) => e.slug === slug);
  if (!edit) notFound();

  const content = editContent[edit.slug];
  const pieces = getProducts({ edit: edit.slug });
  const stories = getPostsForEdit(edit.slug);
  const available = pieces.filter((p) => p.status === "available");
  const others = EDITS.filter((e) => e.slug !== edit.slug);

  return (
    <main className="flex-1">
      {/* ───────── HERO (immersive) ───────── */}
      <section
        className="relative isolate overflow-hidden text-cream"
        style={{
          backgroundImage: `radial-gradient(120% 120% at 70% 10%, ${content.heroSwatch[0]} 0%, ${content.heroSwatch[1]} 100%)`,
        }}
      >
        <div className="absolute inset-0 -z-10 grid place-items-center opacity-[0.08]">
          <MotifMark size={520} color="var(--color-cream)" />
        </div>
        <Container className="flex min-h-[62vh] flex-col items-center justify-center gap-5 py-20 text-center sm:min-h-[68vh]">
          <span className="eyebrow text-cream/80">An evolving edit</span>
          <h1 className="font-display text-[3.4rem] leading-[0.95] sm:text-8xl">{edit.name}</h1>
          <p className="max-w-md text-lg leading-relaxed text-cream/90">{content.meaning}</p>
          <p className="font-display text-xl italic text-cream/90">{content.tagline}</p>
        </Container>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      </section>

      {/* ───────── THE STORY ───────── */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="order-2 md:order-1">
            <span className="eyebrow text-rani">The story of this edit</span>
            <div className="mt-5 flex flex-col gap-5">
              {content.story.map((para, i) => (
                <p
                  key={i}
                  className="text-lg leading-[1.85] text-ink first:text-xl"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <PieceImage
              swatch={content.storySwatch}
              label={`${edit.name} — the edit`}
              ratio="portrait"
              className="shadow-[var(--shadow-soft)]"
            />
          </div>
        </Container>

        {/* pull quote */}
        <Container size="narrow" className="mt-8 text-center">
          <MotifDivider className="mb-8" />
          <blockquote className="font-display text-2xl leading-relaxed text-peacock sm:text-3xl">
            &ldquo;{content.pullQuote}&rdquo;
          </blockquote>
        </Container>
      </section>

      {/* ───────── EVOLVING, NOT RESTOCKED ───────── */}
      <section className="jaali-bg bg-aubergine py-12 text-cream">
        <Container className="flex flex-col items-center gap-3 text-center">
          <MotifMark size={26} color="var(--color-gold-soft)" />
          <p className="max-w-xl text-base leading-relaxed text-cream/90">
            An edit is a living thing, not a restocked line. Every piece is one of
            one — as each finds its home it&apos;s gone for good, and the edit
            slowly becomes something new. {ONE_OF_ONE}.
          </p>
        </Container>
      </section>

      {/* ───────── PIECES (right now) ───────── */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="eyebrow text-peacock" style={{ color: edit.accent }}>
              {available.length > 0 ? "In this edit, right now" : "Between pieces"}
            </span>
            <h2 className="text-3xl leading-tight sm:text-4xl">
              {edit.name}
              <span className="text-ink-soft">
                {" "}· {pieces.length} {pieces.length === 1 ? "piece" : "pieces"}
              </span>
            </h2>
          </div>
          <MotifDivider className="my-10" />

          {pieces.length > 0 ? (
            <ProductBrowser products={pieces} showEdit={false} />
          ) : (
            <p className="mx-auto max-w-md text-center text-ink-soft">
              This edit is resting between pieces just now — new work opens here
              often. Follow along on Instagram, or browse the other edits below.
            </p>
          )}

          <div className="mt-12 text-center">
            <Button href="/shop" variant="outline">
              See every piece
            </Button>
          </div>
        </Container>
      </section>

      {/* ───────── STORIES FROM THIS EDIT ───────── */}
      {stories.length > 0 && (
        <section className="border-t border-gold/40 py-14 sm:py-20">
          <Container>
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="eyebrow text-rani">Read more</span>
              <h2 className="text-2xl sm:text-3xl">Stories from this edit</h2>
            </div>
            <div className="mt-10 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((post) => (
                <JournalCard key={post.slug} post={post} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ───────── OTHER EDITS ───────── */}
      <section className="bg-cream-deep/40 py-14 sm:py-20">
        <Container>
          <h2 className="text-center text-2xl sm:text-3xl">The other edits</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {others.map((e) => (
              <Link
                key={e.slug}
                href={`/edit/${e.slug}`}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-lg p-4 text-cream"
                style={{
                  backgroundImage: `radial-gradient(120% 120% at 70% 10%, ${editContent[e.slug].heroSwatch[0]} 0%, ${editContent[e.slug].heroSwatch[1]} 100%)`,
                }}
              >
                <div className="absolute right-3 top-3 opacity-30 transition-transform duration-500 group-hover:rotate-45">
                  <MotifMark size={28} color="var(--color-cream)" />
                </div>
                <h3 className="font-display text-2xl">{e.name}</h3>
                <p className="text-xs text-cream/85">{e.blurb}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
