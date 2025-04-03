"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "../ui/separator";

const jobTypeOptions = ["fulltime", "parttime", "contract", "internship"];
const salaryOptions = ["1000to1500", "1500to2000", "2000to3000", "3000to5000"];
const experienceOptions = ["0to1", "1to3", "3to5", "5to10"];

const JobFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams().toString());

  // Local state to track selected values
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);
  const [selectedSalary, setSelectedSalary] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    null
  );

  // Sync state with URL params on mount
  useEffect(() => {
    setSelectedJobType(searchParams.get("jobtype"));
    setSelectedSalary(searchParams.get("salary"));
    setSelectedExperience(searchParams.get("experience"));
  }, []);

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

  return (
    <div className="p-4 border rounded-lg shadow-md space-y-4 w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold">Filter Jobs</h2>

      {/* Job Type */}
      <div>
        <h3 className="text-sm font-medium mb-3">Job Type</h3>
        <RadioGroup value={selectedJobType || ""}>
          {jobTypeOptions.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <RadioGroupItem
                value={type}
                id={type}
                checked={selectedJobType === type}
                onClick={() =>
                  updateFilter("jobtype", type, setSelectedJobType)
                }
              />
              <Label htmlFor={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Separator />

      {/* Salary Range */}
      <div>
        <h3 className="text-sm font-medium mb-3">Salary Range</h3>
        <RadioGroup value={selectedSalary || ""}>
          {salaryOptions.map((salary) => (
            <div key={salary} className="flex items-center space-x-2">
              <RadioGroupItem
                value={salary}
                id={salary}
                checked={selectedSalary === salary}
                onClick={() =>
                  updateFilter("salary", salary, setSelectedSalary)
                }
              />
              <Label htmlFor={salary}>${salary.replace("to", " - $")}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Separator />

      {/* Experience */}
      <div>
        <h3 className="text-sm font-medium mb-3">Experience</h3>
        <RadioGroup value={selectedExperience || ""}>
          {experienceOptions.map((exp) => (
            <div key={exp} className="flex items-center space-x-2">
              <RadioGroupItem
                value={exp}
                id={exp}
                checked={selectedExperience === exp}
                onClick={() =>
                  updateFilter("experience", exp, setSelectedExperience)
                }
              />
              <Label htmlFor={exp}>{exp.replace("to", " - ") + " Years"}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default JobFilter;
