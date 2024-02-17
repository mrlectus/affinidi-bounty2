"use client";
import { useFetchPaginatedJobs, useGetUser } from "@/app/hooks/hooks";
import { Job } from "./job";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import { useSearchParams } from "next/navigation";
export const AllJobs = () => {
  const params = useSearchParams();
  const searchCountry = params.get("country");
  const { data } = useGetUser();
  const ref = React.useRef<IntersectionObserver>();
  const country =
    searchCountry?.trim() === "" || searchCountry === null
      ? data?.country
      : searchCountry;
  console.log("COUNTRY:", country);
  console.log("SECOUNTRY:", searchCountry);
  const jobs = useFetchPaginatedJobs({ country: country as string, limit: 10 });
  React.useEffect(() => {
    jobs.refetch();
  }, [searchCountry, country]);
  const lastPostRef = React.useCallback(
    (job: Element) => {
      if (jobs.isFetchingNextPage) return;
      if (ref.current) ref.current.disconnect();
      ref.current = new IntersectionObserver((jobsEntry) => {
        if (jobsEntry[0].isIntersecting && jobs.hasNextPage) {
          console.log("fetching next page");
          jobs.fetchNextPage();
        }
      });
      if (job) ref.current.observe(job);
    },
    [jobs.isFetchingNextPage, jobs.hasNextPage, jobs.fetchNextPage]
  );
  if (jobs.isLoading) {
    return (
      <div className="flex flex-col gap-2 p-4">
        <Skeleton className="h-4 w-full h-[200px] md:w-[500px]" />
        <Skeleton className="h-4 w-full h-[200px] md:w-[500px]" />
        <Skeleton className="h-4 w-full h-[200px] md:w-[500px]" />
        <Skeleton className="h-4 w-full h-[200px] md:w-[500px]" />
        <Skeleton className="h-4 w-full h-[200px] md:w-[500px]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-2">
      {jobs.data?.pages?.map((page, index) => {
        return (
          <div key={index} className="flex flex-col gap-2 p-4">
            {page?.map((job) => {
              return <Job ref={lastPostRef} key={job.id} {...job} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
