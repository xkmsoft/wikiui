import axios from "axios";
import { SearchResults } from "@/types";

export interface Api {
  makeQuery(query: string, page: number): Promise<SearchResults>;
}

export function useApi(): Api {
  const makeQuery = async (
    query: string,
    page: number
  ): Promise<SearchResults> => {
    const url = "/api/query";
    const response = await axios.post(url, {
      query: query,
      page: page,
    });
    return await response.data;
  };
  return {
    makeQuery,
  };
}
