import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from "react-icons/im";

import "./Search.scss";
import TodoInput from "../../components/Inputs/TodoInput";
import { searchTodos } from "../../store/todos/actions";
import { AppDispatch, RootState } from "../../store";
import { InputPlaceholder } from "../../types/app";

const Search: FC = () => {
  const { alltodos, searchValue } = useSelector((state: RootState) => ({
    alltodos: state.todos.allTodos,
    searchValue: state.todos.searchValue,
  }));
  const dispatch: AppDispatch = useDispatch();

  function handleSearch(value: string = "") {
    if (alltodos.length) {
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
        {!!searchValue && (
          <button
            className="search__btn-close"
            onClick={handleSearchReset}
          >
            <ImCross />
          </button>
        )}
      </TodoInput>
    </div>
  );
};

export default Search;
