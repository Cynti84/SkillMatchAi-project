export interface User {
  full_name: string;
  email: string;
  password_hash: string;
  role: "job_seeker" | "employer" | "admin";
}

