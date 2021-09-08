export type Processed = {
  duration: number;
  unit: string;
};

export type SearchResult = {
  url: string;
  rank: number;
  title: string;
  abstract: string;
};

export type SearchResults = {
  processed: Processed;
  number_of_results: number;
  current_page: number;
  number_of_pages: number;
  results: SearchResult[];
};

export type SearchPair = {
  query: string;
  page: number;
  results: SearchResults;
};

export type PaginatedSearchPair = {
  query: string;
  page: number;
  results: SearchResult[];
};

export type QueryPayload = {
  query: string;
  page: number;
};

export type SearchHistory = {
  processed: Processed;
  number_of_results: number;
  current_page: number;
  number_of_pages: number;
  results: Map<number, SearchResult[]>;
};
