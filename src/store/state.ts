import { SearchHistory } from "@/types";

export type State = {
  loading: boolean;
  query: string;
  currentPage: number;
  searchHistory: Map<string, SearchHistory>;
};

export const state: State = {
  loading: false,
  query: "",
  currentPage: 1,
  searchHistory: new Map<string, SearchHistory>(),
};
