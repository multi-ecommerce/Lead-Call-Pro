import { blogPosts } from "@/lib/blogData";
import PostDetails from "@/components/PostDetails";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

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
