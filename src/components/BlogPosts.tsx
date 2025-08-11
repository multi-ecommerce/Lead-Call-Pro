"use client";

import Link from "next/link";
import Image from "next/image";

import { CalendarDaysIcon, User2Icon } from "lucide-react";

import { BlogPostTypes } from "@/lib/types";

type Props = {
  posts: Omit<BlogPostTypes, "Content">[];
  loading?: boolean;
};

export default function BlogPosts({ posts, loading = false }: Props) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-8 ">
        {loading && (
          <>
            {[...Array(3)].map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="rounded-md overflow-hidden border border-border bg-card animate-pulse"
              >
                <div className="relative w-full h-[22rem] bg-muted" />
                <div className="p-3 lg:p-10">
                  <div className="h-7 w-2/3 bg-muted rounded mb-4" />
                  <div className="h-4 w-1/3 bg-muted rounded mb-6" />
                  <div className="h-4 w-full bg-muted rounded mb-2" />
                  <div className="h-4 w-5/6 bg-muted rounded" />
                </div>
              </div>
            ))}
          </>
        )}
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-md overflow-hidden border border-border bg-card hover:shadow-sm transition-shadow duration-300"
          >
            <div className="relative w-full h-[22rem]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="p-3 lg:p-10">
              <h3 className="text-foreground text-3xl font-medium mb-2 hover:text-primary">
                {post.title}
              </h3>
              <div className="text-sm text-muted-foreground border-b border-border p-2 my-4 flex gap-8">
                <p className="flex items-center gap-2">
                  <CalendarDaysIcon size={18} className="text-primary" />
                  {post.date}
                </p>
                <p className="flex items-center gap-2">
                  <User2Icon size={18} className="text-primary" />
                  {post.name}
                </p>
              </div>
              <p className="text-muted-foreground text-[1rem] font-sans">
                {post.description}
              </p>
              <div className="flex items-center mt-8">
                <Link
                  href={`/blog/${post.category}/${post.slug}`}
                  className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-md hover:opacity-95 transition-opacity"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
