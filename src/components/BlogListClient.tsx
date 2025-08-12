"use client";

import { useMemo, useState } from "react";
import BlogPosts from "@/components/BlogPosts";
import BlogSearchFilter from "@/components/BlogSearchFilter";
import BlogPagination from "@/components/BlogPagination";
import { filterPosts, paginatePosts } from "@/lib/blogUtils";
import { BlogPostTypes } from "@/lib/types";

type ListPost = Omit<BlogPostTypes, "Content">;

type Props = {
  posts: ListPost[];
};

export default function BlogListClient({ posts }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState(false);

  const postsPerPage = 6;

  const filteredPosts = useMemo(() => {
    return filterPosts(
      posts as unknown as BlogPostTypes[],
      searchTerm,
      selectedCategory
    ) as unknown as ListPost[];
  }, [searchTerm, selectedCategory, posts]);

  const paginationData = useMemo(() => {
    const paged = paginatePosts(
      filteredPosts as unknown as BlogPostTypes[],
      currentPage,
      postsPerPage
    );
    return {
      ...paged,
      paginatedPosts: paged.paginatedPosts as unknown as ListPost[],
    };
  }, [filteredPosts, currentPage, postsPerPage]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <BlogSearchFilter
        posts={posts}
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />

      <div className="mb-6">
        <p className="text-muted-foreground">
          {filteredPosts.length === posts.length ? (
            <>
              Showing all{" "}
              <span className="font-semibold">{filteredPosts.length}</span>{" "}
              posts
            </>
          ) : (
            <>
              Showing{" "}
              <span className="font-semibold">{filteredPosts.length}</span> of{" "}
              <span className="font-semibold">{posts.length}</span> posts
              {searchTerm && (
                <span>
                  {" "}
                  for "<span className="font-semibold">{searchTerm}</span>"
                </span>
              )}
              {selectedCategory !== "all" && (
                <span>
                  {" "}
                  in{" "}
                  <span className="font-semibold capitalize">
                    {selectedCategory}
                  </span>
                </span>
              )}
            </>
          )}
        </p>
      </div>

      <BlogPosts posts={paginationData.paginatedPosts} loading={loading} />

      <BlogPagination
        currentPage={currentPage}
        totalPages={paginationData.totalPages}
        onPageChange={handlePageChange}
        hasNextPage={paginationData.hasNextPage}
        hasPrevPage={paginationData.hasPrevPage}
      />
    </div>
  );
}
