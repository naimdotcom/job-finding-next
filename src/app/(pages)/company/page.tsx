import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyDetails from "@/components/company/CompanyDetails";
import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";
import { Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddCompany from "@/components/company/AddComapny";

// Fetching companies
const fetchData = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jobfindertoken")?.value || "";

  if (!token) return [];

  try {
    const response = await axiosInstance.get("/company", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data || [];
  } catch (error) {
    console.error("Error while fetching company data:", error);
    return [];
  }
};

const Page = async () => {
  const companies = await fetchData();

  // fallback default tab to first company's id
  const defaultTab = companies.length > 0 ? companies[0]._id : "none";

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold">Your Companies</h1>

      <div className="mt-4 flex flex-col gap-2.5">
        <span className="text-muted-foreground">Select a company</span>

        <Tabs defaultValue={defaultTab} className="w-full flex flex-row gap-4">
          {/* Tab Buttons */}
          <div className="space-y-3">
            <TabsList className="flex flex-col h-fit w-full py-1.5 px-2 gap-2.5">
              {companies.map((company: any) => (
                <TabsTrigger
                  key={company._id}
                  value={company._id}
                  className="px-4 py-2 w-full"
                >
                  {company.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <AddCompany />
          </div>
          {/* Tab Content */}
          {companies.map((company: any) => (
            <TabsContent key={company._id} value={company._id}>
              <CompanyDetails company={company} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
