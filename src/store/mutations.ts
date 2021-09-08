import { MutationTree } from "vuex";
import { State } from "@/store/state";
import {
  PaginatedSearchPair,
  SearchHistory,
  SearchPair,
  SearchResult,
} from "@/types";

export enum MutationType {
  SetLoading = "SET_LOADING",
  AddSearchToHistory = "ADD_SEARCH_TO_HISTORY",
  AddPaginatedHistory = "ADD_PAGINATED_HISTORY",
  SetCurrentPage = "SET_CURRENT_PAGE",
  SetQuery = "SET_QUERY",
}

export type Mutations = {
  [MutationType.SetLoading](state: State, value: boolean): void;
  [MutationType.AddSearchToHistory](state: State, value: SearchPair): void;
  [MutationType.AddPaginatedHistory](
    state: State,
    value: PaginatedSearchPair
  ): void;
  [MutationType.SetCurrentPage](state: State, value: number): void;
  [MutationType.SetQuery](state: State, value: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetLoading](state, value) {
    state.loading = value;
  },
  [MutationType.AddSearchToHistory](state, value) {
    if (!state.searchHistory.has(value.query)) {
      const resultsMap = new Map<number, SearchResult[]>();
      resultsMap.set(value.page, value.results.results);
      const history: SearchHistory = {
        processed: value.results.processed,
        number_of_results: value.results.number_of_results,
        current_page: value.results.current_page,
        number_of_pages: value.results.number_of_pages,
        results: resultsMap,
      };
      state.searchHistory.set(value.query, history);
    }
  },
  [MutationType.AddPaginatedHistory](state, value) {
    const history = state.searchHistory.get(value.query);
    if (history !== undefined) {
      history.results.set(value.page, value.results);
    }
  },
  [MutationType.SetCurrentPage](state, value) {
    state.currentPage = value;
  },
  [MutationType.SetQuery](state, value) {
    state.query = value;
  },
};
