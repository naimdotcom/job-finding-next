import { userT } from "./user";

export type ICompany = {
  _id: string;
  name: string;
  location: string;
  industry: string;
  website?: string;
  description: string;
  foundedYear: number;
  createdAt: Date;
  updatedAt: Date;
  owner: userT | string;
  employees?: number;
};
