import { useState } from "react";
import { Heart } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/layout/SiteLayout";
import { PaymentModal } from "@/components/payment/PaymentModal";

export function Support() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <section className="section-pad bg-surface">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading eyebrow="Seva" title={t("support.title")} />
        <div className="mandala-veil relative overflow-hidden rounded-3xl border border-gold/40 bg-card p-8 text-center shadow-elegant">
          <Heart className="mx-auto size-10 text-live" aria-hidden />
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            {t("support.text")}
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-bold text-primary-foreground shadow-elegant"
          >
            <Heart className="size-4" aria-hidden /> {t("support.btn")}
          </button>
        </div>
      </div>
      <PaymentModal open={open} onOpenChange={setOpen} donation />
    </section>
  );
}
