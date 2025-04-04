import { useState } from "react";
import Button from "./Button";

interface PaginationProps {
  totalPages?: number;
  initialPage?: number;
}

export default function Pagination({
  totalPages = 10,
  initialPage = 1,
}: PaginationProps) {
  const [pageNumber, setPageNumber] = useState(initialPage);

  const goToPreviousPage = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <Button onClick={goToPreviousPage} disabled={pageNumber === 1}>
        Previous
      </Button>
      <p className="min-w-16 text-center">Page {pageNumber}</p>
      <Button onClick={goToNextPage} disabled={pageNumber === totalPages}>
        Next
      </Button>
    </div>
  );
}
