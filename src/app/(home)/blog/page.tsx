import BlogPosts from "@/components/BlogPosts";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { blogPosts } from "@/lib/blogData";
import Header from "@/components/Header";
import BlogSideBar from "@/components/BlogSideBar";

export default function Blog() {
  return (
    <div>
      <Header heading="Latest News" subHeading="BLOG POST" />
      <MaxWidthWrapper className="py-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-3/8">
            <BlogPosts posts={blogPosts} />
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
