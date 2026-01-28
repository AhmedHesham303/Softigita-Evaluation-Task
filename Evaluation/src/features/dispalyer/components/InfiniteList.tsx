import ListItem from "./ListItem";
import type { Breed } from "../types/breeds";
import Spinner from "@/components/common/Spinner";
import { useEffect, useRef, useState } from "react";

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
  const spinnerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      },
    );
    if (spinnerRef.current) {
      observer.observe(spinnerRef.current);
    }
    return () => {
      if (spinnerRef.current) observer.unobserve(spinnerRef.current);
    };
  }, [spinnerRef]);
  console.log(isIntersecting);
  return (
    <div className="flex py-16 justify-between items-center flex-col my-auto">
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>!error</p>
      ) : (
        <div>
          {
            <ul className=" flex justify-between items-center flex-col gap-1">
              {items.map((breed: Breed) => (
                <ListItem key={breed.id}>{breed.attributes?.name}</ListItem>
              ))}
            </ul>
          }
        </div>
      )}
      <div ref={spinnerRef} className="mt-16">
        <Spinner />
      </div>
    </div>
  );
}
