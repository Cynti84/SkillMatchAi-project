// types/auth.d.ts or src/types/global.d.ts
import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    full_name: string;
    email: string;
    role: string;
  };
}
