import { GetterTree } from "vuex";
import { State } from "./state";
import { SearchResults } from "@/types";

export type Getters = {
  getSearchResults(state: State, query: string): SearchResults | undefined;
};

export const getters: GetterTree<State, State> & Getters = {
  getSearchResults(state: State, query: string): SearchResults | undefined {
    return state.searchHistory.get(query);
  },
};
