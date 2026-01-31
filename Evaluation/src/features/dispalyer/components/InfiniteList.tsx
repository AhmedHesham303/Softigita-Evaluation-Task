import ListItem from "./ListItem";
import type { Breed } from "../types/breeds";
import Spinner from "@/components/common/Spinner";
import { useEffect, useRef, useState } from "react";

import { useFetchBreeds } from "../services/useFetchBreeds";
import NoMoreData from "./NoMoreData";

export default function InfiniteList({
  threshold = 0,
}: {
  threshold?: number;
}) {
  if (threshold < 1) {
    threshold = window.innerHeight * threshold;
  }
  console.log("threshold", threshold);
  const [page, setPage] = useState(1);

  const { breeds, isLoading, error, hasMore } = useFetchBreeds({
    page,
  });

  const spinnerRef = useRef<HTMLDivElement>(null);

  const [isSpinnerRefVisible, setIsSpinnerRefVisible] = useState(false);
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
  }, [isSpinnerRefVisible]);
  useEffect(() => {
    if (hasMore && isIntersecting && !isLoading) {
      // to prevent multiple calls
      setPage((prev) => prev + 1);
    }
  }, [isIntersecting]);
  return (
    <div className="flex py-16 justify-between items-center flex-col my-auto">
      {isLoading && !hasMore ? (
        <div className="my-auto ">
          <Spinner loadingText="Loading initial data" />
        </div>
      ) : error ? (
        <p>!error</p>
      ) : (
        <div>
          {
            <ul className=" flex justify-between items-center flex-col gap-1">
              {breeds.map((breed: Breed) => (
                <ListItem key={breed.id} breed={breed} />
              ))}
            </ul>
          }
        </div>
      )}
      {hasMore ? (
        <div
          ref={(el) => {
            spinnerRef.current = el;
            setIsSpinnerRefVisible((prev) => !prev);
          }}
          className="flex flex-col justify-center items-center "
        >
          <div className={`w-2 h-[${threshold}px]`}></div>
          <Spinner loadingText="loading more data" />
        </div>
      ) : (
        !isLoading && <NoMoreData />
      )}
    </div>
  );
}
