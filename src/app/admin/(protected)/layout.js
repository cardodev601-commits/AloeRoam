import AdminSidebar from "@/components/admin/AdminSidebar";
import { requireAdmin } from "@/lib/admin/auth";
import { connection } from "next/server";
// export const dynamic = "force-dynamic";
export const instant = false;

export default async function ProtectedAdminLayout({ children }) {
  await connection();
  const { user, profile, isAdmin } = await requireAdmin();

  if (!isAdmin) {
    return (
      <main className="adminAccessDenied">
        <section className="appCard adminAccessDeniedCard">
          <div className="adminAccessDeniedIcon" aria-hidden="true">!</div>
          <p className="appEyebrow">Access denied</p>
          <h1 className="appTitle">Administrator access required</h1>
          <p className="appMuted">
            {user.email || "This account"} is authenticated but does not have the AloeRoam admin role.
          </p>
        </section>
      </main>
    );
  }

  const displayName = profile?.full_name || user.email || "Administrator";

  return (
    <div className="adminShell">
      <AdminSidebar />
      <div className="adminWorkspace">
        <header className="adminTopbar">
          <div>
            <p className="appEyebrow">AloeRoam Administration</p>
            <strong>Protected workspace</strong>
          </div>
          <span className="adminTopbarUser">Signed in as {displayName}</span>
        </header>
        <main className="adminPage">{children}</main>
      </div>
    </div>
  );
}
