import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const getAdminContext = cache(async () => {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();

  const userId = claimsData?.claims?.sub;
  if (claimsError || !userId) {
    return { user: null, profile: null, isAdmin: false };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", userId)
    .maybeSingle();

  if (profileError) {
    throw new Error("AloeRoam could not verify administrator access.");
  }

  return {
    user: {
      id: userId,
      email: claimsData.claims.email || null,
    },
    profile,
    isAdmin: profile?.role === "admin",
  };
});

export async function requireAdmin() {
  const context = await getAdminContext();

  if (!context.user) {
    redirect("/admin/login");
  }

  return context;
}
