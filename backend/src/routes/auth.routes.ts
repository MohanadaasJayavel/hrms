import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../db";
import { signToken } from "../middleware/auth";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user: any = db
    .prepare("SELECT * FROM employees WHERE email = ?")
    .get(email);

  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  const token = signToken({
    id: user.id,
    role: user.role,
    email: user.email,
  });

  res.json({ token, user });
});

export default router;
