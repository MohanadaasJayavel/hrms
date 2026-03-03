"use client";

interface Props {
  leaves: any[];
  onReview: (leave: any) => void;
}

export default function ApprovalTable({ leaves, onReview }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          Pending Approvals
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Review and take action on employee leave requests.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">From</th>
              <th className="p-4 text-left">To</th>
              <th className="p-4 text-left">Reason</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-10 text-gray-500">
                  No pending leave requests 🎉
                </td>
              </tr>
            ) : (
              leaves.map((leave) => (
                <tr
                  key={leave.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium text-gray-800">
                    {leave.employee_name || "-"}
                  </td>

                  <td className="p-4 text-gray-600">
                    {leave.employee_email || "-"}
                  </td>

                  <td className="p-4 text-gray-700">
                    {leave.department || "-"}
                  </td>

                  <td className="p-4">{leave.leave_type}</td>

                  <td className="p-4">{leave.start_date}</td>

                  <td className="p-4">{leave.end_date}</td>

                  <td className="p-4 max-w-xs truncate text-gray-600">
                    {leave.reason || "-"}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => onReview(leave)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-xl text-sm font-medium transition"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
