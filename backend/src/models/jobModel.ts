import pool from "../db/db";

export async function createJobWithSkills(
  employer_id: number,
  job: {
    title: string;
    description: string;
    company: string;
    location: string;
    skills: string[];
  }
) {
  const { title, description, company, location, skills } = job;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const jobResult = await client.query(
      `INSERT INTO jobs (employer_id, title, description, company_name, location)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [employer_id, title, description, company, location]
    );

    const jobId = jobResult.rows[0].id;

    // Loop over skills and insert into job_skills
    for (const skill of skills) {
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
        "INSERT INTO job_skills (job_id, skill_id) VALUES ($1, $2)",
        [jobId, skillId]
      );
    }

    await client.query("COMMIT");

    return { jobId, title, company };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}