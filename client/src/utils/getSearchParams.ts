import { NavBarTabs } from "@constants/app";
import { store } from "@store/index";
import { ISearchParams } from "@store/types/todos";

export const getSearchParams = () => {
  const { activeTab, searchValue } = store.getState().todos;

  let params: ISearchParams = searchValue
    ? { searchTerm: searchValue.trim() }
    : {};

  params =
    activeTab !== NavBarTabs.All
      ? { ...params, isCompleted: activeTab === NavBarTabs.Completed }
      : params;

  return params;
};
