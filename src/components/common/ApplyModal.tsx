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
import { FilePlus, Loader } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import axios from "axios";

type Props = {
  jobId: string;
};

const ApplyDialog = ({ jobId }: Props) => {
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

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
      console.log("res", res.data.message);
      if (res.status === 200) {
        toast.success("Application submitted successfully!");
        setResumeUrl("");
        setCoverLetter("");
      }
    } catch (error) {
      console.log("Error applying:", error);
      const mes = axios.isAxiosError(error) && error.response?.data?.message;
      toast.error(
        mes == "User already applied the job"
          ? "Your application has already been submitted"
          : "Failed to apply for the job."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <Button variant="default">
          Apply Now <FilePlus className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Apply for this Job</DialogTitle>
          <DialogDescription>
            Submit your resume and cover letter to apply.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="resumeUrl">Resume URL</Label>
            <Input
              name="resumeUrl"
              placeholder="Enter your resume link (Google Drive, Dropbox, etc. note: the link should be public) "
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="coverLetter">Cover Letter (optional)</Label>
            <Textarea
              name="coverLetter"
              placeholder="Write a short cover letter..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading || !resumeUrl}>
              {loading ? (
                <span className="flex items-center gap-2">
                  Submitting <Loader className="animate-spin" />
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
