import { Download, Share2 } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";

export function Receipt({
  bookingId,
  name,
  mobile,
  program,
  payType,
  amount,
  txn,
  date,
}: {
  bookingId: string;
  name: string;
  mobile: string;
  program: string;
  payType: "token" | "advance" | "full";
  amount: number;
  txn: string;
  date: string;
}) {
  const { bt } = useI18n();
  const receiptNo = `RCPT-${bookingId.split("-").pop()}`;

  const rows: [string, string][] = [
    [bt("receipt.number"), receiptNo],
    [bt("pay.bookingId"), bookingId],
    [bt("booking.name"), name],
    [bt("booking.mobile"), mobile],
    [bt("booking.type"), program],
    [
      bt("pay.title"),
      payType === "token" ? bt("pay.token") : payType === "advance" ? bt("pay.advance") : bt("pay.full"),
    ],
    [bt("pay.amount"), `₹${amount.toLocaleString("en-IN")}`],
    [bt("pay.txnId"), txn],
    [bt("pay.date"), date],
    [bt("status.title"), bt("pay.approved")],
  ];

  return (
    <div className="rounded-2xl border border-gold/50 bg-card p-6 shadow-elegant print:shadow-none">
      <header className="flex items-center gap-3 border-b border-border pb-4">
        <Logo size={48} />
        <div>
          <p className="font-display text-lg text-primary dark:text-gold">{siteConfig.brandName}</p>
          <p className="text-xs tracking-widest text-muted-foreground uppercase">
            {bt("receipt.title")}
          </p>
        </div>
      </header>
      <dl className="mt-4 grid gap-2 sm:grid-cols-2">
        {rows.map(([k, v]) => (
          <div key={k} className="rounded-lg border border-border bg-surface px-3 py-2">
            <dt className="text-[11px] text-muted-foreground">{k}</dt>
            <dd className="text-sm font-semibold break-words">{v || "—"}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full brand-gradient px-5 py-2.5 text-sm font-bold text-primary-foreground"
        >
          <Download className="size-4" aria-hidden /> {bt("common.download")}
        </button>
        <button
          type="button"
          onClick={() => {
            const text = `${siteConfig.brandName} ${bt("receipt.title")} — ${receiptNo} / ${bookingId}`;
            if (navigator.share) navigator.share({ title: siteConfig.brandName, text }).catch(() => {});
            else navigator.clipboard?.writeText(text);
          }}
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-accent"
        >
          <Share2 className="size-4" aria-hidden /> {bt("common.share")}
        </button>
      </div>
    </div>
  );
}
