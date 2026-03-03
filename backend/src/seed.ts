import bcrypt from "bcrypt";
import { db } from "./db";

async function seed() {
  const hash = await bcrypt.hash("password123", 10);

  // HR Admin (20 days leave)
  db.prepare(`
    INSERT INTO employees 
    (name, email, department, role, manager_id, password, annual_leave_balance)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    "HR Admin",
    "hr@company.com",
    "HR",
    "hr_admin",
    null,
    hash,
    20
  );

  // Manager (20 days leave)
  db.prepare(`
    INSERT INTO employees 
    (name, email, department, role, manager_id, password, annual_leave_balance)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    "Manager",
    "manager@company.com",
    "IT",
    "manager",
    null,
    hash,
    20
  );

  // Employee (reports to Manager id = 2)
  db.prepare(`
    INSERT INTO employees 
    (name, email, department, role, manager_id, password, annual_leave_balance)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    "Employee",
    "employee@company.com",
    "IT",
    "employee",
    2,
    hash,
    20
  );

  console.log("✅ Seed complete");
}

seed();