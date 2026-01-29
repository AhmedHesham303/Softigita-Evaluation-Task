import ListItem from "./ListItem";
import type { Breed } from "../types/breeds";
import Spinner from "@/components/common/Spinner";
import { useEffect, useRef, useState } from "react";
// import { useGetBreeds } from "../hooks/useGetBreeds";
import { BREEDS_URL } from "../constants";
import { addPaginationToUrl } from "@/lib/addPaginationToUrl";

// type InfiniteListProps = {
//   items: Breed[];
//   isLoading: boolean;
//   error: Error | null;
// };
export default function InfiniteList() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null | boolean>(null);

  const size = "30";
  const [page, setPage] = useState("1");

  // const {
  //   breeds: items,
  //   isLoading,
  //   error,
  //   total,
  // } = useGetBreeds({ url: BREEDS_URL, page, size });

  const spinnerRef = useRef<HTMLDivElement>(null);
  // const [accumulatedData, setAccumulativeData] = useState(items);
  console.log(breeds, "items");
  // console.log(accumulatedData, "accum data");

  const [isSpinnerRefVisible, setIsSpinnerRefVisible] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const fetchBreeds = async () => {
    try {
      setIsLoading(true);
      setError(false);
      const paginatedUrl = addPaginationToUrl({ url: BREEDS_URL, page, size });
      const resBreeds = await fetch(paginatedUrl);
      const res = await resBreeds.json();
      setTotal(res.meta.pagination.records);

      setBreeds((prev) => {
        const newData = [...prev, ...res.data];
        if (newData.length < total) {
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
  useEffect(() => {
    fetchBreeds();
  }, [page]);
  // useEffect(() => {

  //     .catch((err) => {

  //     })
  //     .finally(() => {

  //     });
  // }, [page]);
  // useEffect(() => {
  //   if (items.length > 0) {
  //     setDataToFetch((prev) => {
  //       const newData = [...prev, items];
  //       if (newData.length < total) {
  //         setHasMore(true);
  //       } else {
  //         setHasMore(false);
  //       }
  //       return newData;
  //     });
  //   } else {
  //     setHasMore(false);
  //   }
  // }, [page]);

  useEffect(() => {
    if (breeds.length < total) setHasMore(true);
    else {
      setHasMore(false);
    }
  }, [breeds]);

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
    if (hasMore && isIntersecting) {
      setPage(String(Number(page) + 1));
    }
  }, [isIntersecting]);
  return (
    <div className="flex py-16 justify-between items-center flex-col my-auto">
      {isLoading && !hasMore ? (
        <Spinner />
      ) : error ? (
        <p>!error</p>
      ) : (
        <div>
          {
            <ul className=" flex justify-between items-center flex-col gap-1">
              {breeds.map((breed: Breed) => (
                <ListItem key={breed.id}>{breed.attributes?.name}</ListItem>
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
          className="mt-16"
        >
          <Spinner />
        </div>
      ) : (
        !isLoading && <div>no more data</div>
      )}
    </div>
  );
}
