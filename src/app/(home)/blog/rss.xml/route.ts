import { NextResponse } from "next/server";
import { blogPosts } from "@/lib/blogData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://leadcallpro.com";

export async function GET() {
  const items = blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.category}/${post.slug}`;
      return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${url}</link>
        <guid>${url}</guid>
        <description><![CDATA[${post.description}]]></description>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Lead Call Pro Blog</title>
      <link>${SITE_URL}/blog</link>
      <description>Expert tips and strategies for generating high-quality leads in home services</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
