"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) throw error;

      const response = await fetch("/admin/api/authorize", {
        method: "POST",
        headers: { "content-type": "application/json" },
      });

      if (!response.ok) {
        await supabase.auth.signOut();
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "This account is not authorised for AloeRoam administration.");
      }

      router.replace("/admin/dashboard");
      router.refresh();
    } catch (error) {
      setErrorMessage(error?.message || "AloeRoam could not sign you in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="adminFormGroup">
        <label className="adminFormLabel" htmlFor="admin-email">Email address</label>
        <input
          autoComplete="email"
          className="appField"
          id="admin-email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          required
          type="email"
          value={email}
        />
      </div>

      <div className="adminFormGroup">
        <label className="adminFormLabel" htmlFor="admin-password">Password</label>
        <input
          autoComplete="current-password"
          className="appField"
          id="admin-password"
          minLength={8}
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
      </div>

      {errorMessage ? <div className="adminFormError" role="alert">{errorMessage}</div> : null}

      <button className="appPrimaryButton adminLoginSubmit" disabled={submitting} type="submit">
        {submitting ? "Signing in..." : "Admin Sign In"}
      </button>
    </form>
  );
}
