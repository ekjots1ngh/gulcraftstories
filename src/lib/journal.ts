/**
 * Journal / "Stories" data layer — reads markdown files from `content/journal/`.
 *
 * Adding a post = drop a new `.md` file in that folder with frontmatter:
 *
 *   ---
 *   title: "..."
 *   date: "2026-05-12"        # ISO date, used for ordering
 *   kind: "Making of"          # small label (Making of / Inspiration / ...)
 *   excerpt: "..."             # one-line teaser
 *   cover: ["#E08A1E", "#B5267A"]   # two-stop placeholder swatch (until photos)
 *   products: ["marigold-jhumka"]   # related product slugs (optional)
 *   ---
 *
 * Read time is computed automatically from the body — no need to set it.
 * This module is server-only (it touches the filesystem at build time).
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const JOURNAL_DIR = path.join(process.cwd(), "content", "journal");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  kind: string;
  excerpt: string;
  /** Placeholder cover gradient until real photography is added. */
  cover: [string, string];
  /** Related product slugs. */
  products: string[];
  readTime: string;
};

export type Post = PostMeta & { html: string };

function readingTime(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

function parseFile(fileName: string): { meta: PostMeta; body: string } {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(JOURNAL_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  return {
    body: content,
    meta: {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      kind: String(data.kind ?? "Journal"),
      excerpt: String(data.excerpt ?? ""),
      cover: (Array.isArray(data.cover) ? data.cover : ["#0E5A5B", "#C9A24B"]) as [string, string],
      products: Array.isArray(data.products) ? data.products.map(String) : [],
      readTime: readingTime(content),
    },
  };
}

function fileNames(): string[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  return fs.readdirSync(JOURNAL_DIR).filter((f) => f.endsWith(".md"));
}

/** All posts, newest first. */
export function getAllPosts(): PostMeta[] {
  return fileNames()
    .map((f) => parseFile(f).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** A single post with rendered HTML, or null if not found. */
export function getPost(slug: string): Post | null {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(JOURNAL_DIR, file))) return null;
  const { meta, body } = parseFile(file);
  return { ...meta, html: marked.parse(body) as string };
}

/** Posts that reference a given product slug (for "stories behind this piece"). */
export function getPostsForProduct(productSlug: string): PostMeta[] {
  return getAllPosts().filter((p) => p.products.includes(productSlug));
}
