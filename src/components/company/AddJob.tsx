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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FilePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { capitalize } from "@/utils/Capitalize";

type JobType = "Full-time" | "Part-time" | "Remote" | "Contract";

const AddJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    startingSalary: "",
    endingSalary: "",
    jobType: "Full-time" as JobType,
    requirements: "",
    expireAt: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert requirements from comma-separated to array
    const payload = {
      ...jobData,
      startingSalary: parseInt(jobData.startingSalary),
      endingSalary: parseInt(jobData.endingSalary),
      requirements: jobData.requirements
        .split(",")
        .map((r) => capitalize(r).trim()),
    };

    console.log("Submit job:", payload);
    // TODO: Send this payload to backend using fetch or axios
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          Add Job <FilePlus className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Job</DialogTitle>
          <DialogDescription>
            Fill out the job information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
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
          </div>

          <div className="grid gap-2">
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
              <Label htmlFor="startingSalary">Starting Salary</Label>
              <Input
                type="number"
                name="startingSalary"
                value={jobData.startingSalary}
                onChange={handleChange}
                placeholder="30000"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endingSalary">Ending Salary</Label>
              <Input
                type="number"
                name="endingSalary"
                value={jobData.endingSalary}
                onChange={handleChange}
                placeholder="50000"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              name="requirements"
              value={jobData.requirements}
              onChange={handleChange}
              placeholder="Enter comma-separated skills, e.g. React, Node.js, MongoDB"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="jobType">Job Type</Label>
              <select
                name="jobType"
                value={jobData.jobType}
                onChange={handleChange}
                className={cn("w-full h-10 rounded-md border px-3")}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="expireAt">Expire At</Label>
              <Input
                type="date"
                name="expireAt"
                value={jobData.expireAt}
                onChange={handleChange}
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
