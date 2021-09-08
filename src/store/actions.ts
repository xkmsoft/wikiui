import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";
import { store } from "@/store/index";
import { useApi } from "@/composables/api";
import { PaginatedSearchPair, QueryPayload, SearchPair } from "@/types";

export enum ActionTypes {
  MakeQuery = "MAKE_QUERY",
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionTypes.MakeQuery](
    context: ActionAugments,
    payload: QueryPayload
  ): Promise<void>;
};

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.MakeQuery](
    { commit },
    payload: QueryPayload
  ): Promise<void> {
    commit(MutationType.SetQuery, payload.query);
    commit(MutationType.SetCurrentPage, payload.page);
    const currentSearch = store.state.searchHistory.get(store.state.query);
    if (currentSearch === undefined) {
      const apiResults = await useApi().makeQuery(payload.query, payload.page);
      const searchPair: SearchPair = {
        query: payload.query,
        page: payload.page,
        results: apiResults,
      };
      commit(MutationType.AddSearchToHistory, searchPair);
    } else {
      if (payload.page > 1) {
        const apiResults = await useApi().makeQuery(
          payload.query,
          payload.page
        );
        const paginatedSearchPair: PaginatedSearchPair = {
          query: payload.query,
          page: payload.page,
          results: apiResults.results,
        };
        commit(MutationType.AddPaginatedHistory, paginatedSearchPair);
      } else {
        const lastPage = currentSearch.results.size;
        commit(MutationType.SetCurrentPage, lastPage);
      }
    }
  },
};
