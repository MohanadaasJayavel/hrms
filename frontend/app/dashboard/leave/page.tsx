"use client";

import { useEffect, useState } from "react";
import LeaveForm from "@/components/LeaveForm";
import LeaveTable from "@/components/LeaveTable";

export default function LeavePage() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [role, setRole] = useState<"employee" | "manager" | "hr_admin">(
    "employee",
  );

  const fetchLeaves = async () => {
    const res = await fetch("http://localhost:5000/leave", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    setLeaves(data);
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("role") as
      | "employee"
      | "manager"
      | "hr_admin";

    if (storedRole) setRole(storedRole);

    fetchLeaves();
  }, []);

  return (
    <div className="space-y-8">
      {role === "employee" && <LeaveForm onSuccess={fetchLeaves} />}

      <LeaveTable leaves={leaves} role={role} />
    </div>
  );
}
