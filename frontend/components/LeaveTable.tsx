"use client";

import StatusBadge from "@/components/StatusBadge";

interface Props {
  leaves: any[];
  role: "employee" | "manager" | "hr_admin";
}

export default function LeaveTable({ leaves, role }: Props) {
  const getColSpan = () => {
    if (role === "employee") return 6;
    if (role === "manager") return 9;
    return 10; // hr_admin
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          Leave History
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">

              {role !== "employee" && (
                <>
                  <th className="p-4 text-left">Employee</th>
                  <th className="p-4 text-left">Email</th>
                </>
              )}

              {role === "hr_admin" && (
                <th className="p-4 text-left">Manager</th>
              )}

              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">From</th>
              <th className="p-4 text-left">To</th>
              <th className="p-4 text-left">Reason</th>
              <th className="p-4 text-left">Status</th>

              {role !== "employee" && (
                <>
                  <th className="p-4 text-left">Reviewed By</th>
                  <th className="p-4 text-left">Comment</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td
                  colSpan={getColSpan()}
                  className="text-center py-10 text-gray-500"
                >
                  No leave records found
                </td>
              </tr>
            ) : (
              leaves.map((leave) => (
                <tr
                  key={leave.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {role !== "employee" && (
                    <>
                      <td className="p-4 font-medium text-gray-800">
                        {leave.employee_name || "-"}
                      </td>
                      <td className="p-4 text-gray-600">
                        {leave.employee_email || "-"}
                      </td>
                    </>
                  )}

                  {role === "hr_admin" && (
                    <td className="p-4 text-gray-700">
                      {leave.manager_name || "-"}
                    </td>
                  )}

                  <td className="p-4">{leave.leave_type}</td>
                  <td className="p-4">{leave.start_date}</td>
                  <td className="p-4">{leave.end_date}</td>
                  <td className="p-4 max-w-xs truncate">
                    {leave.reason}
                  </td>

                  <td className="p-4">
                    <StatusBadge status={leave.status} />
                  </td>

                  {role !== "employee" && (
                    <>
                      <td className="p-4 text-gray-700">
                        {leave.reviewer_name || "-"}
                      </td>
                      <td className="p-4 text-gray-600 max-w-xs truncate">
                        {leave.review_comment || "-"}
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}