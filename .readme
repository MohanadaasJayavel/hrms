# 🏢 Employee Leave Management System

A full-stack Leave Management System built with:

- **Frontend:** Next.js (React + TypeScript + TailwindCSS)
- **Backend:** Node.js + Express + TypeScript
- **Database:** SQLite
- **Authentication:** JWT-based role authentication
- **Architecture:** Clean, dynamic leave balance calculation (single source of truth)

---

# 📌 Features Implemented

## 👤 Roles

The system supports three roles:

- **Employee**
- **Manager**
- **HR Admin**

Each role has controlled access to specific features.

---

# 🎯 Core Functionalities

## ✅ Authentication

- Secure JWT-based authentication
- Role-based access control
- Protected routes in frontend and backend

---

## ✅ Employee Functionalities

- View Dashboard
- View Annual Leave Balance
- Apply for Leave
- View Leave Requests (Own Only)
- Prevent overlapping leave requests
- Prevent applying if insufficient leave balance

---

## ✅ Manager Functionalities

- View team leave requests
- Approve / Reject leave
- Restricted to their own department employees

---

## ✅ HR Admin Functionalities

- View all employees
- View all leave requests
- Approve / Reject leave across organization

---

# 🧮 Leave Balance Logic (IMPORTANT)

### ✔ Single Source of Truth

- `employees.annual_leave_balance` → Stores **TOTAL annual allocation**
- `leave_requests` → Stores all leave records
- Only `status = 'approved'` counts as used leave

### ✔ Remaining Balance Formula

```
Remaining = Total Allocation - Sum(Approved Leave Days)
```

### ✔ No Direct Deduction in Employees Table

We removed deduction logic to prevent:

- Double subtraction
- Sync issues
- Data inconsistency

Everything is dynamically calculated.

---

# 🖥️ Backend Setup

## 📦 Install Dependencies

```bash
npm install
```

## ▶ Run Server

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## 📌 Key Backend Routes

### 🔐 Auth

- POST `/auth/login`
- POST `/auth/register`

### 📄 Leave

- GET `/leave` → Role-based leave listing
- GET `/leave/balance` → Dynamic leave balance
- POST `/leave` → Apply leave
- PUT `/leave/:id` → Approve/Reject leave

---

# 🌐 Frontend Setup

## 📦 Install Dependencies

```bash
npm install
```

## ▶ Run Frontend

```bash
npm run dev
```

Runs on:

```
http://localhost:3000
```

---

# 🎨 Frontend Features

- Modern Tailwind UI
- Responsive layout
- Dashboard per role
- Leave Balance Card
- Toast messages for:
  - Success
  - Errors

- Small responsive buttons
- Dropdown for leave type
- Loading states
- Protected routes

---

# 🧠 Validation Rules Implemented

### ✔ Date Validation

- Start date cannot be after end date

### ✔ Overlap Prevention

- Cannot apply leave overlapping with:
  - Pending leave
  - Approved leave

### ✔ Balance Validation

- Cannot apply leave exceeding remaining balance

### ✔ Role Restrictions

- Employees cannot approve leaves
- Managers only approve their team's leaves
- HR Admin can view everything

---

# 📊 Example Leave Balance Response

```json
{
  "total_allocated": 20,
  "approved_used": 6,
  "remaining": 14
}
```

---

# 🛠️ How Leave Days Are Calculated

```
days = (end_date - start_date) + 1
```

Example:

```
2025-01-01 → 2025-01-03 = 3 days
```

---

# 🚀 Future Improvements (Optional Enhancements)

- Exclude weekends automatically
- Add public holiday table
- Monthly leave accrual
- Carry-forward policy
- Yearly reset job
- Leave analytics dashboard
- Department-level leave policies

---

# 🏗️ Architecture Overview

Frontend (Next.js)
⬇
REST API (Express)
⬇
SQLite Database

All leave balance logic is calculated dynamically at API level.

---

# 🏆 Why This Architecture Is Correct

- No double deduction bugs
- Clean separation of concerns
- Scalable logic
- Easy to audit
- Consistent data source
- Production-ready pattern

---

# 📌 Environment Variables (Backend)

Create `.env`:

```
PORT=5000
JWT_SECRET=your_secret_key
```

---

# 👨‍💻 Developer Notes

- Always reset `annual_leave_balance` if testing
- Avoid manually deducting leave in employees table
- Leave balance is calculated from leave_requests table only

---

# 📜 License

This project is for learning/demo purposes.
Can be extended into a full HRMS.

---

# ✨ Final Status

✔ Full Leave Management System
✔ Role-Based Access
✔ Dynamic Leave Balance
✔ Clean Backend Architecture
✔ Polished Frontend UI
✔ SQLite Database Integration

---

If you want, we can now create:

- API documentation (Swagger)
- ER diagram
- Deployment guide
- Docker setup
- Production checklist

Your Leave Management System is now structured properly 🚀
