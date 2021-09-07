import { SearchResults } from "@/types";

export type State = {
  loading: boolean;
  searchHistory: Map<string, SearchResults>;
};

export const state: State = {
  loading: false,
  searchHistory: new Map<string, SearchResults>(),
};
