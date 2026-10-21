import { redirect } from "next/navigation";
import { getAdminContext } from "@/lib/admin/auth";

export default async function AdminIndexPage() {
  const { user, isAdmin } = await getAdminContext();

  if (!user) redirect("/admin/login");
  if (!isAdmin) redirect("/admin/access-denied");

  redirect("/admin/dashboard");
}
