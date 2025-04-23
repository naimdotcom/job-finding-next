export enum Irole {
  admin = "admin",
  viwer = "viwer",
  user = "user",
  recruiter = "recruiter",
}

export type userT = {
  name: string;
  email: string;
  role: string;
};
