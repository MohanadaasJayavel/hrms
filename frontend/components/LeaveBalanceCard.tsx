"use client";

import { useEffect, useState } from "react";

export default function LeaveBalanceCard() {
  const [balance, setBalance] = useState<any>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await fetch("http://localhost:5000/leave/balance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setBalance(data);
    };

    fetchBalance();
  }, []);

  if (!balance) return null;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md">
      <h3 className="text-lg font-semibold mb-4">Annual Leave Balance</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Total Allocated</span>
          <span className="font-medium">{balance.total_allocated} days</span>
        </div>

        <div className="flex justify-between">
          <span>Approved Used</span>
          <span className="font-medium text-red-600">
            {balance.approved_used} days
          </span>
        </div>

        <div className="border-t pt-2 flex justify-between font-semibold">
          <span>Remaining</span>
          <span className="text-green-600">{balance.remaining} days</span>
        </div>
      </div>
    </div>
  );
}
