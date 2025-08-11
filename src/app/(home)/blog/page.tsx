import type { Metadata } from "next";

import BlogListClient from "@/components/BlogListClient";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { blogPosts } from "@/lib/blogData";
import Header from "@/components/Header";
import BlogSideBar from "@/components/BlogSideBar";

export const metadata: Metadata = {
  title: "Blog | Lead Call Pro - Expert Tips for Lead Generation",
  description:
    "Discover proven strategies and expert tips for generating high-quality leads in roofing, HVAC, plumbing, and other home service industries.",
  keywords:
    "lead generation, roofing leads, HVAC leads, plumbing leads, home services marketing",
  openGraph: {
    title: "Blog | Lead Call Pro",
    description:
      "Expert tips and strategies for lead generation in home services",
    type: "website",
  },
};

export default function Blog() {
  return (
    <div>
      <Header heading="Latest News & Expert Tips" subHeading="BLOG POSTS" />
      <MaxWidthWrapper className="py-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 lg:flex-[2]">
            <BlogListClient posts={blogPosts.map(({ Content, ...rest }) => rest)} />
          </div>

          <div className="lg:flex-1">
            <BlogSideBar />
          </div>
        </div>
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
}
