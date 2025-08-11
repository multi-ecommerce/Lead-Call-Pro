import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

import { CalendarDaysIcon, User2Icon, ChevronRight } from "lucide-react";

import { BlogPostTypes } from "@/lib/types";
import AutoTOC from "./AutoTOC";
import SocialShare from "./SocialShare";
import RelatedPosts from "./RelatedPosts";
import { blogPosts } from "@/lib/blogData";
import { getRelatedPosts } from "@/lib/blogUtils";

type Props = {
  post: BlogPostTypes;
};

export default function PostDetails({ post }: Props) {
  const related = useMemo(() => getRelatedPosts(blogPosts, post, 3), [post]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: [post.image],
    datePublished: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.name,
    },
    description: post.description,
  } as const;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-4 text-sm">
        <ol className="flex items-center gap-2 text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary">Home</Link>
          </li>
          <ChevronRight size={14} />
          <li>
            <Link href="/blog" className="hover:text-primary">Blog</Link>
          </li>
          <ChevronRight size={14} />
          <li>
            <Link href={`/blog/${post.category}`} className="capitalize hover:text-primary">
              {post.category}
            </Link>
          </li>
          <ChevronRight size={14} />
          <li className="text-foreground line-clamp-1" aria-current="page">
            {post.title}
          </li>
        </ol>
      </nav>

      <h1 className="text-foreground text-4xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-muted-foreground border-b border-border pb-3 my-4 flex flex-wrap gap-6">
        <p className="flex items-center gap-2">
          <CalendarDaysIcon size={18} className="text-primary" />
          {post.date}
        </p>
        <p className="flex items-center gap-2">
          <User2Icon size={18} className="text-primary" />
          {post.name}
        </p>
        {/* Reading time removed from server component; can be added via client subcomponent if desired */}
      </div>

      <div className="relative w-full h-[22rem] lg:h-[30rem] mb-6 rounded-md overflow-hidden border border-border">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 order-last lg:order-first">
          <AutoTOC title="On this page" />
        </aside>
        <article id="post-content" className="prose prose-lg dark:prose-invert lg:col-span-3">
          <post.Content />
        </article>
      </div>

      <section className="mt-10">
        <h3 className="text-lg font-semibold mb-3 text-foreground">Share this article</h3>
        <SocialShare title={post.title} />
      </section>

      <RelatedPosts posts={related} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
