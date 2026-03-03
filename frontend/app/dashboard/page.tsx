"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const role: any = localStorage.getItem("role");
    if (role === "employee") router.push("/dashboard/employee");
    if (role === "manager") router.push("/dashboard/manager");
    if (role === "hr_admin") router.push("/dashboard/hr");
  }, []);

  return <div>Redirecting...</div>;
}
