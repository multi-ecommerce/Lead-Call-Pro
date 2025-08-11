"use client";

import { TocItem } from "@/lib/blogUtils";

type Props = {
  items: TocItem[];
  title?: string;
};

export default function TableOfContents({ items, title = "On this page" }: Props) {
  if (!items?.length) return null;
  return (
    <nav aria-label="Table of contents" className="rounded-md border border-border bg-card p-4">
      <p className="mb-2 text-sm font-medium text-foreground">{title}</p>
      <ul className="space-y-1 text-sm">
        {items.map((i) => (
          <li key={i.id} style={{ paddingLeft: `${(i.level - 1) * 12}px` }}>
            <a
              href={`#${i.id}`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {i.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
