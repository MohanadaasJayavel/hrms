interface Props {
  leaves: any[];
}

export default function SummaryCards({ leaves }: Props) {
  const total = leaves.length;
  const pending = leaves.filter((l) => l.status === "pending").length;
  const approved = leaves.filter((l) => l.status === "approved").length;
  const rejected = leaves.filter((l) => l.status === "rejected").length;

  const Card = ({ title, value }: any) => (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
      <span className="text-sm text-gray-500">{title}</span>
      <span className="text-2xl font-semibold mt-2">{value}</span>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card title="Total Requests" value={total} />
      <Card title="Pending" value={pending} />
      <Card title="Approved" value={approved} />
      <Card title="Rejected" value={rejected} />
    </div>
  );
}
