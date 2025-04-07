import axiosInstance from "@/lib/axios";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const fetchData = async ({ id }: { id: string }) => {
  try {
    const res = await axiosInstance.get(`/company/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log("error while fetching company", error);
    return [];
  }
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const company = await fetchData({ id });
  return <div>page</div>;
};

export default page;
