import ListItem from "./ListItem";
import type { Breed } from "../types/breeds";

type InfiniteListProps = {
  items: Breed[];
  isLoading: boolean;
  error: Error | null;
};
export default function InfiniteList({
  items,
  isLoading,
  error,
}: InfiniteListProps) {
  if (isLoading) return <p>...loading</p>;
  if (error) return <p>!error</p>;
  return (
    <ul className="mt-16 flex justify-between items-center flex-col gap-1">
      {items.map((breed: Breed) => (
        <ListItem key={breed.id}>{breed.attributes?.name}</ListItem>
      ))}
    </ul>
  );
}
