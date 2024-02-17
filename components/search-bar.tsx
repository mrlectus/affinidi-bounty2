import { SVGLocation, SVGSearch } from "./icons/icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
export const SearchBar = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex m-4 items-center drop-shadow-md">
        <div className="basis-3/4 flex items-center">
          <SVGSearch className="absolute left-1" />
          <Input
            className="dark:border-white border rounded-r-none ring-0 border-2 border-black outline-none h-10 pl-8"
            placeholder="Enter Company Name"
          />
        </div>
        <div className="relative flex items-center">
          <SVGLocation className="absolute left-1" />
          <Input
            className="dark:border-white border rounded-l-none ring-0 border-2 border-black outline-none h-10 pl-8"
            placeholder="Enter Country"
          />
        </div>
        <Button className="ml-4 h-10">Find Job</Button>
      </div>
    </div>
  );
};
