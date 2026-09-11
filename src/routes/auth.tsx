import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "टीम लॉगिन — DPS DARSHAN" },
      {
        name: "description",
        content: "DPS DARSHAN टीम लॉगिन — बुकिंग रिक्वेस्ट इनबॉक्स देखने हेतु।",
      },
      { property: "og:title", content: "टीम लॉगिन — DPS DARSHAN" },
      { property: "og:description", content: "बुकिंग रिक्वेस्ट इनबॉक्स हेतु टीम लॉगिन।" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return toast.error(error.message);
      void navigate({ to: "/inbox" });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/inbox` },
      });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("खाता बन गया — ईमेल में भेजा गया लिंक खोलें / Check your email to confirm");
    }
  };

  const google = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) return toast.error(result.error.message ?? "Google sign-in failed");
    if (result.redirected) return;
    void navigate({ to: "/inbox" });
  };

  return (
    <SiteLayout>
      <section className="section-pad">
        <div className="mx-auto max-w-md px-4">
          <h1 className="text-center text-2xl sm:text-3xl">
            <span className="gold-text">टीम लॉगिन / Team Login</span>
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            बुकिंग रिक्वेस्ट इनबॉक्स केवल DPS DARSHAN टीम के लिए।
          </p>

          <form
            onSubmit={submit}
            className="mt-6 grid gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft"
          >
            <div>
              <label htmlFor="auth-email" className="mb-1.5 block text-sm font-medium">
                ईमेल / Email
              </label>
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="auth-password" className="mb-1.5 block text-sm font-medium">
                पासवर्ड / Password
              </label>
              <input
                id="auth-password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="rounded-full brand-gradient px-5 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-60"
            >
              {mode === "signin" ? "लॉगिन / Sign in" : "खाता बनाएँ / Create account"}
            </button>
            <button
              type="button"
              onClick={() => void google()}
              className="rounded-full border border-gold px-5 py-2.5 text-sm font-semibold text-primary dark:text-gold"
            >
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-xs text-muted-foreground underline-offset-4 hover:underline"
            >
              {mode === "signin"
                ? "नया खाता बनाएँ / Create an account"
                : "पहले से खाता है? लॉगिन करें / Already have an account?"}
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
