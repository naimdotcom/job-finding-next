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
  startingSalary?: Number;
  endingSalary?: Number;
  company: mongoose.Types.ObjectId;
  requirements: string[];
  jobType: JobType;
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
      ref: "Company",
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    startingSalary: {
      type: Number,
      trim: true,
      required: true,
    },
    endingSalary: {
      type: Number,
      trim: true,
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
      ref: "User",
      required: true, // Links to the Employer's user ID
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
