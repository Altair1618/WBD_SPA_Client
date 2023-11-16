import React from 'react';

interface PaginationControllerProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationController: React.FC<PaginationControllerProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers: React.ReactNode[] = [];
    let numbers: number[] = [];
    switch (totalPages) {
      case 1: {
        numbers.push(currentPage);
        break;
      }
      case 2: {
        numbers.push(1, totalPages);
        break;
      }
      default: {
        switch (currentPage) {
          case 1: {
            numbers.push(1, 2, 3);
            break;
          }
          case totalPages: {
            numbers.push(totalPages - 2, totalPages - 1, totalPages);
            break;
          }
          default: {
            numbers.push(currentPage - 1, currentPage, currentPage + 1);
            break;
          }
        }
      }
    }
    for (let i of numbers) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-2 py-1 min-w-[35px] rounded-md ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-black'
            }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={`${totalPages < 1 ? "hidden" : "flex"} justify-center mb-5 w-full gap-2`}>
      {/* First Page Button */}
      <button
        className="px-2 bg-gray-400 text-white min-w-[35px] rounded-md"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        {'<<'}
      </button>

      {/* Previous Page Button */}
      <button
        className="px-2 bg-gray-400 text-white min-w-[35px] rounded-md"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {'<'}
      </button>

      {/* Page Numbers */}
      {renderPageNumbers()}

      {/* Next Page Button */}
      <button
        className="px-2 bg-gray-400 text-white min-w-[35px] rounded-md"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {'>'}
      </button>

      {/* Last Page Button */}
      <button
        className="px-2 bg-gray-400 text-white min-w-[35px] rounded-md"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        {'>>'}
      </button>
    </div>
  );
};

export default PaginationController;
