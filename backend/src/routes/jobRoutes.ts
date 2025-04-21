// routes/jobRoutes.ts
import express from "express";
import {
  createJob,
  getAllJobs,
  getJobsByEmployer,
} from "../controllers/jobController";
import { protect, restrictTo } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", protect, restrictTo(["employer"]), createJob);
router.get("/", getAllJobs); // For seekers
router.get("/employer", protect, restrictTo(["employer"]), getJobsByEmployer); // Employer dashboard

export default router;
