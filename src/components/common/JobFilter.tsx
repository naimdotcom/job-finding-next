"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const jobTypeOptions = ["fulltime", "parttime", "contract", "internship"];
const salaryOptions = ["1000to1500", "1500to2000", "2000to3000", "3000to5000"];
const experienceOptions = ["0to1", "1to3", "3to5", "5to10"];

const JobFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const rawSearchParams = useSearchParams();
  const searchParams = useMemo(() => {
    return new URLSearchParams(rawSearchParams.toString());
  }, [rawSearchParams]);

  // State for mobile menu
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Local state to track selected values
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);
  const [selectedSalary, setSelectedSalary] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    null
  );

  // Sync state with URL params on mount

  // Function to update filter and URL
  const updateFilter = (
    key: string,
    value: string | null,
    setState: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    if (value === searchParams.get(key)) {
      searchParams.delete(key);
      setState(null);
    } else {
      searchParams.set(key, value!);
      setState(value);
    }
    router.push(`${pathname}?${searchParams.toString()}`, { scroll: false });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedJobType(null);
    setSelectedSalary(null);
    setSelectedExperience(null);
    router.push(pathname, { scroll: false });
  };

  useEffect(() => {
    setSelectedJobType(searchParams.get("jobtype"));
    setSelectedSalary(searchParams.get("salary"));
    setSelectedExperience(searchParams.get("experience"));
  }, [searchParams]);

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsMobileOpen(true)}
        >
          Filter Jobs
        </Button>
      </div>

      {/* Filter Panel */}
      <div
        className={`
          ${
            isMobileOpen
              ? "fixed inset-0 z-50 bg-white dark:bg-zinc-900 p-4 overflow-y-auto"
              : "hidden"
          }
          lg:block lg:relative lg:bg-transparent lg:px-4 lg:py-6 lg:z-0
          border rounded-lg shadow-md space-y-4 w-full max-w-md
        `}
      >
        {isMobileOpen && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filter Jobs</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Job Type */}
        <div className="">
          <h3 className="text-sm font-medium mb-3 ">Job Type</h3>
          <RadioGroup value={selectedJobType || ""}>
            <div className="grid grid-cols-2 gap-2">
              {jobTypeOptions.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={type}
                    id={`jobtype-${type}`}
                    checked={selectedJobType === type}
                    onClick={() =>
                      updateFilter("jobtype", type, setSelectedJobType)
                    }
                  />
                  <Label htmlFor={`jobtype-${type}`}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
        <Separator />

        {/* Salary Range */}
        <div>
          <h3 className="text-sm font-medium mb-3">Salary Range</h3>
          <RadioGroup value={selectedSalary || ""}>
            <div className="grid grid-cols-2 gap-2">
              {salaryOptions.map((salary) => (
                <div key={salary} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={salary}
                    id={`salary-${salary}`}
                    checked={selectedSalary === salary}
                    onClick={() =>
                      updateFilter("salary", salary, setSelectedSalary)
                    }
                  />
                  <Label htmlFor={`salary-${salary}`}>
                    ${salary.replace("to", " - $")}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
        <Separator />

        {/* Experience */}
        <div>
          <h3 className="text-sm font-medium mb-3">Experience</h3>
          <RadioGroup value={selectedExperience || ""}>
            <div className="grid grid-cols-2 gap-2">
              {experienceOptions.map((exp) => (
                <div key={exp} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={exp}
                    id={`exp-${exp}`}
                    checked={selectedExperience === exp}
                    onClick={() =>
                      updateFilter("experience", exp, setSelectedExperience)
                    }
                  />
                  <Label htmlFor={`exp-${exp}`}>
                    {exp.replace("to", " - ") + " Years"}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Clear Filters Button */}
        {(selectedJobType || selectedSalary || selectedExperience) && (
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        )}

        {/* Apply Button (Mobile Only) */}
        {isMobileOpen && (
          <Button
            className="w-full mt-4"
            onClick={() => setIsMobileOpen(false)}
          >
            Apply Filters
          </Button>
        )}
      </div>
    </>
  );
};

export default JobFilter;
