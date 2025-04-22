import pool from "../db/db";

export function extractSkillsFromText(text: string): string[] {
  const knownSkills = [
    "JavaScript",
    "TypeScript",
    "Angular",
    "Node.js",
    "Express.js",
    "React",
    "HTML",
    "CSS",
    "Python",
    "SQL",
    "MongoDB",
    "Docker",
    "AWS",
    "Git",
    "Docker",
    "VS Code",
    "Postman",
    "Teamwork",
    "Communication",
    "Problem-solving",
    "Critical thinking",
  ];

  const matches = knownSkills.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase())
  );

  console.log("Matched skills:", matches);
  return matches;
}

export async function upsertUserSkills(
  userId: number,
  extractedSkills: string[]
) {
  for (const skill of extractedSkills) {
    // 1. Ensure the skill exists in `skills` table
    const result = await pool.query(
      "SELECT id FROM skills WHERE LOWER(name) = LOWER($1)",
      [skill]
    );

    let skillId;

    if (result.rows.length > 0) {
      skillId = result.rows[0].id;
    } else {
      const insertRes = await pool.query(
        "INSERT INTO skills (name) VALUES ($1) RETURNING id",
        [skill]
      );
      skillId = insertRes.rows[0].id;
    }

    // 2. Check if already in user_skills
    const existing = await pool.query(
      "SELECT * FROM user_skills WHERE user_id = $1 AND skill_id = $2",
      [userId, skillId]
    );

    // 3. Only insert if not already present
    if (existing.rows.length === 0) {
      await pool.query(
        `INSERT INTO user_skills (user_id, skill_id, proficiency_level)
         VALUES ($1, $2, $3)`,
        [userId, skillId, 50]
        );
        console.log(`Upserting skill for user ${userId}:`, skill);

    }
  }
}
