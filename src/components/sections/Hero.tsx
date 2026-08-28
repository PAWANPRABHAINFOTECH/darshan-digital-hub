import { Link } from "@tanstack/react-router";
import { BookOpen, PlayCircle, Video } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";

export function Hero() {
  const { t } = useI18n();
  return (
    <section className="mandala-veil hero-surface relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:py-24">
        <div className="float-slow mx-auto w-fit rounded-full border border-gold/50 bg-card/60 p-2 shadow-soft backdrop-blur">
          <Logo size={72} />
        </div>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-card/70 px-4 py-1.5 text-xs font-medium backdrop-blur">
          <span className="live-dot size-2 rounded-full bg-live" aria-hidden />
          {siteConfig.tagline}
        </p>
        <h1 className="mx-auto mt-6 max-w-4xl text-3xl leading-tight sm:text-5xl md:text-6xl">
          <span className="gold-text">{t("hero.title")}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-sm text-muted-foreground sm:text-base">
          {t("hero.sub")}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            to="/live"
            className="inline-flex items-center gap-2 rounded-full bg-live px-6 py-3 text-sm font-bold text-live-foreground shadow-elegant transition-transform hover:scale-[1.03]"
          >
            <PlayCircle className="size-5" aria-hidden /> {t("hero.cta1")}
          </Link>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-bold text-primary-foreground shadow-elegant transition-transform hover:scale-[1.03]"
          >
            <BookOpen className="size-5" aria-hidden /> {t("hero.cta2")}
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-gold px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-accent dark:text-gold"
          >
            <Video className="size-5" aria-hidden /> {t("hero.cta3")}
          </Link>
        </div>
      </div>
    </section>
  );
}
