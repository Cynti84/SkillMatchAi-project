import { Request, Response, NextFunction } from "express";
import { createUser, getUserByEmail, getUserById } from "../models/userModel";
import { hashPassword, comparePasswords } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import asyncHandler from "../middleware/asynchandlers";
import { log } from "console";
import { getJobSeekerProfile } from "../models/jobSeekerModel";
import { getEmployerProfile } from "../models/employerModel";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { full_name, email, password, role } = req.body;

    try {
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use." });
      }

      const password_hash = await hashPassword(password);
      const newUser = await createUser({
        full_name,
        email,
        password_hash,
        role,
      });

      // ✅ Generate token for immediate use
      const token = generateToken({ id: newUser.id, role: newUser.role });

      res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
          id: newUser.id,
          full_name: newUser.full_name,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ error: "Failed to register user." });
    }
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // 🔍 Step 1: Find user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // 🔐 Step 2: Compare passwords
    const match = await comparePasswords(password, user.password_hash);
    if (!match) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // ✅ Step 3: Check profile completion before allowing login
    if (user.role === "job_seeker") {
      const profile = await getJobSeekerProfile(user.id);
      if (!profile) {
        return res.status(403).json({
          error:
            "Profile not completed. Please complete your job seeker profile.",
        });
      }
    } else if (user.role === "employer") {
      const profile = await getEmployerProfile(user.id);
      if (!profile) {
        return res.status(403).json({
          error:
            "Profile not completed. Please complete your employer profile.",
        });
      }
    }

    // 🪪 Step 4: Generate JWT
    const token = generateToken({ id: user.id, role: user.role });

    // 🟢 Step 5: Respond with token and basic user info
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed." });
  }
});


export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  try {
    const user = await getUserById(userId);
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving user." });
  }
});
