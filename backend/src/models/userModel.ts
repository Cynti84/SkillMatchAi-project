import pool from "../db/db";
import { User } from "../types/userTypes";

export const createUser = async (user: User) => {
  const { full_name, email, password_hash, role } = user;
  const result = await pool.query(
    `INSERT INTO users (full_name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *`,
    [full_name, email, password_hash, role]
  );
  return result.rows[0];
};

export const getUserByEmail = async (email: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return result.rows[0];
};

export const getUserById = async (id: number) => {
  const result = await pool.query(
    `SELECT id, full_name, email, role, created_at FROM users WHERE id=$1`,
    [id]
  );
  return result.rows[0];
};
