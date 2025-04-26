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
import { FilePlus } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

type Props = {
  jobId: string;
  applicantId: string;
};

const ApplyDialog = ({ jobId, applicantId }: Props) => {
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeUrl) {
      toast.error("Please upload or provide your resume link.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        job: jobId,
        applicant: applicantId,
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
      toast.error("Failed to apply for the job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
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
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyDialog;
