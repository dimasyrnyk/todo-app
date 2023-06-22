import { NavBarTabs } from "@constants/app";
import { store } from "@store/index";
import { SearchParams } from "@store/types/todos";

export const getSearchParams = (value: string = "") => {
  const activeTab = store.getState().todos.activeTab;

  let params = value ? { searchTerm: value.trim() } : {};

  params =
    activeTab !== NavBarTabs.All
      ? { ...params, ...SearchParams[activeTab] }
      : params;

  return params;
};
