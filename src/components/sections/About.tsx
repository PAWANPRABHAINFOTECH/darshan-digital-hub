import { Logo } from "@/components/brand/Logo";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/layout/SiteLayout";

export function About() {
  const { t } = useI18n();
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeading eyebrow="About" title={t("about.title")} />
        <div className="mandala-veil relative overflow-hidden rounded-3xl border border-gold/40 bg-card p-8 text-center shadow-elegant">
          <Logo size={64} className="mx-auto" />
          <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
            {t("about.text")}
          </p>
          <p className="mt-6 inline-block rounded-full border border-gold/50 px-4 py-2 text-xs font-semibold text-saffron sm:text-sm">
            {t("about.highlight")}
          </p>
          <p className="mt-5 font-display text-lg gold-text">“संतों का संग और सत्संग”</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {siteConfig.phone1} | {siteConfig.phone2}
          </p>
        </div>
      </div>
    </section>
  );
}
