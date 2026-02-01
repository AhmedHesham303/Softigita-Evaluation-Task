import Spinner from "@/components/common/Spinner";
import { useEffect, useRef, useState } from "react";

import NoMoreData from "./NoMoreData";
import { cn } from "@/lib/utils";
type InfiniteListProps = {
  threshold?: number;
  isLoading?: boolean;
  error?: Error | null | undefined | unknown;
  hasMore?: boolean;
  setPage: (page: number) => void;
  page: number;
  className?: string;
  outerClassName?: string;
  innerClassName?: string;
  elements: React.JSX.Element[];
};
export default function InfiniteList({
  threshold = 0,
  isLoading = false,
  error,
  hasMore = false,
  setPage,
  page,
  outerClassName,
  className,
  elements,
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
      setPage(page + 1);
    }
  }, [isIntersecting]);
  return (
    <div
      className={cn(
        "flex py-16 justify-between items-center flex-col my-auto",
        outerClassName,
      )}
    >
      {isLoading && !hasMore ? (
        <div className="my-auto ">
          <Spinner loadingText="Loading initial data" />
        </div>
      ) : error ? (
        <div className="text-red-500">Error</div>
      ) : (
        <ul className={cn("flex flex-col", className)}>{elements}</ul>
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
