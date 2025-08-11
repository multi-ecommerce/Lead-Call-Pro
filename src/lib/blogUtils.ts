import { BlogPostTypes } from "./types";

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateReadingTime(text: string, wpm = 200) {
  const words = text?.trim()?.split(/\s+/).length || 0;
  const minutes = Math.max(1, Math.ceil(words / wpm));
  return minutes;
}

export function filterPosts(
  posts: BlogPostTypes[],
  searchTerm: string,
  category: string
) {
  const term = searchTerm.toLowerCase();
  return posts.filter((p) => {
    const matchSearch = term
      ? p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.name.toLowerCase().includes(term)
      : true;
    const matchCategory = category === "all" ? true : p.category === category;
    return matchSearch && matchCategory;
  });
}

export function paginatePosts(
  posts: BlogPostTypes[],
  currentPage: number,
  perPage: number
) {
  const total = posts.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const clampedPage = Math.min(Math.max(1, currentPage), totalPages);
  const start = (clampedPage - 1) * perPage;
  const end = start + perPage;
  const paginatedPosts = posts.slice(start, end);
  return {
    paginatedPosts,
    totalPages,
    hasPrevPage: clampedPage > 1,
    hasNextPage: clampedPage < totalPages,
  };
}

export function getRelatedPosts(
  posts: BlogPostTypes[],
  post: BlogPostTypes,
  count = 3
) {
  return posts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, count);
}

export type TocItem = { id: string; text: string; level: number };

export function generateTableOfContents(markdownLike: string): TocItem[] {
  // Extremely simple heading parser for demo
  const lines = markdownLike.split("\n");
  const items: TocItem[] = [];
  for (const line of lines) {
    const match = /^(#{1,6})\s+(.*)/.exec(line.trim());
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      items.push({ id, text, level });
    }
  }
  return items;
}
