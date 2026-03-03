"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EmployeeProfile() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:5000/employees", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((e: any) => e.id == id);
        setEmployee(found);
      });
  }, [id]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm max-w-xl">
      <h2 className="text-xl font-semibold mb-4">
        {employee.name}
      </h2>

      <div className="space-y-3 text-sm">
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Role:</strong> {employee.role}</p>
      </div>
    </div>
  );
}