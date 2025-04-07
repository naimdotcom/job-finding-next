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
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

const AddCompany = ({}) => {
  const [companyData, setCompanyData] = useState({
    name: "",
    location: "",
    industry: "",
    website: "",
    description: "",
    foundedYear: "",
    employees: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      name,
      location,
      industry,
      website,
      description,
      foundedYear,
      employees,
    } = companyData;

    if (!name || !location || !industry || !description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const payload = {
      name,
      location,
      industry,
      website,
      description,
      foundedYear: foundedYear ? parseInt(foundedYear) : undefined,
      employees: employees ? parseInt(employees) : undefined,
      //   owner: ownerId,
    };

    try {
      const data = await axiosInstance.post("/company", payload);
      toast.success("Company added successfully!");
      console.log("data: ", data);
      //   setCompanyData({
      //     name: "",
      //     location: "",
      //     industry: "",
      //     website: "",
      //     description: "",
      //     foundedYear: "",
      //     employees: "",
      //   });
    } catch (error) {
      console.error("Error adding company:", error);
      toast.error("Something went wrong while adding the company.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Add Company <FilePlus className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Company</DialogTitle>
          <DialogDescription>
            Fill out the company details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4 w-full">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Company Name</Label>
              <Input
                name="name"
                value={companyData.name}
                onChange={handleChange}
                placeholder="Tech Corp Ltd"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                name="location"
                value={companyData.location}
                onChange={handleChange}
                placeholder="Dhaka, Bangladesh"
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              name="industry"
              value={companyData.industry}
              onChange={handleChange}
              placeholder="Software, Finance, etc."
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="website">Website</Label>
            <Input
              name="website"
              value={companyData.website}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>

          <div className="grid gap-2 max-h-[200px]">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              value={companyData.description}
              onChange={handleChange}
              placeholder="Write a short description about the company"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="foundedYear">Founded Year</Label>
              <Input
                name="foundedYear"
                type="number"
                value={companyData.foundedYear}
                onChange={handleChange}
                placeholder="e.g. 2010"
                min={1800}
                max={new Date().getFullYear()}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="employees">Number of Employees</Label>
              <Input
                name="employees"
                type="number"
                value={companyData.employees}
                onChange={handleChange}
                placeholder="e.g. 50"
                min={1}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Create Company</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCompany;
