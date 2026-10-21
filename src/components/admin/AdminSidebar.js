import Link from "next/link";
import AdminSignOut from "./AdminSignOut";

const links = [
  ["Dashboard", "/admin/dashboard", "D"],
  ["Pending", "/admin/listings/pending", "P"],
  ["Changes Required", "/admin/listings/changes-required", "C"],
  ["Published", "/admin/listings/published", "A"],
  ["Rejected", "/admin/listings/rejected", "R"],
];

export default function AdminSidebar() {
  return (
    <aside className="adminSidebar">
      <div className="adminSidebarBrand">
        <div className="adminSidebarMark" aria-hidden="true">AR</div>
        <div className="adminSidebarBrandCopy">
          <span className="adminSidebarName">AloeRoam</span>
          <span className="adminSidebarLabel">ADMINISTRATION</span>
        </div>
      </div>

      <nav className="adminSidebarNav" aria-label="Administration navigation">
        <p className="adminNavLabel">Workspace</p>
        {links.slice(0, 1).map(([label, href, mark]) => (
          <Link className="adminNavLink" href={href} key={href}>
            <b aria-hidden="true">{mark}</b><span>{label}</span>
          </Link>
        ))}
        <p className="adminNavLabel">Listings</p>
        {links.slice(1).map(([label, href, mark]) => (
          <Link className="adminNavLink" href={href} key={href}>
            <b aria-hidden="true">{mark}</b><span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="adminSidebarFooter"><AdminSignOut /></div>
    </aside>
  );
}
