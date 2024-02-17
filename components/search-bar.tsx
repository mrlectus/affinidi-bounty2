"use client";
import Link from "next/link";
import { SVGLocation } from "./icons/icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React from "react";

/**
 * SearchBar component renders a search bar with location icon, input field
 * and search button. Allows user to search for jobs by country.
 *
 * Uses React state and hooks to manage search query value. Renders Link from
 * Next.js to handle search form submission and page navigation.
 */
export const SearchBar = () => {
  const [country, setCountry] = React.useState("");
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex m-4 items-center drop-shadow-md">
        <div className="relative flex items-center">
          <SVGLocation className="absolute left-1" />
          <Input
            className="dark:border-white border rounded-l-none ring-0 border-2 border-black outline-none h-10 pl-8"
            placeholder="Enter Country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <Link
          href={{
            query: { country: country.length > 0 ? country : "" },
          }}
          passHref
        >
          <Button className="ml-4 h-10">Find Job</Button>
        </Link>
      </div>
    </div>
  );
};
