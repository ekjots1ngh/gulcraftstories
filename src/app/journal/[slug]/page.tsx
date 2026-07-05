import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { MotifDivider } from "@/components/MotifDivider";
import { PieceImage } from "@/components/PieceImage";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/Button";
import { getAllPosts, getPost } from "@/lib/journal";
import { getProduct } from "@/lib/products";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Story not found" };
  return { title: `${post.title} · Stories`, description: post.excerpt };
}

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = post.products
    .map((s) => getProduct(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main className="flex-1">
      <article>
        {/* header */}
        <Container size="narrow" className="pt-8 sm:pt-12">
          <Link href="/journal" className="text-sm text-ink-soft underline hover:text-marigold-ink">
            ← All stories
          </Link>
          <div className="mt-6 flex items-center gap-3 text-ink-soft">
            <span className="eyebrow text-rani">{post.kind}</span>
            <span aria-hidden className="text-gold">•</span>
            <span className="text-xs">{formatDate(post.date)}</span>
            <span aria-hidden className="text-gold">•</span>
            <span className="text-xs">{post.readTime} read</span>
          </div>
          <h1 className="mt-3 text-3xl leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{post.excerpt}</p>
        </Container>

        {/* cover */}
        <Container className="py-10">
          <PieceImage
            swatch={post.cover}
            src={post.image}
            label={post.title}
            ratio="landscape"
            className="shadow-[var(--shadow-soft)]"
          />
        </Container>

        {/* body */}
        <Container size="narrow" className="pb-12">
          <div
            className="story-prose"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <MotifDivider className="mt-16" />
        </Container>
      </article>

      {/* related pieces (links stories ↔ products) */}
      {related.length > 0 && (
        <section className="bg-cream-deep/40 py-14 sm:py-20">
          <Container>
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="eyebrow text-peacock">From this story</span>
              <h2 className="text-2xl sm:text-3xl">
                {related.length === 1 ? "Shop the piece" : "Shop the pieces"}
              </h2>
            </div>
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} tone="atelier" />
              ))}
            </div>
          </Container>
        </section>
      )}

      <Container className="py-14 text-center">
        <Button href="/journal" variant="outline">
          Read more stories
        </Button>
      </Container>
    </main>
  );
}
