"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FilePlus, Loader, UploadCloud } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import axios from "axios";

type Props = {
  jobId: string;
  className?: string;
};

const ApplyDialog = ({ jobId, className }: Props) => {
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error("File size should be less than 5MB");
      return;
    }

    try {
      setFileUploading(true);
      // Implement your file upload logic here
      // const formData = new FormData();
      // formData.append('file', file);
      // const res = await axiosInstance.post('/upload', formData);
      // setResumeUrl(res.data.url);
      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload file");
    } finally {
      setFileUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!resumeUrl) {
      toast.error("Please upload or provide your resume link.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        jobId: jobId,
        resumeUrl,
        coverLetter,
      };

      const res = await axiosInstance.post("/apply", payload);
      if (res.status === 200) {
        toast.success("Application submitted successfully!");
        setResumeUrl("");
        setCoverLetter("");
      }
    } catch (error) {
      console.error("Error applying:", error);
      const mes = axios.isAxiosError(error) && error.response?.data?.message;
      toast.error(
        mes === "User already applied the job"
          ? "Your application has already been submitted"
          : "Failed to apply for the job."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className={className}>
          Apply Now <FilePlus className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">
            Apply for this Job
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Submit your resume and cover letter to apply.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="resumeUrl" className="text-sm sm:text-base">
              Resume
            </Label>

            {/* File Upload Option */}
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="flex-1">
                <div className="flex items-center justify-center gap-2 p-4 border border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                  <UploadCloud className="h-5 w-5" />
                  <span className="text-sm text-center">
                    {fileUploading
                      ? "Uploading..."
                      : "Upload PDF/DOC (Max 5MB)"}
                  </span>
                </div>
              </label>

              <div className="flex items-center justify-center text-xs sm:text-sm text-muted-foreground">
                OR
              </div>
            </div>

            {/* URL Input */}
            <Input
              name="resumeUrl"
              placeholder="Paste your resume link (Google Drive, Dropbox, etc.)"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              required
              className="text-sm sm:text-base"
            />
            <p className="text-xs text-muted-foreground">
              Note: The link should be publicly accessible
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="coverLetter" className="text-sm sm:text-base">
              Cover Letter (optional)
            </Label>
            <Textarea
              name="coverLetter"
              placeholder="Write a short cover letter..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="min-h-[120px] text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Button
              type="submit"
              disabled={loading || !resumeUrl}
              className="w-full sm:w-auto"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  Submitting <Loader className="animate-spin h-4 w-4" />
                </span>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyDialog;
