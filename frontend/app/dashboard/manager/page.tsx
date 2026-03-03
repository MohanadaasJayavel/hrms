"use client";

import { useEffect, useState } from "react";
import ApprovalTable from "@/components/ApprovalTable";
import { ReviewModal } from "@/components/ReviewModal";
import LeaveTable from "@/components/LeaveTable";

export default function ManagerPage() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [message, setMessage] = useState<string | null>(null);

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

  const handleReview = async (status: string, comment: string) => {
    try {
      const res = await fetch(`http://localhost:5000/leave/${selected.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          status,
          review_comment: comment,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setMessage(`Leave ${status} successfully`);
      setSelected(null);
      fetchLeaves();
    } catch {
      setMessage("Something went wrong");
    }

    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
          {message}
        </div>
      )}

      <ApprovalTable
        leaves={leaves.filter((l) => l.status === "pending")}
        onReview={setSelected}
      />

      <LeaveTable
        leaves={leaves.filter((l) => l.status !== "pending")}
        role="manager"
      />

      {selected && (
        <ReviewModal
          leave={selected}
          onClose={() => setSelected(null)}
          onSubmit={handleReview}
        />
      )}
    </div>
  );
}
