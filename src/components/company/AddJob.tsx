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
import { FilePlus } from "lucide-react";
import { capitalize } from "@/utils/Capitalize";
import { DatePicker } from "../Date-Picker";
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
    requirements: "",
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
      requirements: jobData.requirements
        .split(",")
        .map((r) => capitalize(r).trim()),
      expireAt: date,
      company: companyId || "67ef318d90af8feb6ffb38ca",
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
          requirements: "",
        });
        setDate(undefined);
      })
      .catch((err) => {
        console.log("error while adding job", err);
        toast.error("Error while adding job");
      });
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

        <form onSubmit={handleSubmit} className="grid gap-4 py-4 w-full">
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
              <DatePicker date={date} setDate={setDate} />
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
