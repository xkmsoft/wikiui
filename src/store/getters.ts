import { GetterTree } from "vuex";
import { State } from "./state";
import { SearchHistory, SearchResult } from "@/types";
import { store } from "@/store/index";

export type Getters = {
  getSearchResults(state: State): SearchResult[];
  getCurrentSearch(state: State): SearchHistory | undefined;
  hasNextPage(state: State): boolean;
};

export const getters: GetterTree<State, State> & Getters = {
  getSearchResults(state: State): SearchResult[] {
    let array: SearchResult[] = [];
    const current = state.searchHistory.get(state.query);
    if (current === undefined) {
      return array;
    }
    current.results.forEach((value: SearchResult[]) => {
      array = array.concat(value);
    });
    return array;
  },
  getCurrentSearch(state: State): SearchHistory | undefined {
    return state.searchHistory.get(state.query);
  },
  hasNextPage(state: State): boolean {
    const current = store.getters.getCurrentSearch;
    if (current) {
      return state.currentPage < current.number_of_pages;
    }
    return false;
  },
};
