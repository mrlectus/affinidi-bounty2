import { TJobs } from "@/app/service/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import React from "react";
import { Button } from "./ui/button";
import { SVGBookmark, SVGLocation, SVGOffice } from "./icons/icons";
import { useAddBookmark, useGetUser } from "@/app/hooks/hooks";
import { Price } from "./price";
import Link from "next/link";

export const Job = React.forwardRef((job: TJobs, ref: any) => {
  const bookmark = useAddBookmark();
  const { data } = useGetUser();
  const email = data?.email;
  const country = data?.country;

  return (
    <Card
      ref={ref}
      className="hover:border-2 dark:hover:border-blue-800 hover:border-blue-800 md:w-[500px] dark:border-white"
    >
      <CardHeader className="pb-1 ">
        <CardTitle className="flex flex-row items-center justify-between">
          <p className="text-xl hover:underline hover:cursor-pointer">
            {job.title}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <p className="uppercase font-light flex items-center gap-1">
          <SVGOffice /> {job.companyName}
        </p>
        <p className="flex items-center gap-1">
          <SVGLocation /> {job.country}
        </p>
        <Price
          salary={job.salary}
          type={job.type}
          country={country as string}
        />
      </CardContent>
      <CardFooter className="flex gap-4">
        <Link href={`/apply/${job.id}`} passHref>
          <Button className="bg-blue-700 dark:text-white">Apply now</Button>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={() => {
                bookmark.mutate({ id: job.id, email: email as string });
              }}
              className="w-fit border-2 p-1 rounded-md text-white bg-black"
            >
              <SVGBookmark />
            </TooltipTrigger>
            <TooltipContent>
              <p>Save to bookmark</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
});
