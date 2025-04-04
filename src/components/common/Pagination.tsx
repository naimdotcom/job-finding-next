"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
// Import ShadCN Button component

interface Props {
  currentPage: number;
  totalPages: number;
}

function Pagination({ currentPage, totalPages }: Props) {
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const generatePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    for (let i = 1; i <= 3; i++) {
      pages.push(i);
    }

    if (currentPage <= 4) {
      pages.push(4, 5);
      pages.push(-1);
    } else if (currentPage >= totalPages - 3) {
      pages.push(-1);
      pages.push(totalPages - 4, totalPages - 3, totalPages - 2);
    } else {
      pages.push(-1);
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push(-2);
    }

    pages.push(totalPages - 1, totalPages);
    return pages;
  };

  const onPageChange = (page: number) => {
    currentParams.set("page", page.toString());
    route.push(`${pathname}?${currentParams.toString()}`);
  };

  const pages = generatePages();

  return (
    <div className="flex justify-center">
      <div className="flex items-center space-x-2 mt-4">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="px-3 py-1 flex items-center gap-1 text-black dark:text-white disabled:opacity-30"
        >
          <ChevronLeft size={20} />
          Prev
        </Button>

        {/* Map through pages and display buttons */}
        {pages.map((page, index) => {
          if (page === -1 || page === -2) {
            return (
              <span key={`ellipsis-${index}`} className="px-2">
                ...
              </span>
            );
          }

          return (
            <Button
              key={page}
              onClick={() => onPageChange(page)}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              className={
                currentPage === page ? "text-white bg-gray-900" : "text-black"
              }
            >
              {page}
            </Button>
          );
        })}

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className="px-3 py-1 flex items-center gap-1 text-black dark:text-white disabled:opacity-30"
        >
          Next
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
