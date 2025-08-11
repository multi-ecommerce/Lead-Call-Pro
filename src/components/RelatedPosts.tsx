import Image from "next/image";
import Link from "next/link";
import { BlogPostTypes } from "@/lib/types";

type Props = {
  posts: BlogPostTypes[];
  heading?: string;
};

export default function RelatedPosts({ posts, heading = "Related Articles" }: Props) {
  if (!posts?.length) return null;
  return (
    <section className="mt-12">
      <h3 className="text-xl font-semibold mb-4 text-foreground">{heading}</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/blog/${p.category}/${p.slug}`}
            className="group rounded-md overflow-hidden border border-border bg-card hover:shadow-sm transition-shadow"
          >
            <div className="relative h-40 w-full">
              <Image src={p.image} alt={p.title} fill className="object-cover" />
            </div>
            <div className="p-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{p.category}</p>
              <h4 className="mt-1 text-sm font-medium text-foreground group-hover:text-primary line-clamp-2">
                {p.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
