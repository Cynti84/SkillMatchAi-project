import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import asyncHandler from "./asynchandlers";
import pool from "../db/db";
import { AuthRequest } from "../types/auth";
import bcrypt from 'bcrypt'

dotenv.config();

export const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    // Check header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // console.log("TOKEN RECEIVED🚀:", token);
    

    // Optional: Check cookies if needed
    if (!token && req.cookies?.access_token) {
      token = req.cookies.access_token;
    }
 
    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized, token missing or expired" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: number;
        role: string;
      };

      // Fetch full user from DB
      const userQuery = await pool.query(
        "SELECT id, full_name, email, role FROM users WHERE id = $1",
        [decoded.id]
      );

      if (userQuery.rows.length === 0) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = userQuery.rows[0];
      next();
    } catch (err) {
      console.error("JWT Error:", err);
      res.status(401).json({ message: "Not authorized, token invalid" });
    }
  }
);



//Role-based restriction
export const restrictTo = (allowedRoles: string[]) =>
  asyncHandler<void, AuthRequest>(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        res.status(403).json({ message: "Forbidden: Access denied" });
        return;
      }
      next();
    }
  );
