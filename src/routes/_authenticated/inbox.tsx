import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CalendarDays, Clock, LogOut, MapPin, Phone, RefreshCw, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout, EmptyState } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/_authenticated/inbox")({
  head: () => ({
    meta: [
      { title: "बुकिंग इनबॉक्स — DPS DARSHAN" },
      { name: "description", content: "DPS DARSHAN बुकिंग रिक्वेस्ट इनबॉक्स।" },
      { property: "og:title", content: "बुकिंग इनबॉक्स — DPS DARSHAN" },
      { property: "og:description", content: "प्राप्त बुकिंग रिक्वेस्ट देखें एवं स्थिति बदलें।" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: InboxPage,
});

const statuses = ["new", "contacted", "confirmed", "cancelled"] as const;
type Status = (typeof statuses)[number];

const statusLabel: Record<Status, string> = {
  new: "नई / New",
  contacted: "संपर्क हुआ / Contacted",
  confirmed: "पक्की / Confirmed",
  cancelled: "रद्द / Cancelled",
};

const statusClass: Record<Status, string> = {
  new: "bg-live text-live-foreground",
  contacted: "bg-secondary text-secondary-foreground",
  confirmed: "bg-success/20 text-success",
  cancelled: "bg-muted text-muted-foreground",
};

function InboxPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isAdmin = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) return false;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle();
      return Boolean(data);
    },
  });

  const bookings = useQuery({
    queryKey: ["booking-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("booking_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin.data === true,
  });

  const claimAdmin = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.rpc("claim_first_admin");
      if (error) throw error;
      return data;
    },
    onSuccess: (granted) => {
      if (granted) {
        toast.success("आपको एडमिन एक्सेस मिल गया / Admin access granted");
        void queryClient.invalidateQueries();
      } else {
        toast.error("एडमिन पहले से मौजूद है — मौजूदा एडमिन से पहुँच माँगें");
      }
    },
    onError: () => toast.error("एक्सेस नहीं मिल सका / Could not grant access"),
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Status }) => {
      const { error } = await supabase.from("booking_requests").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["booking-requests"] }),
    onError: () => toast.error("स्थिति सेव नहीं हुई / Could not save status"),
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    void navigate({ to: "/auth" });
  };

  return (
    <SiteLayout>
      <section className="section-pad">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl">
              <span className="gold-text">बुकिंग इनबॉक्स / Booking Inbox</span>
            </h1>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => void queryClient.invalidateQueries()}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold"
              >
                <RefreshCw className="size-4" aria-hidden /> ताज़ा करें
              </button>
              <button
                type="button"
                onClick={() => void signOut()}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold"
              >
                <LogOut className="size-4" aria-hidden /> लॉगआउट
              </button>
            </div>
          </div>

          {isAdmin.isLoading ? (
            <EmptyState text="लोड हो रहा है…" />
          ) : isAdmin.data === false ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">
                इस खाते के पास इनबॉक्स की पहुँच नहीं है। यदि यह DPS DARSHAN का पहला खाता है, नीचे
                क्लिक करके एडमिन बनें।
              </p>
              <button
                type="button"
                disabled={claimAdmin.isPending}
                onClick={() => claimAdmin.mutate()}
                className="mt-4 rounded-full brand-gradient px-5 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-60"
              >
                एडमिन बनें / Become admin
              </button>
            </div>
          ) : bookings.isLoading ? (
            <EmptyState text="लोड हो रहा है…" />
          ) : !bookings.data || bookings.data.length === 0 ? (
            <EmptyState text="अभी कोई बुकिंग रिक्वेस्ट नहीं आई है" />
          ) : (
            <ul className="grid gap-4">
              {bookings.data.map((b) => (
                <li
                  key={b.id}
                  className="rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          statusClass[b.status as Status]
                        }`}
                      >
                        {statusLabel[b.status as Status]}
                      </span>
                      <span className="font-display text-base">{b.request_id}</span>
                    </p>
                    <select
                      value={b.status}
                      onChange={(e) =>
                        setStatus.mutate({ id: b.id, status: e.target.value as Status })
                      }
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm"
                      aria-label={`${b.request_id} status`}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {statusLabel[s]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <ul className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
                    <li className="inline-flex items-center gap-1.5">
                      <User className="size-4 text-muted-foreground" aria-hidden /> {b.name}
                    </li>
                    <li className="inline-flex items-center gap-1.5">
                      <Phone className="size-4 text-muted-foreground" aria-hidden />
                      <a href={`tel:+91${b.mobile}`} className="underline-offset-4 hover:underline">
                        {b.mobile}
                      </a>
                      {b.whatsapp && <span className="text-muted-foreground">/ {b.whatsapp}</span>}
                    </li>
                    <li className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-4 text-muted-foreground" aria-hidden />{" "}
                      {b.program_type} — {b.event_date || "—"}
                    </li>
                    <li className="inline-flex items-center gap-1.5">
                      <Clock className="size-4 text-muted-foreground" aria-hidden />{" "}
                      {b.start_time || "—"} {b.duration && `· ${b.duration}`}
                    </li>
                    <li className="inline-flex items-center gap-1.5 sm:col-span-2">
                      <MapPin className="size-4 text-muted-foreground" aria-hidden />{" "}
                      {[b.venue, b.city, b.district].filter(Boolean).join(", ") || "—"}
                    </li>
                  </ul>

                  {(b.special_requirements || b.message || b.email || b.address) && (
                    <dl className="mt-3 grid gap-2 border-t border-border pt-3 text-sm sm:grid-cols-2">
                      {(
                        [
                          ["ईमेल / Email", b.email],
                          ["पता / Address", b.address],
                          ["श्रोता / Audience", b.audience],
                          ["विशेष / Special", b.special_requirements],
                          ["संदेश / Message", b.message],
                        ] as const
                      )
                        .filter(([, v]) => Boolean(v))
                        .map(([k, v]) => (
                          <div key={k}>
                            <dt className="text-[11px] text-muted-foreground">{k}</dt>
                            <dd className="break-words">{v}</dd>
                          </div>
                        ))}
                    </dl>
                  )}

                  <p className="mt-3 text-[11px] text-muted-foreground">
                    {new Date(b.created_at).toLocaleString("hi-IN", { timeZone: "Asia/Kolkata" })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
