import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyDetails from "@/components/company/CompanyDetails";
const companyData = {
  name: "OpenAI Solutions",
  location: "San Francisco, CA",
  industry: "Artificial Intelligence",
  website: "https://openai.com",
  description: "We build safe and beneficial AI systems.",
  foundedYear: 2015,
  employees: 500,
  aproved: true,
  createdAt: "2023-04-01T12:00:00.000Z",
  updatedAt: "2024-04-01T12:00:00.000Z",
};
const page = () => {
  return (
    <div className="container mx-auto py-10">
      <div>
        <h1 className="text-2xl font-bold">Your Companies</h1>
      </div>
      <div className="mt-4 flex flex-col gap-2.5">
        <span className="text-muted-foreground">Select a company</span>
        <div>
          <Tabs defaultValue="account" className="w-full flex flex-row gap-4">
            <TabsList className="flex flex-col h-fit py-1.5 px-2 gap-2.5">
              <TabsTrigger value="account" className="px-4 py-2 w-full">
                company name
              </TabsTrigger>
              <TabsTrigger value="password" className="px-4 py-2 w-full">
                Password
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <CompanyDetails company={companyData} />
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default page;
