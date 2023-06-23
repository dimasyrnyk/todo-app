import { FC, useState } from "react";

import "./Search.scss";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { searchTodos } from "@store/todos/ActionCreators";
import { setSearchValue } from "@store/todos/TodosSlice";
import { InputPlaceholder, NavBarTabs } from "@constants/app";
import TodoInput from "@components/Inputs/TodoInput";
import CloseBtn from "@components/Buttons/CloseBtn/CloseBtn";
import SearchIcon from "@components/Icons/SearchIcon";
import { getSearchParams } from "@utils/getSearchParams";

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.todos);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  function handleSearch(value: string = searchValue) {
    dispatch(setSearchValue(value));
    const params = getSearchParams(value);

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      dispatch(searchTodos(params));
    }, 500);
    setTimer(newTimer);
  }

  function handleSearchReset() {
    const params = getSearchParams();
    dispatch(setSearchValue(""));
    dispatch(searchTodos(params));
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
