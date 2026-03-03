import { Router } from "express";
import { db } from "../db";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/", authenticate, (req, res) => {
  const employees = db
    .prepare(
      `
    SELECT id, name, email, department, role, manager_id,annual_leave_balance
    FROM employees
  `,
    )
    .all();

  res.json(employees);
});

export default router;
