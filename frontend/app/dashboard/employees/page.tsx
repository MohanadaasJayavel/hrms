"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/employees", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setEmployees);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">Employee Directory</h2>
      </div>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Department</th>
            <th className="p-4 text-left">Role</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp: any) => (
            <tr
              key={emp.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-4 font-medium text-indigo-600">
                <Link href={`/dashboard/employees/${emp.id}`}>
                  {emp.name}
                </Link>
              </td>
              <td className="p-4">{emp.email}</td>
              <td className="p-4">{emp.department}</td>
              <td className="p-4 capitalize">{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}