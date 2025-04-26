import mongoose, { Schema, Document } from "mongoose";

// Define application statuses
export enum ApplicationStatus {
  PENDING = "pending",
  REVIEWED = "reviewed",
  INTERVIEW_SCHEDULED = "interview_scheduled",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

// Define the Job Applicant schema interface
export interface IJobApplicant extends Document {
  job: mongoose.Types.ObjectId;
  applicant: mongoose.Types.ObjectId;
  resumeUrl: string;
  coverLetter?: string;
  status: ApplicationStatus;
  appliedAt: Date;
  updatedAt: Date;
}

// Define the Mongoose schema
const JobApplicantSchema: Schema = new Schema<IJobApplicant>(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job",
      required: true,
      index: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(ApplicationStatus),
      default: ApplicationStatus.PENDING,
    },
  },
  { timestamps: true }
);

// Export the Job Applicant model
const JobApplicant =
  mongoose.models.JobApplicant ||
  mongoose.model<IJobApplicant>("JobApplicant", JobApplicantSchema);
export default JobApplicant;
