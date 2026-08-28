import { MessageCircle, Phone } from "lucide-react";
import { siteConfig, telHref, waHref } from "@/config/site";

export function TopStrip() {
  return (
    <div className="border-b border-border/60 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1.5 text-xs">
        <p className="truncate text-primary-foreground/90">{siteConfig.tagline}</p>
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={telHref(siteConfig.phone1)}
            className="hidden items-center gap-1 hover:text-gold sm:flex"
          >
            <Phone className="size-3.5" aria-hidden /> {siteConfig.phone1}
          </a>
          <a
            href={telHref(siteConfig.phone2)}
            className="hidden items-center gap-1 hover:text-gold md:flex"
          >
            <Phone className="size-3.5" aria-hidden /> {siteConfig.phone2}
          </a>
          <a
            href={waHref(siteConfig.whatsapp)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 font-medium text-gold-foreground"
          >
            <MessageCircle className="size-3.5" aria-hidden /> Chat
          </a>
        </div>
      </div>
    </div>
  );
}
