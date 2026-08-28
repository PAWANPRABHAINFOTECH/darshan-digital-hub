import { useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Check, ChevronLeft, ChevronRight, UploadCloud } from "lucide-react";
import { programTypes, siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import { PaymentModal } from "@/components/payment/PaymentModal";
import { Receipt } from "@/components/booking/Receipt";

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
  type: programTypes[0],
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

type PayType = "token" | "advance" | "full";
type PayStatus = "none" | "pending" | "verification" | "approved" | "rejected";

export function BookingWizard() {
  const { bookingLang, setBookingLang, bt } = useI18n();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [payType, setPayType] = useState<PayType>("token");
  const [payOpen, setPayOpen] = useState(false);
  const [payStatus, setPayStatus] = useState<PayStatus>("none");
  const [proof, setProof] = useState({ txn: "", amount: "", method: "UPI", date: "", file: "" });

  const amounts = siteConfig.payment;
  const amount = useMemo(
    () =>
      payType === "token"
        ? amounts.tokenAmount
        : payType === "advance"
          ? amounts.advanceAmount
          : amounts.fullAmount,
    [payType, amounts],
  );

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

  const Field = ({
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
            <Field k="name" label={bt("booking.name")} />
            <Field k="mobile" label={bt("booking.mobile")} type="tel" />
            <Field k="whatsapp" label={bt("booking.whatsapp")} type="tel" />
            <Field k="email" label={bt("booking.email")} type="email" />
            <Field k="city" label={bt("booking.city")} />
            <Field k="district" label={bt("booking.district")} />
            <Field k="address" label={bt("booking.address")} textarea />
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field k="type" label={bt("booking.type")} options={programTypes} />
            <Field k="date" label={bt("booking.date")} type="date" />
            <Field k="time" label={bt("booking.time")} type="time" />
            <Field k="duration" label={bt("booking.duration")} />
            <Field k="venue" label={bt("booking.venue")} />
            <Field k="audience" label={bt("booking.audience")} type="number" />
            <Field k="special" label={bt("booking.special")} textarea />
            <Field k="message" label={bt("booking.message")} textarea />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <dl className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  ["booking.name", form.name],
                  ["booking.mobile", form.mobile],
                  ["booking.whatsapp", form.whatsapp],
                  ["booking.email", form.email],
                  ["booking.city", form.city],
                  ["booking.district", form.district],
                  ["booking.type", form.type],
                  ["booking.date", form.date],
                  ["booking.time", form.time],
                  ["booking.duration", form.duration],
                  ["booking.venue", form.venue],
                  ["booking.audience", form.audience],
                  ["booking.special", form.special],
                  ["booking.message", form.message],
                ] as const
              )
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-border bg-surface px-3 py-2">
                    <dt className="text-[11px] text-muted-foreground">{bt(k)}</dt>
                    <dd className="text-sm font-semibold break-words">{v}</dd>
                  </div>
                ))}
            </dl>

            {bookingId && (
              <p className="rounded-lg bg-success/15 px-4 py-3 text-sm font-semibold text-success">
                {bt("booking.success")} — {bt("booking.id")}: {bookingId}
              </p>
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
                  setProof((p) => ({ ...p, amount: String(amount) }));
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

      {bookingId && (
        <>
          <section className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-xl">{bt("pay.title")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {bt("pay.total")}: ₹{amounts.fullAmount.toLocaleString("en-IN")}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {(
                [
                  ["token", bt("pay.token"), amounts.tokenAmount],
                  ["advance", bt("pay.advance"), amounts.advanceAmount],
                  ["full", bt("pay.full"), amounts.fullAmount],
                ] as const
              ).map(([key, label, amt]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPayType(key)}
                  aria-pressed={payType === key}
                  className={`rounded-xl border p-4 text-left transition-colors ${
                    payType === key ? "border-gold bg-accent" : "border-border hover:bg-accent/60"
                  }`}
                >
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="mt-1 block font-display text-lg gold-text">
                    ₹{amt.toLocaleString("en-IN")}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPayOpen(true)}
              className="mt-5 rounded-full brand-gradient px-6 py-3 text-sm font-bold text-primary-foreground"
            >
              {bt("pay.secure")} — ₹{amount.toLocaleString("en-IN")}
            </button>
          </section>

          <section className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-xl">{bt("pay.proofTitle")}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="p-id">
                  {bt("pay.bookingId")}
                </label>
                <input
                  id="p-id"
                  value={bookingId}
                  readOnly
                  className="w-full rounded-lg border border-input bg-surface px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="p-txn">
                  {bt("pay.txnId")}
                </label>
                <input
                  id="p-txn"
                  value={proof.txn}
                  onChange={(e) => setProof({ ...proof, txn: e.target.value })}
                  className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="p-amt">
                  {bt("pay.amount")}
                </label>
                <input
                  id="p-amt"
                  type="number"
                  value={proof.amount}
                  onChange={(e) => setProof({ ...proof, amount: e.target.value })}
                  className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="p-method">
                  {bt("pay.method")}
                </label>
                <select
                  id="p-method"
                  value={proof.method}
                  onChange={(e) => setProof({ ...proof, method: e.target.value })}
                  className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
                >
                  <option>UPI</option>
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="p-date">
                  {bt("pay.date")}
                </label>
                <input
                  id="p-date"
                  type="date"
                  value={proof.date}
                  onChange={(e) => setProof({ ...proof, date: e.target.value })}
                  className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="p-file">
                  {bt("pay.upload")}
                </label>
                <label
                  htmlFor="p-file"
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-sm text-muted-foreground"
                >
                  <UploadCloud className="size-4" aria-hidden />
                  <span className="truncate">{proof.file || "JPG / PNG / WEBP / PDF"}</span>
                </label>
                <input
                  id="p-file"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  className="sr-only"
                  onChange={(e) => setProof({ ...proof, file: e.target.files?.[0]?.name ?? "" })}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (!proof.txn) {
                  toast.error(bt("common.required"));
                  return;
                }
                setPayStatus("verification");
                toast.success(bt("pay.pending"));
              }}
              className="mt-5 rounded-full brand-gradient px-6 py-3 text-sm font-bold text-primary-foreground"
            >
              {bt("pay.proofBtn")}
            </button>

            {payStatus !== "none" && (
              <div className="mt-5 space-y-3">
                <p className="inline-flex items-center gap-2 rounded-full bg-warning/20 px-4 py-2 text-sm font-semibold text-warning">
                  <span className="size-2 rounded-full bg-warning" aria-hidden />
                  {payStatus === "approved" ? bt("pay.approved") : bt("pay.pending")}
                </p>
                <p className="text-xs text-muted-foreground">{bt("pay.notice")}</p>
                {payStatus === "approved" && (
                  <Receipt
                    bookingId={bookingId}
                    name={form.name}
                    mobile={form.mobile}
                    program={form.type}
                    payType={payType}
                    amount={Number(proof.amount || amount)}
                    txn={proof.txn}
                    date={proof.date}
                  />
                )}
              </div>
            )}
          </section>
        </>
      )}

      <PaymentModal open={payOpen} onOpenChange={setPayOpen} amount={amount} />
    </div>
  );
}
