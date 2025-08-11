"use client";

import { useMemo } from "react";
// Only need category to compute category list
type MinimalPost = { category: string };

type Props = {
  posts: MinimalPost[];
  searchTerm: string;
  selectedCategory: string;
  onSearch: (term: string) => void;
  onCategoryFilter: (category: string) => void;
};

export default function BlogSearchFilter({
  posts,
  searchTerm,
  selectedCategory,
  onSearch,
  onCategoryFilter,
}: Props) {
  const categories = useMemo(() => {
    const set = new Set<string>(["all"]);
    posts.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [posts]);

  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search by title, description, or author"
        className="col-span-2 h-11 px-3 rounded-md bg-card text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/40"
      />

      <select
        value={selectedCategory}
        onChange={(e) => onCategoryFilter(e.target.value)}
        className="h-11 px-3 rounded-md bg-card text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        {categories.map((c) => (
          <option key={c} value={c} className="capitalize">
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
