import express from "express";
import multer from "multer";
import {
  handleCreateProfile,
  handleGetProfile,
} from "../controllers/jobSeekerController";
import { protect, restrictTo } from "../middleware/authMiddleware";

// 🧼 Use default multer config — saves files to memory
const upload = multer({ dest: "uploads/" }); // 👈 will save files to /uploads by default

const router = express.Router();

// 📤 Handle two files: resume & profile photo
router.post("/create", protect, restrictTo(["job_seeker"]),
  upload.fields([
    { name: "resume_url", maxCount: 1 },
    { name: "profile_photo_url", maxCount: 1 },
  ]),
  handleCreateProfile
);

// 📄 Get profile
router.get("/:userId", protect, restrictTo(['job_seeker']), handleGetProfile);

export default router;
