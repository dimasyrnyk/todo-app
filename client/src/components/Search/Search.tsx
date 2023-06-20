import { FC, useEffect } from "react";

import "./Search.scss";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { searchTodos } from "@store/todos/ActionCreators";
import { setSearchValue } from "@store/todos/TodosSlice";
import { InputPlaceholder } from "@constants/app";
import { useDebounce } from "src/hooks/useDebbounce";
import TodoInput from "@components/Inputs/TodoInput";
import CloseBtn from "@components/Buttons/CloseBtn/CloseBtn";
import SearchIcon from "@components/Icons/SearchIcon";

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.todos);
  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    dispatch(searchTodos({ searchTerm: debouncedValue }));
  }, [debouncedValue]);

  function handleSearch(value: string = searchValue) {
    dispatch(setSearchValue(value));
  }

  function handleSearchReset() {
    dispatch(setSearchValue(""));
    dispatch(searchTodos({ searchTerm: "" }));
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
