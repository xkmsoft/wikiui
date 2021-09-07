import axios from "axios";
import { SearchResults } from "@/types";

export interface Api {
  makeQuery(query: string): Promise<SearchResults>;
}

export function useApi(): Api {
  const makeQuery = async (query: string): Promise<SearchResults> => {
    const url = "/api/query";
    const response = await axios.post(url, { query: query });
    return await response.data;
  };
  return {
    makeQuery,
  };
}
