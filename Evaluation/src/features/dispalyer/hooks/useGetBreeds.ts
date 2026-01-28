import { useEffect, useState } from "react";
import { BREEDS_URL } from "../constants";
import type { Breed } from "../types/breeds";
import { addPaginationToUrl } from "@/lib/addPaginationToUrl";

export const useGetBreeds = ({
  url = BREEDS_URL,
  page = "1",
  size = "10",
}: { url?: string; page?: string; size?: string } = {}) => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const paginatedUrl = addPaginationToUrl({ url, page, size });
    fetch(paginatedUrl)
      .then((res) => res.json())
      .then((breedsRes) => {
        setBreeds(breedsRes.data);
        setTotal(breedsRes.meta.pagination.records);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  return { breeds, isLoading, error, total };
};
