"use client";

import { useEffect, useState } from "react";
import LeaveBalanceCard from "@/components/LeaveBalanceCard";
import Link from "next/link";

export default function EmployeeDashboard() {
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:5000/employees", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setEmployee);
  }, []);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <LeaveBalanceCard />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Link
          href="/dashboard/employees"
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
        >
          Employee Directory
        </Link>

        <Link
          href="/dashboard/leave"
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
        >
          Apply Leave
        </Link>
      </div>
    </div>
  );
}
