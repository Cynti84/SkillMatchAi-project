import { Request, Response } from "express";
import pool from "../db/db";
import asyncHandler from "../middleware/asynchandlers";
import { AuthRequest } from "../types/auth";
import { createJobWithSkills } from "../models/jobModel";

export const createJob = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const employer_id = req.user?.id
        const { title, description, company, location, skills } = req.body
        
        if (!title || !description || !company || !skills || skills.length === 0) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const job = await createJobWithSkills(employer_id!, {
          title,
          description,
          company,
          location,
          skills,
        });
        res.status(201).json({
            message: "Job created successfully"
        })

  }
);

export const getAllJobs = asyncHandler(async (req: Request, res: Response) => {
  const result = await pool.query(
    `SELECT * FROM jobs ORDER BY created_at DESC`
  );
  res.status(200).json(result.rows);
});

export const getJobsByEmployer = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const employer_id = req.user?.id;
    const result = await pool.query(
      `SELECT * FROM jobs WHERE employer_id = $1`,
      [employer_id]
    );
    res.status(200).json(result.rows);
  }
);
