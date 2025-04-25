"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FilePlus, X } from "lucide-react";
import { capitalize } from "@/utils/Capitalize";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
type JobType = "Full-time" | "Part-time" | "Remote" | "Contract";

type props = {
  companyId: string;
};

const AddJob = ({ companyId }: props) => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    startingSalary: "",
    endingSalary: "",
    jobType: "full_time" as JobType,
    requirements: [] as string[],
    categories: [] as string[],
    requirementInput: "", // for typed input
    categoryInput: "", // for typed input
  });
  const [date, setDate] = React.useState<Date>();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !date ||
      !jobData.title ||
      !jobData.description ||
      !jobData.location ||
      !jobData.startingSalary ||
      !jobData.endingSalary ||
      !jobData.requirements
    ) {
      toast.error("All fields are required");
      return;
    }

    // Convert requirements from comma-separated to array
    const payload = {
      ...jobData,
      startingSalary: parseInt(jobData.startingSalary),
      endingSalary: parseInt(jobData.endingSalary),
      requirements: jobData.requirements,
      expireAt: date,
      company: companyId,
      categories: jobData.categories,
    };

    // TODO: Send this payload to backend using fetch or axios
    const res = axiosInstance.post("/jobs", payload);

    res
      .then((res) => {
        console.log(res);
        toast.success("Job added successfully");
        setJobData({
          title: "",
          description: "",
          location: "",
          startingSalary: "",
          endingSalary: "",
          jobType: "full_time" as JobType,
          requirements: [],
          categories: [],
          requirementInput: "",
          categoryInput: "",
        });
        setDate(undefined);
      })
      .catch((err) => {
        console.log("error while adding job", err);
        toast.error("Error while adding job");
      });
  };

  console.log("jobData", date);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          Add Job <FilePlus className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[50vh] overflow-y-scroll ">
        <DialogHeader>
          <DialogTitle>Add New Job</DialogTitle>
          <DialogDescription>
            Fill out the job information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4 w-full">
          {/* <div className="grid grid-cols-2 gap-4"> */}
          <div className="grid gap-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              name="title"
              value={jobData.title}
              onChange={handleChange}
              placeholder="Software Engineer"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              name="location"
              value={jobData.location}
              onChange={handleChange}
              placeholder="Dhaka, Bangladesh"
              required
            />
          </div>
          {/* </div> */}

          <div className="grid gap-2 max-h-[350px]">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}
              placeholder="Write a brief job description"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startingSalary">Starting Salary ($k)</Label>
              <Input
                type="number"
                name="startingSalary"
                value={jobData.startingSalary}
                onChange={handleChange}
                placeholder="e.g. 20"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endingSalary">Ending Salary ($k)</Label>
              <Input
                type="number"
                name="endingSalary"
                value={jobData.endingSalary}
                onChange={handleChange}
                placeholder="e.g. 30"
              />
            </div>
          </div>

          {/* <div className="grid gap-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              name="requirements"
              value={jobData.requirements}
              onChange={handleChange}
              placeholder="Enter comma-separated skills, e.g. React, Node.js, MongoDB"
              required
            />
          </div> */}

          {/* Requirements Input (line-by-line) */}
          <div className="grid gap-2">
            <Label htmlFor="requirements">Requirements</Label>
            <div className="flex gap-2">
              <Input
                name="requirementInput"
                value={jobData.requirementInput}
                onChange={(e) =>
                  setJobData({ ...jobData, requirementInput: e.target.value })
                }
                placeholder="e.g. Strong good understanding of React"
              />
              <Button
                type="button"
                onClick={() => {
                  if (jobData.requirementInput.trim()) {
                    setJobData({
                      ...jobData,
                      requirements: [
                        ...jobData.requirements,
                        capitalize(jobData.requirementInput.trim()),
                      ],
                      requirementInput: "",
                    });
                  }
                }}
              >
                Add
              </Button>
            </div>
            <ul className="list-decimal list-inside text-sm text-muted-foreground space-y-1 mt-1">
              {jobData.requirements.map((req, idx) => (
                <li className="flex justify-between gap-2" key={idx}>
                  {idx + 1}. {req}
                  <span
                    onClick={() => {
                      setJobData({
                        ...jobData,
                        requirements: jobData.requirements.filter(
                          (r) => r !== req
                        ),
                      });
                    }}
                  >
                    <X />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Input */}
          <div className="grid gap-2">
            <Label htmlFor="categories">Categories</Label>
            <div className="flex gap-2">
              <Input
                name="categoryInput"
                value={jobData.categoryInput}
                onChange={(e) =>
                  setJobData({ ...jobData, categoryInput: e.target.value })
                }
                placeholder="e.g. Frontend"
              />
              <Button
                type="button"
                onClick={() => {
                  if (jobData.categoryInput.trim()) {
                    setJobData({
                      ...jobData,
                      categories: [
                        ...jobData.categories,
                        capitalize(jobData.categoryInput.trim()),
                      ],
                      categoryInput: "",
                    });
                  }
                }}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {jobData.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-sm rounded flex gap-2 items-center"
                >
                  {cat}
                  <span
                    onClick={() => {
                      setJobData({
                        ...jobData,
                        categories: jobData.categories.filter((c) => c !== cat),
                      });
                    }}
                  >
                    <X size={14} />
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="jobType">Job Type</Label>
              <Select
                value={jobData.jobType}
                onValueChange={(value: JobType) =>
                  setJobData({ ...jobData, jobType: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full_time">Full-time</SelectItem>
                  <SelectItem value="part_time">Part-time</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="internship">internship</SelectItem>
                  <SelectItem value="contract">contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="expireAt">Expire At</Label>

              <Input
                type="date"
                name="expireAt"
                value={date ? date.toISOString().split("T")[0] : ""}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  setDate(selectedDate);
                }}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Create Job</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddJob;
