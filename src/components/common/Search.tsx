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
          className="p-3 w-96 rounded-r-none text-black placeholder:text-light-primary border-light-primary"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="bg-blue-accent px-5 py-3 rounded-l-none ">
          <Search />
        </Button>
      </div>
    </div>
  );
};

export default SearchComponent;
