import { Camera, Clapperboard, Facebook, Phone, Radio, Video, Youtube } from "lucide-react";
import { siteConfig, telHref } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/layout/SiteLayout";
import type { TranslationKey } from "@/i18n/translations";

const services: { icon: typeof Youtube; title: TranslationKey; desc: TranslationKey }[] = [
  { icon: Youtube, title: "services.ytLive", desc: "services.ytLiveD" },
  { icon: Facebook, title: "services.fbLive", desc: "services.fbLiveD" },
  { icon: Video, title: "services.hd", desc: "services.hdD" },
  { icon: Clapperboard, title: "services.multicam", desc: "services.multicamD" },
  { icon: Radio, title: "services.combo", desc: "services.comboD" },
  { icon: Camera, title: "services.photo", desc: "services.photoD" },
];

export function Services() {
  const { t } = useI18n();
  return (
    <section className="section-pad bg-surface">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Production" title={t("services.title")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1"
            >
              <span className="grid size-12 place-items-center rounded-xl gold-gradient text-gold-foreground">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg">{t(title)}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{t(desc)}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={telHref(siteConfig.phone1)}
            className="inline-flex items-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-bold text-primary-foreground shadow-elegant"
          >
            <Phone className="size-4" aria-hidden /> {t("services.cta")}
          </a>
          <p className="text-sm text-muted-foreground">
            {siteConfig.phone1} | {siteConfig.phone2}
          </p>
        </div>
      </div>
    </section>
  );
}
