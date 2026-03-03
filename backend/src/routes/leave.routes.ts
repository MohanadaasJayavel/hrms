import { Router } from "express";
import { db } from "../db";
import { authenticate, AuthRequest } from "../middleware/auth";
import { logAudit } from "../utils/audit";

const router = Router();

function calculateDays(start_date: string, end_date: string) {
  const start = new Date(start_date);
  const end = new Date(end_date);

  return (
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  );
}

function getRemainingBalance(employeeId: number) {
  const employee: any = db
    .prepare("SELECT annual_leave_balance FROM employees WHERE id = ?")
    .get(employeeId);

  if (!employee) return null;

  const approvedLeaves: any[] = db
    .prepare(
      `
      SELECT start_date, end_date
      FROM leave_requests
      WHERE employee_id = ?
      AND status = 'approved'
    `,
    )
    .all(employeeId);

  let approvedUsed = 0;

  approvedLeaves.forEach((leave) => {
    approvedUsed += calculateDays(leave.start_date, leave.end_date);
  });

  const remaining = employee.annual_leave_balance - approvedUsed;

  return {
    total_allocated: employee.annual_leave_balance,
    approved_used: approvedUsed,
    remaining: remaining > 0 ? remaining : 0,
  };
}

router.get("/", authenticate, (req: AuthRequest, res) => {
  const { role, id } = req.user!;

  try {
    if (role === "employee") {
      const leaves = db
        .prepare(
          `
          SELECT lr.*, 
                 e.name as employee_name,
                 r.name as reviewer_name
          FROM leave_requests lr
          JOIN employees e ON e.id = lr.employee_id
          LEFT JOIN employees r ON r.id = lr.reviewed_by
          WHERE lr.employee_id = ?
        `,
        )
        .all(id);

      return res.json(leaves);
    }

    if (role === "manager") {
      const leaves = db
        .prepare(
          `
          SELECT lr.*, 
                 e.name as employee_name,
                 e.department,
                 r.name as reviewer_name
          FROM leave_requests lr
          JOIN employees e ON e.id = lr.employee_id
          LEFT JOIN employees r ON r.id = lr.reviewed_by
          WHERE e.manager_id = ?
        `,
        )
        .all(id);

      return res.json(leaves);
    }

    if (role === "hr_admin") {
      const leaves = db
        .prepare(
          `
          SELECT lr.*, 
                 e.name as employee_name,
                 e.department,
                 m.name as manager_name,
                 r.name as reviewer_name
          FROM leave_requests lr
          JOIN employees e ON e.id = lr.employee_id
          LEFT JOIN employees m ON m.id = e.manager_id
          LEFT JOIN employees r ON r.id = lr.reviewed_by
        `,
        )
        .all();

      return res.json(leaves);
    }

    return res.status(403).json({ message: "Unauthorized role" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/balance", authenticate, (req: AuthRequest, res) => {
  const { role, id } = req.user!;

  if (role !== "employee") {
    return res
      .status(403)
      .json({ message: "Only employees have leave balance" });
  }

  try {
    const balance = getRemainingBalance(id);

    if (!balance) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    return res.json(balance);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/", authenticate, (req: AuthRequest, res) => {
  const { start_date, end_date, leave_type, reason } = req.body;
  const employeeId = req.user!.id;

  if (!start_date || !end_date || !leave_type) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const start = new Date(start_date);
  const end = new Date(end_date);

  if (start > end) {
    return res.status(400).json({ message: "Invalid date range" });
  }

  const daysRequested = calculateDays(start_date, end_date);

  const overlapping = db
    .prepare(
      `
      SELECT * FROM leave_requests
      WHERE employee_id = ?
      AND status IN ('pending', 'approved')
      AND start_date <= ?
      AND end_date >= ?
    `,
    )
    .all(employeeId, end_date, start_date);

  if (overlapping.length > 0) {
    return res.status(400).json({
      message: "Leave overlaps with existing request",
    });
  }


  const balance = getRemainingBalance(employeeId);

  if (!balance || daysRequested > balance.remaining) {
    return res.status(400).json({
      message: "Insufficient leave balance",
    });
  }

  const result = db
    .prepare(
      `
      INSERT INTO leave_requests
      (employee_id, start_date, end_date, leave_type, reason, status)
      VALUES (?, ?, ?, ?, ?, 'pending')
    `,
    )
    .run(employeeId, start_date, end_date, leave_type, reason || null);

  logAudit("leave", result.lastInsertRowid as number, "created", employeeId);

  res.json({ message: "Leave submitted successfully" });
});


router.put("/:id", authenticate, (req: AuthRequest, res) => {
  const leaveId = Number(req.params.id);
  const { status, review_comment } = req.body;
  const { role, id } = req.user!;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  const leave: any = db
    .prepare("SELECT * FROM leave_requests WHERE id = ?")
    .get(leaveId);

  if (!leave) return res.status(404).json({ message: "Leave not found" });

  if (role === "employee") {
    return res.status(403).json({
      message: "Employees cannot approve leaves",
    });
  }

  if (role === "manager") {
    const employee: any = db
      .prepare("SELECT * FROM employees WHERE id = ?")
      .get(leave.employee_id);

    if (!employee || employee.manager_id !== id) {
      return res.status(403).json({
        message: "Not authorized for this employee",
      });
    }
  }

  db.prepare(
    `
    UPDATE leave_requests
    SET status = ?, 
        reviewed_by = ?, 
        review_comment = ?, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `,
  ).run(status, id, review_comment || null, leaveId);

  logAudit("leave", leaveId, status, id);

  res.json({ message: `Leave ${status} successfully` });
});

export default router;
