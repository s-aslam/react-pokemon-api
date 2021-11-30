import React from "react";
import { Pagination } from "react-bootstrap";
import { DEFAULT_LIMIT } from "../config/constant";

function getPager(totalPages, currentPage = 1) {
  if (totalPages !== undefined && totalPages !== null && totalPages !== 0) {
    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      currentPage: currentPage,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      pages: pages,
    };
  }
}

const Paginations = (props) => {
  const { page, totalCounts, onPageChange } = props;
  
  if (totalCounts <= DEFAULT_LIMIT) return <></>;
  
  const totalPages = Math.round(totalCounts / DEFAULT_LIMIT);
  const { pages, endPage, startPage, currentPage } = getPager(totalPages, page);
  
  if (totalPages <= 1) return <></>;

  return (
    <Pagination className="d-flex justify-content-end mt-1">
      <Pagination.Prev
        disabled={currentPage === startPage}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {pages.map((page) => {
        return (
          <Pagination.Item
            key={page}
            onClick={() => onPageChange(page)}
            active={page === currentPage}
          >
            {page}
          </Pagination.Item>
        );
      })}
      <Pagination.Next
        disabled={currentPage === endPage}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </Pagination>
  );
};
export default Paginations;
