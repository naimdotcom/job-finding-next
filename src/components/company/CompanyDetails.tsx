"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { FilePenLine, FilePlus, ScanSearch } from "lucide-react";
import AddJob from "./AddJob";
import Link from "next/link";
import { ICompany } from "@/types/company";

const CompanyDetails: React.FC<{ company: ICompany }> = ({ company }) => {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="truncate">{company.name}</span>
          <Badge
            variant={company.aproved ? "default" : "destructive"}
            className="w-fit"
          >
            {company.aproved ? "Approved" : "Pending"}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3 p-4 sm:p-6 text-sm sm:text-base text-muted-foreground">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <span className="font-medium text-foreground">Location:</span>{" "}
            {company.location}
          </div>
          <div>
            <span className="font-medium text-foreground">Industry:</span>{" "}
            {company.industry}
          </div>
          {company.website && (
            <div className="sm:col-span-2">
              <span className="font-medium text-foreground">Website:</span>{" "}
              <a
                href={company.website}
                className="text-blue-500 underline break-all"
                target="_blank"
                rel="noreferrer"
              >
                {company.website}
              </a>
            </div>
          )}
          {company.foundedYear && (
            <div>
              <span className="font-medium text-foreground">Founded:</span>{" "}
              {company.foundedYear}
            </div>
          )}
          {company.employees && (
            <div>
              <span className="font-medium text-foreground">Employees:</span>{" "}
              {company.employees}
            </div>
          )}
          <div>
            <span className="font-medium text-foreground">Created:</span>{" "}
            {new Date(company.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="mt-3">
          <span className="font-medium text-foreground">Description:</span>{" "}
          <p className="mt-1 text-justify">{company.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Link href={`/company/${company._id}`} className="flex-1 min-w-0">
            <Button
              disabled={!company.aproved}
              variant="secondary"
              className="w-full"
            >
              <span className="hidden sm:inline">See posted jobs</span>
              <span className="sm:hidden">Jobs</span>
              <ScanSearch className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          {company.aproved ? (
            <AddJob companyId={company._id} />
          ) : (
            <Button
              disabled={!company.aproved}
              variant="secondary"
              className="flex-1 min-w-0"
            >
              <span className="hidden sm:inline">Add Job</span>
              <FilePlus className="ml-2 h-4 w-4" />
            </Button>
          )}
          <Button variant="destructive" className="flex-1 min-w-0">
            <span className="hidden sm:inline">Edit Company</span>
            <span className="sm:hidden">Edit</span>
            <FilePenLine className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyDetails;
