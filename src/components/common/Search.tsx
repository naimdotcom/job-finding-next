"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {};

const SearchComponent = ({}: Props) => {
  const [search, setSearch] = useState("");
  return (
    <div>
      <div className="flex justify-center mt-6">
        <Input
          type="text"
          placeholder="Search jobs..."
          className="p-3 w-96 rounded-r-none text-black placeholder:text-zinc-100 focus:outline-none focus-within:outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="bg-orange-500 border-2 border-l-0 px-5 py-3 rounded-l-none hover:bg-orange-500 active:bg-orange-700">
          <Search />
        </Button>
      </div>
    </div>
  );
};

export default SearchComponent;
