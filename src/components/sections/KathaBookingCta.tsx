import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";

export function KathaBookingCta() {
  const { t } = useI18n();
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mandala-veil relative overflow-hidden rounded-3xl brand-gradient p-8 text-center text-primary-foreground shadow-elegant sm:p-12">
          <h2 className="text-2xl sm:text-4xl">{t("booking.ctaTitle")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-primary-foreground/85">
            {t("booking.ctaText")}
          </p>
          <Link
            to="/booking"
            className="mt-7 inline-flex items-center gap-2 rounded-full gold-gradient px-7 py-3 text-sm font-bold text-gold-foreground shadow-elegant transition-transform hover:scale-[1.03]"
          >
            <BookOpen className="size-4" aria-hidden /> {t("booking.ctaBtn")}
          </Link>
        </div>
      </div>
    </section>
  );
}
