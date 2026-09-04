import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { programTypes } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";

type Form = {
  name: string;
  mobile: string;
  whatsapp: string;
  email: string;
  city: string;
  district: string;
  address: string;
  type: string;
  date: string;
  time: string;
  duration: string;
  venue: string;
  audience: string;
  special: string;
  message: string;
};

const empty: Form = {
  name: "",
  mobile: "",
  whatsapp: "",
  email: "",
  city: "",
  district: "",
  address: "",
  type: programTypes[0] ?? "",
  date: "",
  time: "",
  duration: "",
  venue: "",
  audience: "",
  special: "",
  message: "",
};

const step1Schema = z.object({
  name: z.string().trim().min(1).max(100),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/),
  whatsapp: z.string().trim().regex(/^[6-9]\d{9}$/).or(z.literal("")),
  email: z.string().trim().email().max(255).or(z.literal("")),
  city: z.string().trim().min(1).max(80),
  district: z.string().trim().max(80),
  address: z.string().trim().max(300),
});

const step2Schema = z.object({
  type: z.string().trim().min(1),
  date: z.string().trim().min(1),
  time: z.string().trim().min(1),
  duration: z.string().trim().max(80),
  venue: z.string().trim().min(1).max(200),
  audience: z.string().trim().max(20),
  special: z.string().trim().max(500),
  message: z.string().trim().max(1000),
});

const genBookingId = () =>
  `DPS-2026-${Math.floor(100000 + Math.random() * 900000)}`;

export function BookingWizard() {
  const { bookingLang, setBookingLang, bt } = useI18n();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingId, setBookingId] = useState<string | null>(null);

  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = (schema: z.ZodTypeAny) => {
    const parsed = schema.safeParse(form);
    if (parsed.success) {
      setErrors({});
      return true;
    }
    const next: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      next[key] =
        key === "mobile" || key === "whatsapp"
          ? bt("common.invalidMobile")
          : key === "email"
            ? bt("common.invalidEmail")
            : bt("common.required");
    }
    setErrors(next);
    return false;
  };

  // Render helper (not a JSX component) — using <Field/> would remount the
  // input on every keystroke because a new component type is created each render.
  const field = ({
    k,
    label,
    type = "text",
    textarea = false,
    options,
  }: {
    k: keyof Form;
    label: string;
    type?: string;
    textarea?: boolean;
    options?: string[];
  }) => (
    <div className={textarea ? "sm:col-span-2" : ""}>
      <label htmlFor={`b-${k}`} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {options ? (
        <select
          id={`b-${k}`}
          value={form[k]}
          onChange={(e) => set(k, e.target.value)}
          className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          id={`b-${k}`}
          rows={3}
          value={form[k]}
          onChange={(e) => set(k, e.target.value)}
          aria-invalid={!!errors[k]}
          className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        />
      ) : (
        <input
          id={`b-${k}`}
          type={type}
          value={form[k]}
          onChange={(e) => set(k, e.target.value)}
          aria-invalid={!!errors[k]}
          className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        />
      )}
      {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
    </div>
  );

  const steps = [bt("booking.step1"), bt("booking.step2"), bt("booking.step3")];

  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="mb-6 flex items-center justify-between gap-3">
        <ol className="flex flex-1 items-center gap-2 text-xs">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-2">
              <span
                className={`grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                  i <= step ? "brand-gradient text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="size-3.5" aria-hidden /> : i + 1}
              </span>
              <span className="hidden truncate sm:block">{s}</span>
            </li>
          ))}
        </ol>
        <div className="flex shrink-0 overflow-hidden rounded-full border border-border text-xs font-semibold">
          {(["hi", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setBookingLang(l)}
              aria-pressed={bookingLang === l}
              className={`px-3 py-1.5 ${bookingLang === l ? "brand-gradient text-primary-foreground" : ""}`}
            >
              {l === "hi" ? "हिंदी" : "English"}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        {step === 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {field({ k: "name", label: bt("booking.name") })}
            {field({ k: "mobile", label: bt("booking.mobile"), type: "tel" })}
            {field({ k: "whatsapp", label: bt("booking.whatsapp"), type: "tel" })}
            {field({ k: "email", label: bt("booking.email"), type: "email" })}
            {field({ k: "city", label: bt("booking.city") })}
            {field({ k: "district", label: bt("booking.district") })}
            {field({ k: "address", label: bt("booking.address"), textarea: true })}
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {field({ k: "type", label: bt("booking.type"), options: programTypes })}
            {field({ k: "date", label: bt("booking.date"), type: "date" })}
            {field({ k: "time", label: bt("booking.time"), type: "time" })}
            {field({ k: "duration", label: bt("booking.duration") })}
            {field({ k: "venue", label: bt("booking.venue") })}
            {field({ k: "audience", label: bt("booking.audience"), type: "number" })}
            {field({ k: "special", label: bt("booking.special"), textarea: true })}
            {field({ k: "message", label: bt("booking.message"), textarea: true })}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {!bookingId ? (
              <>
                {(
                  [
                    [
                      "booking.customerDetails",
                      [
                        ["booking.name", form.name],
                        ["booking.mobile", form.mobile],
                        ["booking.whatsapp", form.whatsapp],
                        ["booking.email", form.email],
                        ["booking.city", form.city],
                        ["booking.district", form.district],
                        ["booking.address", form.address],
                      ],
                    ],
                    [
                      "booking.programDetails",
                      [
                        ["booking.type", form.type],
                        ["booking.date", form.date],
                        ["booking.time", form.time],
                        ["booking.duration", form.duration],
                        ["booking.venue", form.venue],
                        ["booking.audience", form.audience],
                        ["booking.special", form.special],
                        ["booking.message", form.message],
                      ],
                    ],
                  ] as const
                ).map(([heading, rows]) => (
                  <div key={heading}>
                    <h3 className="mb-2 text-sm font-bold tracking-wide uppercase text-muted-foreground">
                      {bt(heading)}
                    </h3>
                    <dl className="grid gap-3 sm:grid-cols-2">
                      {rows.map(([k, v]) => (
                        <div key={k} className="rounded-lg border border-border bg-surface px-3 py-2">
                          <dt className="text-[11px] text-muted-foreground">{bt(k)}</dt>
                          <dd className="text-sm font-semibold break-words">{v || "—"}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="text-sm font-semibold text-primary underline-offset-4 hover:underline dark:text-gold"
                >
                  {bt("booking.edit")}
                </button>
              </>
            ) : (
              <div className="rounded-xl border border-success/40 bg-success/10 p-5">
                <p className="text-base font-bold text-success">{bt("booking.success")}</p>
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      ["booking.id", bookingId],
                      ["booking.name", form.name],
                      ["booking.type", form.type],
                      ["booking.date", form.date],
                      ["booking.venue", form.venue],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k} className="rounded-lg border border-border bg-card px-3 py-2">
                      <dt className="text-[11px] text-muted-foreground">{bt(k)}</dt>
                      <dd className="text-sm font-semibold break-words">{v || "—"}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 inline-flex rounded-full bg-warning/20 px-4 py-1.5 text-sm font-semibold text-warning">
                  {bt("booking.reqStatus")}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">{bt("booking.reqNote")}</p>
              </div>
            )}
          </div>
        )}


        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold disabled:opacity-40"
          >
            <ChevronLeft className="size-4" aria-hidden /> {bt("common.back")}
          </button>
          {step < 2 ? (
            <button
              type="button"
              onClick={() => {
                if (validate(step === 0 ? step1Schema : step2Schema)) setStep((s) => s + 1);
              }}
              className="inline-flex items-center gap-1.5 rounded-full brand-gradient px-5 py-2 text-sm font-bold text-primary-foreground"
            >
              {bt("common.next")} <ChevronRight className="size-4" aria-hidden />
            </button>
          ) : (
            !bookingId && (
              <button
                type="button"
                onClick={() => {
                  const id = genBookingId();
                  setBookingId(id);
                  toast.success(`${bt("booking.success")} — ${id}`);
                }}
                className="rounded-full brand-gradient px-5 py-2 text-sm font-bold text-primary-foreground"
              >
                {bt("booking.submitBtn")}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
