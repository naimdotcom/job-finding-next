import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyDetails from "@/components/company/CompanyDetails";
import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";
import AddCompany from "@/components/company/AddComapny";
import { ICompany } from "@/types/company";

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
    <div className="container mx-auto py-10 px-4 sm:px-0">
      <h1 className="text-2xl font-bold">Your Companies</h1>

      <div className="mt-4 flex flex-col gap-2.5">
        <span className="text-muted-foreground">Select a company</span>

        <Tabs
          defaultValue={defaultTab}
          className="w-full flex md:flex-row flex-col gap-4"
        >
          {/* Tab Buttons */}
          <div className="space-y-3">
            <TabsList className="flex flex-row md:flex-col overflow-x-auto w-full h-fit  py-1.5 px-2 gap-2.5">
              {companies.map((company: ICompany) => (
                <TabsTrigger
                  key={company._id}
                  value={company._id}
                  className="px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base w-full min-w-fit md:min-w-full"
                >
                  {company.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <AddCompany />
          </div>
          {/* Tab Content */}
          <div className="w-full lg:w-2/3 xl:w-3/4">
            {companies.map((company: ICompany) => (
              <TabsContent key={company._id} value={company._id}>
                <CompanyDetails company={company} />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>

      <div className="pt-10"></div>
    </div>
  );
};

export default Page;
