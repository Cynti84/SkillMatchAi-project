import pool from "../db/db";

export async function createEmployerProfile(userId: number, profile: any) {
  const {
    company_name,
    website,
    industry,
    description,
    logo_url,
    work_email,
    phone,
  } = profile;

  const result = await pool.query(
    `INSERT INTO employer_profiles 
     (user_id, company_name, website, industry, description, logo_url, work_email, phone)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      userId,
      company_name,
      website,
      industry,
      description,
      logo_url,
      work_email,
      phone,
    ]
  );

  return result.rows[0];
}

export async function getEmployerProfile(userId: number) {
  const result = await pool.query(
    `SELECT * FROM employer_profiles WHERE user_id = $1`,
    [userId]
  );
  return result.rows[0];
}
