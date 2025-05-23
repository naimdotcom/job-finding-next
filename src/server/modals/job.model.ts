import mongoose, { Schema, Document } from "mongoose";

// Define job types
export enum JobType {
  FULL_TIME = "full_time",
  PART_TIME = "part_time",
  CONTRACT = "contract",
  INTERNSHIP = "internship",
  REMOTE = "remote",
}

// Define the Job schema interface
export interface IJob extends Document {
  title: string;
  description: string;
  location: string;
  startingSalary?: number;
  endingSalary?: number;
  company: mongoose.Types.ObjectId;
  requirements: string[];
  jobType: JobType;
  categories: string[];
  postedBy: mongoose.Types.ObjectId; // Employer's ID
  expireAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose schema
const JobSchema: Schema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    startingSalary: {
      type: Number,
      required: true,
    },
    endingSalary: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      required: true,
    },
    jobType: {
      type: String,
      enum: Object.values(JobType),
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true, // Links to the Employer's user ID
    },
    categories: {
      type: [String],
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Export the Job model
const Job = mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
export default Job;
