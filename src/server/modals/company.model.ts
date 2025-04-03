import mongoose, { Schema, Document } from "mongoose";

// Define company schema interface
export interface ICompany extends Document {
  name: string;
  location: string;
  industry: string;
  website?: string;
  description: string;
  foundedYear?: number;
  employees?: number;
  owner: mongoose.Types.ObjectId; // Employer's ID
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose schema
const CompanySchema: Schema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensure no duplicate company names
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    foundedYear: {
      type: Number,
      min: 1800, // Assuming companies don't exist before 1800
      max: new Date().getFullYear(),
    },
    employees: {
      type: Number,
      min: 1,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links to an Employer user
      required: true,
    },
  },
  { timestamps: true }
);

// Export the Company model
const Company =
  mongoose.models.Company || mongoose.model<ICompany>("Company", CompanySchema);
export default Company;
