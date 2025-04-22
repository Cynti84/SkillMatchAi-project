import { Request, Response } from "express";
import asyncHandler from "../middleware/asynchandlers";
import { AuthRequest } from "../types/auth";
import fs from "fs";
import path from "path";
import pool from "../db/db";
import { extractSkillsFromText, upsertUserSkills } from "../utils/skillUtils";
import pdfParse from "pdf-parse"; // 📥 Add this at the top

export const handleCVUpload = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("Uploaded file:", req.file);

    const fileBuffer = req.file.buffer;
    console.log("Buffer length:", fileBuffer.length);

    // ✅ Extract text from the PDF using pdf-parse
    const parsed = await pdfParse(fileBuffer);
    const rawText = parsed.text;
    console.log("Extracted text preview:", rawText.slice(0, 300)); // preview first 300 chars

    // ✅ Extract known skills from parsed text
    const extractedSkills = extractSkillsFromText(rawText);
    console.log("Matched skills:", extractedSkills);

    // Save file to disk (optional)
    const fileName = req.file.originalname;
    const savePath = path.join(__dirname, "../../uploads/cvs/", fileName);
    fs.mkdirSync(path.dirname(savePath), { recursive: true });
    fs.writeFileSync(savePath, fileBuffer);
    const document_url = `/uploads/cvs/${fileName}`;

    // Save CV record in DB
    await pool.query(
      `INSERT INTO cvs (user_id, document_url, extracted_data)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id)
       DO UPDATE SET document_url = EXCLUDED.document_url, extracted_data = EXCLUDED.extracted_data`,
      [userId, document_url, JSON.stringify(extractedSkills)]
    );

    // Upsert extracted skills into user_skills table
    await upsertUserSkills(userId, extractedSkills);

    res.status(200).json({
      message: "CV uploaded & skills extracted successfully!",
      skills: extractedSkills,
    });
  }
);
