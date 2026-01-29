import { addPaginationToUrl } from "@/lib/addPaginationToUrl";
import { BREEDS_URL } from "../constants";
import { useEffect, useState } from "react";
import type { Breed } from "../types/breeds";
type fetchBreedsProps = {
  url?: string;
  page?: number;
  size?: number;
};
export const useFetchBreeds = ({
  url = BREEDS_URL,
  page = 1,
  size = 20,
}: fetchBreedsProps) => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null | boolean>(null);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const paginatedUrl = addPaginationToUrl({
          url,
          page: String(page),
          size: String(size),
        });
        const resBreeds = await fetch(paginatedUrl);
        const res = await resBreeds.json();

        setBreeds((prev) => {
          const newData = [...prev, ...res.data];
          if (newData.length < res.meta.pagination.records) {
            setHasMore(true);
          } else {
            setHasMore(false);
          }
          return newData;
        });
      } catch {
        setError(true);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page]);

  return { breeds, isLoading, error, hasMore };
};
