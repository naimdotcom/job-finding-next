"use client";

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
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { FilePlus } from "lucide-react";
import { useState } from "react";
import { ICompany } from "@/types/company";
import { Job } from "@/types/job";
type props = {
  company: ICompany;
  job: Job;
};

const EditJobsByCompany = ({ company, job }: props) => {
  // const [date, setDate] = useState("1991-01-01");
  const [jobData, setJobData] = useState<Job>({
    ...job,
    expireAt: new Date(job.expireAt),
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Example: Send to API
    try {
      const res = await fetch(`/api/jobs/${job._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...jobData, companyId: company._id }),
      });

      if (!res.ok) throw new Error("Failed to update job");
      alert("Job updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  // console.log("company details...:", company);
  return (
    <>
      <div>
        <Separator className="my-2" />

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">
              update Job <FilePlus className="mr-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Job</DialogTitle>
              <DialogDescription>
                Fill out the job information below.
              </DialogDescription>
            </DialogHeader>

            <form className="grid gap-4 py-4 w-full" onSubmit={handleSubmit}>
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
                    onValueChange={(value) =>
                      setJobData((prev) => ({
                        ...prev,
                        jobType: value as Job["jobType"],
                      }))
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
                    value={
                      jobData.expireAt
                        ? (jobData.expireAt as Date).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">Update Job</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default EditJobsByCompany;
