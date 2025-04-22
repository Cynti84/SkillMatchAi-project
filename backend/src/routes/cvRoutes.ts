import express from "express";
import { handleCVUpload } from "../controllers/cvController";
import { protect, restrictTo } from "../middleware/authMiddleware";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() }); 

const router = express.Router();

router.post(
  "/upload",
  protect,
  restrictTo(["job_seeker"]),
  upload.single("cv"),
  handleCVUpload
);

export default router;
