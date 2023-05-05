import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImSearch } from "react-icons/im";

import "./Search.scss";
import TodoInput from "../../components/Inputs/TodoInput";
import CloseBtn from "../Buttons/CloseBtn/CloseBtn";
import { searchTodos } from "../../store/todos/actions";
import { AppDispatch, RootState } from "../../store";
import { InputPlaceholder } from "../../types/app";

const Search: FC = () => {
  const { todos, searchValue } = useSelector((state: RootState) => ({
    todos: state.todos.todos,
    searchValue: state.todos.searchValue,
  }));
  const dispatch: AppDispatch = useDispatch();

  function handleSearch(value: string = "") {
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
            <ImSearch />
          </span>
        )}
      </TodoInput>
    </div>
  );
};

export default Search;
