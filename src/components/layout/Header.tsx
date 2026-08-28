import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, Phone, Radio, X } from "lucide-react";
import { LogoLockup } from "@/components/brand/Logo";
import { LanguageSelect, ThemeToggle } from "./LanguageThemeControls";
import { siteConfig, telHref, waHref } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";

export const navItems: { to: string; key: TranslationKey }[] = [
  { to: "/", key: "nav.home" },
  { to: "/live", key: "nav.live" },
  { to: "/programs", key: "nav.programs" },
  { to: "/booking", key: "nav.booking" },
  { to: "/videos", key: "nav.videos" },
  { to: "/gallery", key: "nav.gallery" },
  { to: "/services", key: "nav.services" },
  { to: "/support", key: "nav.support" },
  { to: "/contact", key: "nav.contact" },
];

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border/70 backdrop-blur-md transition-shadow ${
        scrolled ? "bg-background/90 shadow-soft" : "bg-background/70"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5">
        <Link to="/" aria-label={siteConfig.brandName} onClick={() => setOpen(false)}>
          <LogoLockup />
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-accent text-accent-foreground" }}
              className="rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-2">
          <Link
            to="/live"
            className="inline-flex items-center gap-1.5 rounded-full bg-live px-3 py-1.5 text-xs font-bold text-live-foreground"
          >
            <span className="live-dot size-2 rounded-full bg-live-foreground" aria-hidden />
            {t("common.live")}
          </Link>
          <a
            href={telHref(siteConfig.phone1)}
            aria-label={t("common.call")}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border hover:bg-accent"
          >
            <Phone className="size-4" aria-hidden />
          </a>
          <a
            href={waHref(siteConfig.whatsapp)}
            target="_blank"
            rel="noreferrer"
            aria-label={t("common.chat")}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border hover:bg-accent"
          >
            <MessageCircle className="size-4" aria-hidden />
          </a>
          <LanguageSelect className="hidden sm:inline-flex" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <button
            type="button"
            aria-label={t("nav.menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border xl:hidden"
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background xl:hidden">
          <nav aria-label="Mobile" className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-accent text-accent-foreground" }}
                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 pb-4">
            <LanguageSelect />
            <ThemeToggle />
            <Radio className="ml-auto size-4 text-live" aria-hidden />
          </div>
        </div>
      )}
    </header>
  );
}
