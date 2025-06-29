import Image from "next/image";

import { CalendarDaysIcon, User2Icon } from "lucide-react";

import { BlogPostTypes } from "@/lib/types";

type Props = {
  post: BlogPostTypes;
};

export default function PostDetails({ post }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h3 className="text-[#16334e] text-4xl font-bold mb-2 hover:text-blue-600">
        {post.title}
      </h3>
      <div className="text-sm text-gray-500 p-2 my-4 flex gap-8">
        <p className="flex items-center gap-2">
          <CalendarDaysIcon size={18} className="text-blue-600" />
          {post.date}
        </p>
        <p className="flex items-center gap-2">
          <User2Icon size={18} className="text-blue-600" />
          {post.name}
        </p>
      </div>
      <div className="relative w-full h-[22rem] lg:h-[30rem] mb-6">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover rounded-lg"
        />
      </div>
      <article className="prose prose-lg px-4">
        <post.Content />
      </article>
    </div>
  );
}
