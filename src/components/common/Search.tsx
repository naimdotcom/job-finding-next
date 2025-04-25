"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SearchComponent = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div>
      <div className="flex justify-center mt-6">
        <Input
          type="text"
          placeholder="Search jobs..."
          className="p-3 w-96 rounded-r-none text-black dark:text-white placeholder:text-zinc-100 focus:outline-none focus-within:outline-none "
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <Button className="bg-orange-500 border-2 border-l-0 px-5 py-3 rounded-l-none hover:bg-orange-500 active:bg-orange-700">
          <Search className="text-white " />
        </Button>
      </div>
    </div>
  );
};

export default SearchComponent;
