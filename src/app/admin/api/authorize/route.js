import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/admin/auth";

export async function POST() {
  const { user, isAdmin } = await getAdminContext();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  if (!isAdmin) {
    return NextResponse.json(
      { error: "This account is not authorised for AloeRoam administration." },
      { status: 403 },
    );
  }

  return NextResponse.json({ authorised: true });
}
