"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { FilePenLine, FilePlus, ScanSearch } from "lucide-react";
import AddJob from "./AddJob";
import Link from "next/link";

type CompanyProps = {
  company: {
    _id: string;
    name: string;
    location: string;
    industry: string;
    website?: string;
    description: string;
    foundedYear?: number;
    employees?: number;
    aproved: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

const CompanyDetails: React.FC<{ company: CompanyProps["company"] }> = ({
  company,
}) => {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center justify-between">
          {company.name}
          <Badge variant={company.aproved ? "default" : "destructive"}>
            {company.aproved ? "Approved" : "Pending"}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-2 text-sm text-muted-foreground">
        <div>
          <span className="font-medium text-foreground">Location:</span>{" "}
          {company.location}
        </div>
        <div>
          <span className="font-medium text-foreground">Industry:</span>{" "}
          {company.industry}
        </div>
        {company.website && (
          <div>
            <span className="font-medium text-foreground">Website:</span>{" "}
            <a
              href={company.website}
              className="text-blue-500 underline"
              target="_blank"
              rel="noreferrer"
            >
              {company.website}
            </a>
          </div>
        )}
        <div>
          <span className="font-medium text-foreground">Description:</span>{" "}
          {company.description}
        </div>
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

        <div className="flex flex-row gap-2">
          <Link href={`/company/${company._id}`}>
            <Button disabled={!company.aproved} variant="secondary">
              See posted jobs <ScanSearch />
            </Button>
          </Link>
          {company.aproved ? (
            <AddJob companyId={company._id} />
          ) : (
            <Button disabled={!company.aproved} variant="secondary">
              Add Job <FilePlus />
            </Button>
          )}
          <Button variant="destructive">
            Edit Company Details <FilePenLine />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyDetails;
