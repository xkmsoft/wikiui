import { MutationTree } from "vuex";
import { State } from "@/store/state";
import { SearchPair } from "@/types";

export enum MutationType {
  SetLoading = "SET_LOADING",
  AddSearchToHistory = "ADD_SEARCH_TO_HISTORY",
}

export type Mutations = {
  [MutationType.SetLoading](state: State, value: boolean): void;
  [MutationType.AddSearchToHistory](state: State, value: SearchPair): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetLoading](state, value) {
    state.loading = value;
  },
  [MutationType.AddSearchToHistory](state, value) {
    if (!state.searchHistory.has(value.query)) {
      state.searchHistory.set(value.query, value.results);
    }
  },
};
