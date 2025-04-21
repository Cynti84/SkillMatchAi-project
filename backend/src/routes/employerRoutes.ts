import express from "express";
import {
  handleCreateEmployer,
  handleGetEmployer,
} from "../controllers/employerController";
import { protect, restrictTo } from "../middleware/authMiddleware";
import multer, { memoryStorage } from "multer";

const upload = multer({ dest: "uploads/" }); // 👈 will save files to /uploads by default
const router = express.Router();

router.post("/create", protect, restrictTo(["employer"]), upload.single('logo'), handleCreateEmployer);
router.get("/:userId", handleGetEmployer);

export default router;
