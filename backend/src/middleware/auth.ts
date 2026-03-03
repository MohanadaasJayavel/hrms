import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthUser, Role } from "../types";

const JWT_SECRET = "supersecretkey";

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ message: "No token" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

export function authorize(roles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });

    next();
  };
}

export const signToken = (user: AuthUser) =>
  jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
