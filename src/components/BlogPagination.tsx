"use client";

type Props = {
  currentPage: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
};

function getPages(current: number, total: number) {
  const pages: (number | string)[] = [];
  const add = (p: number | string) => pages.push(p);

  if (total <= 7) {
    for (let i = 1; i <= total; i++) add(i);
    return pages;
  }

  add(1);
  if (current > 4) add("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) add(i);

  if (current < total - 3) add("...");
  add(total);
  return pages;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  hasPrevPage,
  hasNextPage,
  onPageChange,
}: Props) {
  const pages = getPages(currentPage, totalPages);
  const baseBtn =
    "inline-flex items-center justify-center h-10 min-w-10 px-3 rounded-md border border-border bg-card text-foreground hover:bg-accent transition-colors";
  const activeBtn = "bg-primary text-primary-foreground border-primary";

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        aria-label="Previous"
        className={`${baseBtn} disabled:opacity-50`}
        disabled={!hasPrevPage}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      >
        Prev
      </button>
      {pages.map((p, idx) =>
        typeof p === "number" ? (
          <button
            key={`${p}-${idx}`}
            onClick={() => onPageChange(p)}
            className={`${baseBtn} ${p === currentPage ? activeBtn : ""}`}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </button>
        ) : (
          <span key={`dots-${idx}`} className="px-2 text-muted-foreground">
            {p}
          </span>
        )
      )}
      <button
        aria-label="Next"
        className={`${baseBtn} disabled:opacity-50`}
        disabled={!hasNextPage}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      >
        Next
      </button>
    </div>
  );
}
