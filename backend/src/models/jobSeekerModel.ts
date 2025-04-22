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

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const profileResult = await client.query(
      `INSERT INTO job_seeker_profiles 
      (user_id, phone, location, desired_roles, profile_photo_url, resume_url)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [userId, phone, location, desired_roles, profile_photo_url, resume_url]
    );

    const user_id = userId; // Already available at the top

    const parsedSkills =
      typeof skills === "string"
        ? skills.split(",").map((s: string) => s.trim().toLowerCase())
        : skills.map((s: string) => s.trim().toLowerCase());

    const uniqueSkills = [...new Set(parsedSkills)];

    //loop over skills and insert them into user_skills
    for (const skill of uniqueSkills) {
      const skillRes = await client.query(
        "SELECT id FROM skills WHERE LOWER(name) = LOWER($1)",
        [skill]
      );

      let skillId;
      if (skillRes.rows.length > 0) {
        skillId = skillRes.rows[0].id;
      } else {
        const newSkill = await client.query(
          "INSERT INTO skills (name) VALUES ($1) RETURNING id",
          [skill]
        );
        skillId = newSkill.rows[0].id;
      }

      await client.query(
        "INSERT INTO user_skills (user_id, skill_id) VALUES ($1, $2)",
        [user_id, skillId]
      );
    }

    await client.query("COMMIT");
    return { user_id, phone, location, desired_roles };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }

}

export async function getJobSeekerProfile(userId: number) {
  const result = await pool.query(
    `SELECT * FROM job_seeker_profiles WHERE user_id = $1`,
    [userId]
  );
  return result.rows[0];
}
