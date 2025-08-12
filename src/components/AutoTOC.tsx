"use client";

import { useEffect, useState } from "react";
import TableOfContents from "./TableOfContents";
import type { TocItem } from "@/lib/blogUtils";

type Props = {
  containerSelector?: string;
  title?: string;
};

export default function AutoTOC({ containerSelector = "#post-content", title }: Props) {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const headings = container.querySelectorAll("h2, h3");
    const parsed: TocItem[] = [];
    headings.forEach((h) => {
      const level = h.tagName === "H2" ? 2 : 3;
      if (!h.id) {
        const id = h.textContent?.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-") || "section";
        h.id = id;
      }
      parsed.push({ id: h.id, text: h.textContent || "", level });
    });
    setItems(parsed);
  }, [containerSelector]);

  if (!items.length) return null;
  return <TableOfContents items={items} title={title} />;
}
