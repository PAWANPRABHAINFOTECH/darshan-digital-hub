import { Link } from "@tanstack/react-router";
import { BookOpen, CalendarDays, Home, Menu, MessageCircle, Phone, Radio } from "lucide-react";
import { siteConfig, telHref, waHref } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";

export function FloatingActions() {
  const { t } = useI18n();
  return (
    <div className="fixed right-4 bottom-20 z-50 flex flex-col gap-2.5 md:bottom-6">
      <a
        href={waHref(siteConfig.whatsapp, "नमस्ते DPS DARSHAN, मुझे जानकारी चाहिए।")}
        target="_blank"
        rel="noreferrer"
        aria-label={t("contact.whatsapp")}
        className="grid size-12 place-items-center rounded-full bg-success text-primary-foreground shadow-elegant transition-transform hover:scale-105"
      >
        <MessageCircle className="size-5" aria-hidden />
      </a>
      <a
        href={telHref(siteConfig.phone1)}
        aria-label={t("contact.callNow")}
        className="grid size-12 place-items-center rounded-full brand-gradient text-primary-foreground shadow-elegant transition-transform hover:scale-105"
      >
        <Phone className="size-5" aria-hidden />
      </a>
    </div>
  );
}

export function MobileBottomNav() {
  const { t } = useI18n();
  const items = [
    { to: "/", icon: Home, label: t("nav.home") },
    { to: "/live", icon: Radio, label: t("nav.live") },
    { to: "/programs", icon: CalendarDays, label: t("nav.programs") },
    { to: "/booking", icon: BookOpen, label: t("nav.booking") },
    { to: "/contact", icon: Menu, label: t("nav.more") },
  ];
  return (
    <nav
      aria-label="Bottom"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur md:hidden"
    >
      <ul className="grid grid-cols-5">
        {items.map(({ to, icon: Icon, label }) => (
          <li key={to}>
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              activeProps={{ className: "text-primary dark:text-gold" }}
              className="flex flex-col items-center gap-0.5 py-2 text-[10px] text-muted-foreground"
            >
              <Icon className="size-5" aria-hidden />
              <span className="truncate">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function BrandBar() {
  const { t } = useI18n();
  return (
    <div className="brand-gradient text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-3 text-sm">
        <span className="font-display text-base tracking-wide">{siteConfig.brandName}</span>
        <a href={telHref(siteConfig.phone1)} className="inline-flex items-center gap-1.5 hover:text-gold">
          <Phone className="size-4" aria-hidden /> {siteConfig.phone1}
        </a>
        <a
          href={waHref(siteConfig.whatsapp)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 font-medium text-gold-foreground"
        >
          <MessageCircle className="size-4" aria-hidden /> {t("common.chat")}
        </a>
      </div>
    </div>
  );
}
