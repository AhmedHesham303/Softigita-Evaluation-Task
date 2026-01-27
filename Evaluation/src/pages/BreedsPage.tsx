import InfiniteList from "@/features/dispalyer/components/InfiniteList";
import { useGetBreeds } from "@/features/dispalyer/hooks/useGetBreeds";

export default function BreedsPage() {
  const { breeds, isLoading, error } = useGetBreeds();

  return <InfiniteList items={breeds} isLoading={isLoading} error={error} />;
}
