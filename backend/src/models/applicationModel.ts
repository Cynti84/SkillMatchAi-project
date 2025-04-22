import pool from "../db/db";

export async function applyForJob(
  userId: number,
  jobId: number,
  resumeUrl: string | null
) {
  // Check for duplicate application
  const existing = await pool.query(
    `SELECT * FROM applications WHERE user_id = $1 AND job_id = $2`,
    [userId, jobId]
  );
  if (existing.rows.length > 0) {
    throw new Error("You have already applied to this job.");
  }

  const result = await pool.query(
    `INSERT INTO applications (user_id, job_id, status, matching_score, interview_date, created_at)
     VALUES ($1, $2, 'pending', NULL, NULL, NOW())
     RETURNING *`,
    [userId, jobId]
  );

  // Optionally insert into cv table
  if (resumeUrl) {
    await pool.query(`INSERT INTO cv (user_id, document_url) VALUES ($1, $2)`, [
      userId,
      resumeUrl,
    ]);
  }

  return result.rows[0];
}

export async function fetchApplicantsForJob(jobId: number) {
  const result = await pool.query(
    `SELECT a.*, u.full_name, u.email, js.profile_photo_url
     FROM applications a
     JOIN users u ON a.user_id = u.id
     JOIN job_seeker_profiles js ON u.id = js.user_id
     WHERE a.job_id = $1`,
    [jobId]
  );
  return result.rows;
}
