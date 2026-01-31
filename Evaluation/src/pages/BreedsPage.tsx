import InfiniteList from "@/features/dispalyer/components/InfiniteList";
import ListItem from "@/features/dispalyer/components/ListItem";
import { useFetchBreeds } from "@/features/dispalyer/services/useFetchBreeds";
import type { Breed } from "@/features/dispalyer/types/breeds";
import { useState } from "react";

export default function BreedsPage() {
  const [page, setPage] = useState(1);

  const { breeds, isLoading, error, hasMore } = useFetchBreeds({
    page,
  });
  return (
    <InfiniteList
      isLoading={isLoading}
      error={error}
      hasMore={hasMore}
      setPage={setPage}
    >
      <div>
        {breeds.map((breed: Breed) => (
          <ul>
            <ListItem key={breed.id}>
              <div>
                <h2 className="text-xl font-semibold">
                  {breed.attributes?.name}
                </h2>
                <p className="text-gray-800">{breed.attributes?.description}</p>
              </div>
            </ListItem>
          </ul>
        ))}
      </div>
    </InfiniteList>
  );
}
