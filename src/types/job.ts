import { ICompany } from "./company";

export enum JobType {
  FULL_TIME = "full_time",
  PART_TIME = "part_time",
  CONTRACT = "contract",
  INTERNSHIP = "internship",
  REMOTE = "remote",
}

export type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  startingSalary: number;
  endingSalary: number;
  company: ICompany;
  requirements: string[];
  jobType: JobType;
  postedBy: string;
  expireAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
