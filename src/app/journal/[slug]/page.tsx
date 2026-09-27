import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PieceImage } from "@/components/PieceImage";
import { ProductCard } from "@/components/ProductCard";
import { getAllPosts, getPost } from "@/lib/journal";
import { getProduct } from "@/lib/catalogue";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Story not found" };
  return { title: post.title, description: post.excerpt };
}

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = post.products.map((s) => getProduct(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main className="flex-1">
      <article className="mx-auto w-full max-w-[1120px] px-5 pt-2 lg:px-10 lg:pt-6">
        <Link href="/journal" className="nav-link t-small text-ink-soft">
          All stories
        </Link>
        <header className="mt-4 max-w-[620px]">
          <h1 className="t-display">{post.title}</h1>
          <p className="t-small mt-4 text-ink-soft">
            {formatDate(post.date)}, {post.readTime} read
          </p>
        </header>

        {post.image && (
          <div className="mt-10 max-w-[760px]">
            <PieceImage src={post.image} label={post.title} ratio="landscape" priority sizes="(min-width: 1024px) 760px, 100vw" />
          </div>
        )}

        <div className="story-prose mt-10 max-w-[620px]" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      {related.length > 0 && (
        <section className="mx-auto w-full max-w-[1120px] px-5 pt-16 lg:px-10 lg:pt-24" aria-labelledby="from-story">
          <h2 id="from-story" className="t-heading">
            {related.length === 1 ? "The piece in this story" : "The pieces in this story"}
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
            {related.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
