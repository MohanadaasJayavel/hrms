"use client";

import { useEffect, useState } from "react";
import LeaveTable from "@/components/LeaveTable";
import SummaryCards from "@/components/SummaryCards";

export default function HRPage() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  const fetchLeaves = () => {
    fetch("http://localhost:5000/leave", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setLeaves);
  };

  useEffect(fetchLeaves, []);

  const filteredLeaves =
    filter === "all" ? leaves : leaves.filter((l) => l.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">All Leave Requests</h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <SummaryCards leaves={leaves} />
      <LeaveTable leaves={filteredLeaves} role="hr_admin" />
    </div>
  );
}
