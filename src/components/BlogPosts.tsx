import Link from "next/link";
import Image from "next/image";

import { CalendarDaysIcon, User2Icon } from "lucide-react";

import { BlogPostTypes } from "@/lib/types";

type Props = {
  posts: BlogPostTypes[];
};

export default function BlogPosts({ posts }: Props) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-8 ">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-full h-[22rem]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3 lg:p-10">
              <h3 className="text-[#16334e] text-3xl font-medium mb-2 hover:text-blue-600">
                {post.title}
              </h3>
              <div className="text-sm text-gray-500 border-b p-2 my-4 flex gap-8">
                <p className="flex items-center gap-2">
                  <CalendarDaysIcon size={18} className="text-blue-600" />
                  {post.date}
                </p>
                <p className="flex items-center gap-2">
                  <User2Icon size={18} className="text-blue-600" />
                  {post.name}
                </p>
              </div>
              <p className="text-[#505050] text-[1rem] font-sans">
                {post.description}
              </p>
              <div className="flex items-center mt-8">
                <Link
                  href={`/blog/${post.category}/${post.slug}`}
                  className="bg-blue-600 text-white font-bold px-8 py-3 rounded-4xl"
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
