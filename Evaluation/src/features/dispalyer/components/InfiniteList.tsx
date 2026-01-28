import ListItem from "./ListItem";
import type { Breed } from "../types/breeds";
import Spinner from "@/components/common/Spinner";
import { useEffect, useRef, useState } from "react";
import { useGetBreeds } from "../hooks/useGetBreeds";
import { BREEDS_URL } from "../constants";

// type InfiniteListProps = {
//   items: Breed[];
//   isLoading: boolean;
//   error: Error | null;
// };
export default function InfiniteList() {
  // items,
  // isLoading,
  // error,
  const size = "5";
  const [page, setPage] = useState("1");
  const {
    breeds: items,
    isLoading,
    error,
    total,
  } = useGetBreeds({ url: BREEDS_URL, page, size });
  const [dataToFetch, setDataToFetch] = useState(items);

  const spinnerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    if (items.length > 0) {
      setDataToFetch((prev) => {
        const newData = [...prev, items];
        if (newData.length < total) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
        return newData;
      });
    } else {
      setHasMore(false);
    }
  }, [page]);

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
  useEffect(() => {
    if (isIntersecting) {
      setPage(String(Number(page) + 1));
      useGetBreeds({ url: BREEDS_URL, page, size });
    }
  }, [isIntersecting]);
  console.log(isIntersecting);
  console.log("data to fetch ", dataToFetch);
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
              {dataToFetch.map((breed: Breed) => (
                <ListItem key={breed.id}>{breed.attributes?.name}</ListItem>
              ))}
            </ul>
          }
        </div>
      )}
      {hasMore && (
        <div ref={spinnerRef} className="mt-16">
          <Spinner />
        </div>
      )}
    </div>
  );
}
