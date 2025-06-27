import { blogPosts } from "@/lib/blogData";
import BlogPosts from "@/components/BlogPosts";
import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Footer from "@/components/Footer";
import BlogSideBar from "@/components/BlogSideBar";

interface PageProps {
  params: Promise<{ category: string }>;
}

// Pre-renders all dynamic routes at build time, improving performance and SEO.
export async function generateStaticParams() {
  const categories = [...new Set(blogPosts.map((p) => p.category))];
  return categories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  const filtered = blogPosts.filter((p) => p.category === category);
  if (!filtered) return <div className="p-10">Post not found.</div>;
  return (
    <div>
      <Header heading="Latest News" subHeading="BLOG POST" />
      <MaxWidthWrapper className="py-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-3/8">
            <BlogPosts posts={filtered} />
          </div>
          <div className="flex-1">
            <BlogSideBar />
          </div>
        </div>
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
}
