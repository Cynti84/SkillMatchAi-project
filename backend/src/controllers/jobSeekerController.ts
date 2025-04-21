import { Request, Response } from "express";
import asyncHandler from "../middleware/asynchandlers";
import { createJobSeekerProfile, getJobSeekerProfile } from "../models/jobSeekerModel";
import { AuthRequest } from "../types/auth";


export const handleCreateProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const role = req.user?.role;

    // Role check (double safety beyond middleware)
    if (role !== "job_seeker") {
      return res
        .status(403)
        .json({ message: "Only job seekers can create this profile" });
    }

    const profileData = req.body;
    const newProfile = await createJobSeekerProfile(userId!, profileData);

    res.status(201).json({
      message: "Profile set up successfully",
      newProfile,
    });
  }
);

export const handleGetProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;

    const profile = await getJobSeekerProfile(userId!);
    if (!profile) {
      return res.status(404).json({message:'Profile not found.'})
    }
    res.status(200).json({
      message: "Profile retrieved successfully",
      profile,
    });
  }
);