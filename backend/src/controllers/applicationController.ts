import { Request, Response } from "express";
import asyncHandler from "../middleware/asynchandlers";
import { applyForJob, fetchApplicantsForJob } from "../models/applicationModel";
import { AuthRequest } from "../types/auth";

export const applyToJob = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const { job_id } = req.body;
    const resumeUrl = req.file ? req.file.filename : null;

    if (!job_id) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const application = await applyForJob(userId, parseInt(job_id), resumeUrl);
    res.status(201).json({ message: "Application submitted", application });
  }
);
 
export const getApplicantsForJob = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const jobId = parseInt(req.params.jobId);
    const applicants = await fetchApplicantsForJob(jobId);
    res.status(200).json({ applicants });
  }
);
