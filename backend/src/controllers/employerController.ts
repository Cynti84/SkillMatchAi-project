import { Request, Response } from "express";
import asyncHandler from "../middleware/asynchandlers";
import {
  createEmployerProfile,
  getEmployerProfile,
} from "../models/employerModel";
import { AuthRequest } from "../types/auth";


export const handleCreateEmployer = asyncHandler(
  async (req: AuthRequest, res: Response) => {
        const userId = req.user?.id;
        const role = req.user?.role;
        const profile = req.body;
        
        //role check (double safety beyond middleware)

        if (role !== "employer") {
            return res.status(403).json({ message: "Only employers can create this profile" })
            
        }        
    const newProfile = await createEmployerProfile(userId!, profile);
        res.status(201).json({
            message:"Profile set up successfully",
            newProfile
        });
  }
);

export const handleGetEmployer = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const profile = await getEmployerProfile(userId!);
        res.status(200).json({
            message: "Profile retrieved successfully",
            profile
        });
  }
);
