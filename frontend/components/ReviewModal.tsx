"use client";

import { useState } from "react";

interface Props {
  leave: any;
  onClose: () => void;
  onSubmit: (status: string, comment: string) => void;
}

export function ReviewModal({ leave, onClose, onSubmit }: Props) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAction = async (status: string) => {
    setLoading(true);
    await onSubmit(status, comment);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">Review Leave Request</h2>

        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <strong>Employee:</strong> {leave.employee_name}
          </p>
          <p>
            <strong>Email:</strong> {leave.employee_email}
          </p>
          <p>
            <strong>Type:</strong> {leave.leave_type}
          </p>
          <p>
            <strong>Duration:</strong> {leave.start_date} → {leave.end_date}
          </p>
          <p>
            <strong>Reason:</strong> {leave.reason}
          </p>
        </div>

        <textarea
          placeholder="Optional comment..."
          className="w-full border rounded-lg p-2 text-sm"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={() => handleAction("rejected")}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white"
          >
            Reject
          </button>

          <button
            disabled={loading}
            onClick={() => handleAction("approved")}
            className="px-4 py-2 text-sm rounded-lg bg-green-600 text-white"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
