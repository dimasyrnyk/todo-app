import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Search.scss";
import { AppDispatch, RootState } from "@store/index";
import { searchTodos } from "@store/todos/TodosSlice";
import { InputPlaceholder } from "@constants/app";
import TodoInput from "@components/Inputs/TodoInput";
import CloseBtn from "@components/Buttons/CloseBtn/CloseBtn";
import SearchIcon from "@components/Icons/SearchIcon";

const Search: FC = () => {
  const { todos, searchValue } = useSelector((state: RootState) => ({
    todos: state.todos.todos,
    searchValue: state.todos.searchValue,
  }));
  const dispatch: AppDispatch = useDispatch();

  function handleSearch(value: string = searchValue) {
    if (todos.length) {
      dispatch(searchTodos(value.toLowerCase()));
    }
  }

  function handleSearchReset() {
    dispatch(searchTodos(""));
  }

  return (
    <div className="search__wrapper">
      <TodoInput
        inputValue={searchValue}
        setInputValue={handleSearch}
        onKeyDown={handleSearch}
        placeholder={InputPlaceholder.Search}
      >
        {!!searchValue ? (
          <CloseBtn onClick={handleSearchReset} />
        ) : (
          <span className="search__icon">
            <SearchIcon />
          </span>
        )}
      </TodoInput>
    </div>
  );
};

export default Search;
