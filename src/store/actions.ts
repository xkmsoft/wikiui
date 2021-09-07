import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";
import { store } from "@/store/index";
import { useApi } from "@/composables/api";
import { SearchPair, SearchResults } from "@/types";
import { getters } from "@/store/getters";

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
    query: string
  ): Promise<SearchResults>;
};

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.MakeQuery](
    { commit },
    query: string
  ): Promise<SearchResults> {
    const results = getters.getSearchResults(store.state, query);
    if (results === undefined) {
      const apiResults = await useApi().makeQuery(query);
      const searchPair: SearchPair = {
        query: query,
        results: apiResults,
      };
      commit(MutationType.AddSearchToHistory, searchPair);
      return apiResults;
    } else {
      return results;
    }
  },
};
