import type { Metadata } from "next";

import { blogPosts } from "@/lib/blogData";
import PostDetails from "@/components/PostDetails";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

function capitalizeWords(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const name = (await params).slug;
  const Capitalize = capitalizeWords(name);
  return {
    title: `${Capitalize}`,
  };
};

// Pre-renders all dynamic routes at build time, improving performance and SEO.
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export default async function BlogPostPage(props: PageProps) {
  const { category, slug } = await props.params;

  const post = blogPosts.find(
    (p) => p.category === category && p.slug === slug
  );
  if (!post) return <div className="p-10">Post not found.</div>;
  return <PostDetails post={post} />;
}
