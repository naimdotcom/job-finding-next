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
  company: string;
  location: string;
  salary?: number;
  description: string;
  requirements: string[];
  jobType: JobType;
  postedBy: mongoose.Types.ObjectId; // Employer's ID
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
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: Number,
      default: 0,
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
  },
  { timestamps: true }
);

// Export the Job model
const Job = mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
export default Job;
