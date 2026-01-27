import { useEffect, useState } from "react";
import { BREEDS_URL } from "../constants";
import type { Breed } from "../types/breeds";

export const useGetBreeds = ({ url = BREEDS_URL }: { url?: string } = {}) => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((breedsRes) => {
        setBreeds(breedsRes.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  return { breeds, isLoading, error };
};
