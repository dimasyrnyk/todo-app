import { RefObject, useEffect, useState } from "react";

import "./Pagination.scss";
import PaginationButton from "./PaginationButton";
import { ITodoDto } from "@constants/todo";
import {
  CURRENT_PAGE,
  ITEMS_PER_PAGE,
  MAX_PAGE_NUMBER_LIMIT,
  MIN_PAGE_NUMBER_LIMIT,
  PAGE_NUMBER_LIMIT,
} from "@constants/app";

type Props = {
  todos: ITodoDto[];
  setTodos: (todos: ITodoDto[]) => void;
  scrollToTopRef: RefObject<HTMLDivElement>;
};

function Pagination({ todos, setTodos, scrollToTopRef }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(CURRENT_PAGE);
  const [itemsPerPage, setItemsPerPage] = useState<number>(ITEMS_PER_PAGE);

  const [pageNumberLimit, setPageNumberLimit] =
    useState<number>(PAGE_NUMBER_LIMIT);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState<number>(
    MAX_PAGE_NUMBER_LIMIT
  );
  const [minPageNumberLimit, setMinPageNumberLimit] = useState<number>(
    MIN_PAGE_NUMBER_LIMIT
  );

  const pagesCount = Math.ceil(todos.length / itemsPerPage);
  const pages: number[] = Array.from(
    { length: pagesCount },
    (_, index) => index + 1
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = todos.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(CURRENT_PAGE);
    setItemsPerPage(ITEMS_PER_PAGE);
    setMaxPageNumberLimit(MAX_PAGE_NUMBER_LIMIT);
    setMinPageNumberLimit(MIN_PAGE_NUMBER_LIMIT);
  }, [todos.length]);

  useEffect(() => {
    setTodos(currentItems);
  }, [currentPage, itemsPerPage, todos]);

  useEffect(() => {
    if (scrollToTopRef.current) {
      scrollToTopRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.target as HTMLElement;
    const id = element.getAttribute("id") as string;
    setCurrentPage(+id);
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={`${number}`}
          className={currentPage === number ? "active" : ""}
          onClick={handleClick}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = (pageAmount: number) => {
    const isPage = currentPage + pageAmount < pagesCount;
    const newPage = isPage ? currentPage + pageAmount : pagesCount;
    setCurrentPage(newPage);

    if (currentPage + pageAmount > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = (pageAmount: number) => {
    const newPage = currentPage - pageAmount;
    setCurrentPage(newPage);

    if (currentPage - pageAmount <= minPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li onClick={() => handleNextbtn(pageNumberLimit)}> &hellip; </li>
    );
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li onClick={() => handlePrevbtn(pageNumberLimit)}> &hellip; </li>
    );
  }

  return (
    <div className="paginate__container">
      <div className="paginate">
        <span>Page:</span>
        <ul className="paginate__pages">
          <PaginationButton
            title="<"
            show={currentPage !== pages[0]}
            onClick={() => handlePrevbtn(1)}
          />
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
          <PaginationButton
            title=">"
            show={currentPage !== pagesCount}
            onClick={() => handleNextbtn(1)}
          />
        </ul>
      </div>
      <div className="">
        <span>{itemsPerPage} Todos</span>
      </div>
    </div>
  );
}

export default Pagination;
