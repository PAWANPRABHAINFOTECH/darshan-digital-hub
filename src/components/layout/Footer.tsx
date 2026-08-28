import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Phone, Youtube } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { siteConfig, telHref } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";

const quick: { to: string; key: TranslationKey }[] = [
  { to: "/", key: "nav.home" },
  { to: "/live", key: "nav.live" },
  { to: "/programs", key: "nav.programs" },
  { to: "/booking", key: "nav.booking" },
  { to: "/videos", key: "nav.videos" },
  { to: "/gallery", key: "nav.gallery" },
  { to: "/contact", key: "nav.contact" },
];

const serviceKeys: TranslationKey[] = [
  "services.ytLive",
  "services.fbLive",
  "services.hd",
  "services.multicam",
];

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-8 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo size={44} />
            <span className="font-display text-lg text-primary dark:text-gold">
              {siteConfig.brandName}
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{siteConfig.tagline}</p>
          <p className="mt-2 text-sm text-muted-foreground">{t("footer.desc")}</p>
        </div>

        <div>
          <h3 className="font-display text-base">{t("footer.quick")}</h3>
          <ul className="mt-3 space-y-1.5 text-sm">
            {quick.map((q) => (
              <li key={q.to}>
                <Link to={q.to} className="text-muted-foreground hover:text-primary dark:hover:text-gold">
                  {t(q.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base">{t("footer.services")}</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {serviceKeys.map((k) => (
              <li key={k}>{t(k)}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base">{t("footer.connect")}</h3>
          <div className="mt-3 flex gap-2">
            <a
              href={siteConfig.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="grid size-9 place-items-center rounded-full border border-border hover:bg-accent"
            >
              <Youtube className="size-4" aria-hidden />
            </a>
            <a
              href={siteConfig.facebookUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid size-9 place-items-center rounded-full border border-border hover:bg-accent"
            >
              <Facebook className="size-4" aria-hidden />
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid size-9 place-items-center rounded-full border border-border hover:bg-accent"
            >
              <Instagram className="size-4" aria-hidden />
            </a>
          </div>
          <h3 className="mt-5 font-display text-base">{t("footer.contact")}</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {[siteConfig.phone1, siteConfig.phone2].map((p) => (
              <li key={p}>
                <a
                  href={telHref(p)}
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary dark:hover:text-gold"
                >
                  <Phone className="size-3.5" aria-hidden /> {p}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        {t("footer.rights")}
      </div>
    </footer>
  );
}
