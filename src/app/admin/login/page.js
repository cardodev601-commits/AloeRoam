import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getAdminContext } from "@/lib/admin/auth";

export const metadata = {
  title: "Admin Sign In",
};

export default async function AdminLoginPage() {
  const { user, isAdmin } = await getAdminContext();
  if (user && isAdmin) redirect("/admin/dashboard");

  return (
    <main className="adminLoginPage">
      <section className="adminLoginBrand" aria-label="AloeRoam Administration">
        <div className="adminLoginBrandContent">
          <div className="adminBrandMark" aria-hidden="true">AR</div>
          <p className="adminBrandEyebrow">AloeRoam Administration</p>
          <h1 className="adminBrandTitle">Moderate with clarity.</h1>
          <p className="adminBrandText">
            Review provider submissions, protect listing quality and keep local discovery trustworthy.
          </p>
        </div>
      </section>

      <section className="adminLoginPanel">
        <div className="appCard adminLoginCard">
          <p className="appEyebrow">Authorised access</p>
          <h2 className="adminLoginTitle">Welcome back</h2>
          <p className="adminLoginLead">Sign in with an AloeRoam administrator account.</p>
          <AdminLoginForm />
          <p className="adminLoginFootnote">
            Access is restricted to accounts whose AloeRoam profile has the admin role.
          </p>
        </div>
      </section>
    </main>
  );
}
