import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://leadcallpro.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  ];

  const categoryRoutes = Array.from(new Set(blogPosts.map((p) => p.category))).map((cat) => ({
    url: `${SITE_URL}/blog/${cat}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const postRoutes = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.category}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
