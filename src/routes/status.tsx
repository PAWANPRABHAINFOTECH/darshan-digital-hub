import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Check, Clock, Search } from "lucide-react";
import { SiteLayout, SectionHeading } from "@/components/layout/SiteLayout";
import { useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "बुकिंग स्थिति देखें — DPS DARSHAN" },
      {
        name: "description",
        content:
          "अपनी बुकिंग आईडी और मोबाइल नंबर से DPS DARSHAN बुकिंग एवं भुगतान सत्यापन की वर्तमान स्थिति देखें।",
      },
      { property: "og:title", content: "बुकिंग स्थिति — DPS DARSHAN" },
      { property: "og:description", content: "बुकिंग एवं भुगतान की स्थिति ट्रैक करें।" },
    ],
  }),
  component: StatusPage,
});

const schema = z.object({
  id: z.string().trim().min(4).max(40),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/),
});

function StatusPage() {
  const { bt } = useI18n();
  const [id, setId] = useState("");
  const [mobile, setMobile] = useState("");
  const [result, setResult] = useState<null | "found" | "notfound">(null);
  const [error, setError] = useState("");

  const stages = [
    bt("status.bookingPending"),
    bt("status.paymentVerification"),
    bt("status.paymentApproved"),
    bt("status.programConfirmed"),
  ];
  const active = 1;

  return (
    <SiteLayout>
      <section className="py-12 md:py-16">
        <SectionHeading eyebrow="Status" title={bt("status.title")} />
        <div className="mx-auto max-w-xl px-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="s-id" className="mb-1.5 block text-sm font-medium">
                  {bt("pay.bookingId")}
                </label>
                <input
                  id="s-id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="DPS-2026-123456"
                  className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                />
              </div>
              <div>
                <label htmlFor="s-mobile" className="mb-1.5 block text-sm font-medium">
                  {bt("booking.mobile")}
                </label>
                <input
                  id="s-mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                />
              </div>
            </div>
            {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
            <button
              type="button"
              onClick={() => {
                const parsed = schema.safeParse({ id, mobile });
                if (!parsed.success) {
                  setError(bt("common.invalidMobile"));
                  setResult(null);
                  return;
                }
                setError("");
                setResult(/^DPS-\d{4}-\d{6}$/.test(id.trim()) ? "found" : "notfound");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-bold text-primary-foreground"
            >
              <Search className="size-4" aria-hidden /> {bt("status.check")}
            </button>
          </div>

          {result === "notfound" && (
            <p className="mt-5 rounded-xl border border-dashed border-border bg-surface/60 p-6 text-center text-sm text-muted-foreground">
              {bt("status.notFound")}
            </p>
          )}

          {result === "found" && (
            <ol className="mt-6 space-y-3">
              {stages.map((s, i) => (
                <li
                  key={s}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
                >
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full ${
                      i <= active ? "brand-gradient text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < active ? (
                      <Check className="size-4" aria-hidden />
                    ) : (
                      <Clock className="size-4" aria-hidden />
                    )}
                  </span>
                  <span className={`text-sm ${i <= active ? "font-semibold" : "text-muted-foreground"}`}>
                    {s}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
