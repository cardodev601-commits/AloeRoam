import AdminSignOut from "@/components/admin/AdminSignOut";

export default function AccessDeniedPage() {
  return (
    <main className="adminAccessDenied">
      <section className="appCard adminAccessDeniedCard">
        <div className="adminAccessDeniedIcon" aria-hidden="true">!</div>
        <p className="appEyebrow">Access denied</p>
        <h1 className="appTitle">Administrator access required</h1>
        <p className="appMuted">This account is signed in but does not have the AloeRoam admin role.</p>
        <div style={{ marginTop: 24 }}><AdminSignOut /></div>
      </section>
    </main>
  );
}
