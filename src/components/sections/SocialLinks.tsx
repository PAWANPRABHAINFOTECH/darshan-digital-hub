import { Facebook, Instagram, Youtube } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/layout/SiteLayout";

export function SocialLinks() {
  const { t } = useI18n();
  const links = [
    { href: siteConfig.youtubeUrl, icon: Youtube, label: "YouTube", handle: siteConfig.youtubeChannelHandle },
    { href: siteConfig.facebookUrl, icon: Facebook, label: "Facebook", handle: siteConfig.brandName },
    { href: siteConfig.instagramUrl, icon: Instagram, label: "Instagram", handle: "@dpsdarshan" },
  ];

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading eyebrow="Social" title={t("social.title")} />
        <div className="grid gap-4 sm:grid-cols-3">
          {links.map(({ href, icon: Icon, label, handle }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft transition-transform hover:-translate-y-1"
            >
              <span className="grid size-11 place-items-center rounded-xl gold-gradient text-gold-foreground">
                <Icon className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-semibold">{label}</span>
                <span className="block text-xs text-muted-foreground">{handle}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
