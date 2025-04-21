import pool from "../db/db";
export async function createJobSeekerProfile(userId: number, profile: any) {
  

    const {
      phone,
      location,
      desired_roles,
      skills,
      profile_photo_url,
      resume_url,
    } = profile;

  const parsedSkills =
    typeof skills === "string"
      ? skills.split(",").map((s) => s.trim())
      : skills;

    const result = await pool.query(
      `INSERT INTO job_seeker_profiles 
     (user_id, phone, location, desired_roles, skills, profile_photo_url, resume_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        userId,
        phone,
        location,
        desired_roles,
        parsedSkills,
        profile_photo_url,
        resume_url,
      ]
    );

    return result.rows[0]
}

export async function getJobSeekerProfile(userId: number) {
    const result = await pool.query(
      `SELECT * FROM job_seeker_profiles WHERE user_id = $1`,
      [userId]
    );
    return result.rows[0]
}
