/**
 * Journal / "Stories" data layer, reads markdown files from `content/journal/`.
 *
 * Adding a post = drop a new `.md` file in that folder with frontmatter:
 *
 *   ---
 *   title: "..."
 *   date: "2026-05-12"          # ISO date, used for ordering
 *   kind: "The craft"           # small label
 *   excerpt: "..."              # one-line teaser
 *   cover: ["#E08A1E", "#B5267A"]   # two-stop placeholder swatch (until photos)
 *   products: ["marigold-jhumka"]   # related product slugs (optional)
 *   edits: ["gulzar"]               # related edit slugs (optional)
 *   featured: true                  # pin as the headline story (optional)
 *   status: "upcoming"              # stub a not-yet-written post (optional)
 *   ---
 *
 * Read time is computed automatically from the body, no need to set it.
 * This module is server-only (it touches the filesystem at build time).
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const JOURNAL_DIR = path.join(process.cwd(), "content", "journal");

export type PostStatus = "published" | "upcoming";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  kind: string;
  excerpt: string;
  /** Placeholder cover gradient until real photography is added. */
  cover: [string, string];
  /** Optional real cover photograph (path under /public). */
  image?: string;
  /** Related product slugs. */
  products: string[];
  /** Related edit (collection) slugs. */
  edits: string[];
  featured: boolean;
  status: PostStatus;
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
      image: typeof data.image === "string" ? data.image : undefined,
      products: Array.isArray(data.products) ? data.products.map(String) : [],
      edits: Array.isArray(data.edits) ? data.edits.map(String) : [],
      featured: Boolean(data.featured),
      status: data.status === "upcoming" ? "upcoming" : "published",
      readTime: readingTime(content),
    },
  };
}

function fileNames(): string[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  return fs.readdirSync(JOURNAL_DIR).filter((f) => f.endsWith(".md"));
}

const allMeta = (): PostMeta[] => fileNames().map((f) => parseFile(f).meta);

const byNewest = (a: PostMeta, b: PostMeta) => (a.date < b.date ? 1 : -1);

/** Published posts, newest first. */
export function getAllPosts(): PostMeta[] {
  return allMeta()
    .filter((p) => p.status === "published")
    .sort(byNewest);
}

/** Stubbed, not-yet-written posts (shown as "coming soon"; no page). */
export function getUpcomingPosts(): PostMeta[] {
  return allMeta()
    .filter((p) => p.status === "upcoming")
    .sort(byNewest);
}

/** The pinned headline story ("One of a Kind"), if any. */
export function getFeaturedPost(): PostMeta | null {
  return getAllPosts().find((p) => p.featured) ?? null;
}

/** A single published post with rendered HTML, or null if missing/upcoming. */
export function getPost(slug: string): Post | null {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(JOURNAL_DIR, file))) return null;
  const { meta, body } = parseFile(file);
  if (meta.status !== "published") return null;
  return { ...meta, html: marked.parse(body) as string };
}

/** Published posts referencing a given product slug. */
export function getPostsForProduct(productSlug: string): PostMeta[] {
  return getAllPosts().filter((p) => p.products.includes(productSlug));
}

/** Published posts referencing a given edit (collection) slug. */
export function getPostsForEdit(editSlug: string): PostMeta[] {
  return getAllPosts().filter((p) => p.edits.includes(editSlug));
}
