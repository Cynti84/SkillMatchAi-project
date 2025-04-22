import express from 'express';
import { applyToJob, getApplicantsForJob } from '../controllers/applicationController';
import { protect, restrictTo } from '../middleware/authMiddleware';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' }); // if handling resume upload with application

const router = express.Router();

// 🔹 Job seeker applies to job (must be authenticated + role-restricted)
router.post(
  "/apply",
  protect,
  restrictTo(["job_seeker"]),
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "portfolio", maxCount: 1 },
  ]),
  applyToJob
);

// 🔹 Employer views applicants for a job they posted
router.get('/:jobId', protect, restrictTo(['employer']), getApplicantsForJob);

export default router;
