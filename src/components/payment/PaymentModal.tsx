import { useState } from "react";
import { Copy, Check, QrCode, ShieldCheck, Share2 } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function CopyRow({ label, value, action }: { label: string; value: string; action: string }) {
  const { bt } = useI18n();
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2">
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold">{value}</p>
      </div>
      <button
        type="button"
        aria-label={action}
        onClick={() => {
          navigator.clipboard?.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        }}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-accent"
      >
        {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
        {copied ? bt("common.copied") : bt("common.copy")}
      </button>
    </div>
  );
}

export function PaymentModal({
  open,
  onOpenChange,
  amount,
  qr,
  donation = false,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  amount?: number;
  qr?: string | null;
  donation?: boolean;
}) {
  const { bt } = useI18n();
  const qrSrc = qr ?? (donation ? siteConfig.donationQr : siteConfig.paymentQr);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2.5">
            <Logo size={36} />
            <span className="font-display">{siteConfig.brandName}</span>
          </DialogTitle>
        </DialogHeader>

        <p className="inline-flex items-center gap-2 self-start rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
          <ShieldCheck className="size-4" aria-hidden /> {bt("pay.secure")}
        </p>

        {typeof amount === "number" && (
          <p className="text-sm">
            {bt("pay.amount")}:{" "}
            <span className="font-display text-xl gold-text">₹{amount.toLocaleString("en-IN")}</span>
          </p>
        )}

        <div className="grid place-items-center rounded-xl border border-dashed border-border bg-surface p-5">
          {qrSrc ? (
            <img
              src={qrSrc}
              alt="Payment QR"
              width={220}
              height={220}
              loading="lazy"
              decoding="async"
              className="size-[220px] object-contain"
            />
          ) : (
            <div className="text-center text-xs text-muted-foreground">
              <QrCode className="mx-auto mb-2 size-10" aria-hidden />
              {bt("pay.qrPending")}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <CopyRow label={bt("pay.upi")} value={siteConfig.upiId} action={bt("pay.copyUpi")} />
          <p className="pt-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {bt("pay.bank")}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg border border-border px-3 py-2">
              <p className="text-[11px] text-muted-foreground">{bt("pay.accountName")}</p>
              <p className="text-sm font-semibold">{siteConfig.accountName}</p>
            </div>
            <div className="rounded-lg border border-border px-3 py-2">
              <p className="text-[11px] text-muted-foreground">{bt("pay.bankName")}</p>
              <p className="text-sm font-semibold">{siteConfig.bankName}</p>
            </div>
            <div className="rounded-lg border border-border px-3 py-2">
              <p className="text-[11px] text-muted-foreground">{bt("pay.ifsc")}</p>
              <p className="text-sm font-semibold">{siteConfig.ifsc}</p>
            </div>
            <div className="rounded-lg border border-border px-3 py-2">
              <p className="text-[11px] text-muted-foreground">{bt("pay.branch")}</p>
              <p className="text-sm font-semibold">{siteConfig.branch}</p>
            </div>
          </div>
          <CopyRow
            label={bt("pay.accountNumber")}
            value={siteConfig.accountNumber}
            action={bt("pay.copyAccount")}
          />
        </div>

        <button
          type="button"
          onClick={() => {
            const text = `${siteConfig.brandName} — ${bt("pay.upi")}: ${siteConfig.upiId}`;
            if (navigator.share) navigator.share({ title: siteConfig.brandName, text }).catch(() => {});
            else navigator.clipboard?.writeText(text);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-accent"
        >
          <Share2 className="size-4" aria-hidden /> {bt("common.share")}
        </button>

        <p className="text-xs text-muted-foreground">{bt("pay.notice")}</p>
      </DialogContent>
    </Dialog>
  );
}
