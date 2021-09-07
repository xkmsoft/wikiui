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
  results: SearchResult[];
};

export type SearchPair = {
  query: string;
  results: SearchResults;
};
