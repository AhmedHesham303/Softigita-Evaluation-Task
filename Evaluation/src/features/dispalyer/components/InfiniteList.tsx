import ListItem from "./ListItem";
import Spinner from "@/components/common/Spinner";
import { useEffect, useRef, useState } from "react";

import NoMoreData from "./NoMoreData";
type InfiniteListProps = {
  threshold?: number;
  data: [];
  isLoading?: boolean;
  error?: Error | null;
  hasMore?: boolean;
  setPage: (page: number) => void;
  children: React.JSX.Element;
};
export default function InfiniteList({
  threshold = 0,
  isLoading = false,
  error,
  hasMore = false,
  setPage = () => {},
  children,
}: InfiniteListProps) {
  if (threshold < 1) {
    threshold = window.innerHeight * threshold;
  }
  threshold = Math.max(threshold, 16);
  console.log("threshold", threshold);

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
        threshold: 0,
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
        <div>{children}</div>
      )}
      {hasMore ? (
        <div
          ref={(el) => {
            spinnerRef.current = el;
            setIsSpinnerRefVisible((prev) => !prev);
          }}
          style={{ marginTop: `${threshold}px` }}
          className="flex flex-col justify-center items-center  "
        >
          <Spinner loadingText="loading more data" />
        </div>
      ) : (
        !isLoading && <NoMoreData />
      )}
    </div>
  );
}
