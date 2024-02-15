"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SVGLocation, SVGOffice } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import { useDeleteBookmark, useGetUser } from "@/app/hooks/hooks";
import { Price } from "./price";

export const Bookmark = (bookmark: any) => {
  const { data } = useGetUser();
  const email = data?.email;
  const country = data?.country;
  const myBookmark = useDeleteBookmark();

  return (
    <Card className="hover:border-2 hover:border-blue-800">
      <CardHeader className="pb-1 ">
        <CardTitle className="flex flex-row items-center justify-between">
          <p className="text-xl hover:underline hover:cursor-pointer">
            {bookmark.title}
          </p>
          <Button
            onClick={() => {
              myBookmark.mutate({ id: bookmark.id, email: email as string });
            }}
            className="w-fit h-fit bg-red-700 text-xl rounded-full flex items-center justify-center"
          >
            x
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <p className="uppercase font-light flex items-center gap-1">
          <SVGOffice /> {bookmark.companyName}
        </p>
        <p className="flex items-center gap-1">
          <SVGLocation /> {bookmark.country}
        </p>
        <Price
          salary={bookmark.salary}
          type={bookmark.type}
          country={country as string}
        />
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button className="bg-blue-700">Apply now</Button>
      </CardFooter>
    </Card>
  );
};
