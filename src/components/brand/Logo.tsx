import { useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Renders the official uploaded DPS DARSHAN logo (aspect ratio preserved).
 * Until the admin logo file exists, a lightweight CSS wordmark is shown —
 * no image is generated for this.
 */
export function Logo({ size = 44, className }: { size?: number; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed || !siteConfig.logo) {
    return (
      <span
        aria-label={siteConfig.brandName}
        role="img"
        className={cn(
          "grid shrink-0 place-items-center rounded-full brand-gradient font-display text-primary-foreground shadow-soft ring-2 ring-gold/60",
          className,
        )}
        style={{ width: size, height: size, fontSize: size * 0.42 }}
      >
        ॐ
      </span>
    );
  }

  return (
    <img
      src={siteConfig.logo}
      alt={`${siteConfig.brandName} logo`}
      width={size}
      height={size}
      loading="eager"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("shrink-0 rounded-full object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
}

export function LogoLockup({ size = 42 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <Logo size={size} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg tracking-wide text-primary dark:text-gold">
          {siteConfig.brandName}
        </span>
        <span className="mt-1 hidden text-[10px] text-muted-foreground sm:block">
          {siteConfig.tagline}
        </span>
      </span>
    </span>
  );
}
