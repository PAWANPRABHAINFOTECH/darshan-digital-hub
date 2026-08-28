import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarDays, Clock, Facebook, MapPin, PlayCircle, Youtube } from "lucide-react";
import { liveConfig, siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/layout/SiteLayout";

export function LiveDarshan() {
  const { t } = useI18n();
  const [tab, setTab] = useState<"youtube" | "facebook">(liveConfig.platform);
  const [playing, setPlaying] = useState(false);

  const ytEmbed = siteConfig.youtubeLiveEmbedUrl;
  const fbEmbed = siteConfig.facebookLiveEmbedUrl;

  return (
    <section className="section-pad bg-surface" id="live">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading eyebrow="Live" title={t("live.title")} />

        <div
          className="mb-4 flex justify-center gap-2"
          role="tablist"
          aria-label={t("live.title")}
        >
          <button
            role="tab"
            aria-selected={tab === "youtube"}
            onClick={() => {
              setTab("youtube");
              setPlaying(false);
            }}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              tab === "youtube"
                ? "bg-live text-live-foreground"
                : "border border-border hover:bg-accent"
            }`}
          >
            <Youtube className="size-4" aria-hidden /> {t("live.youtube")}
          </button>
          <button
            role="tab"
            aria-selected={tab === "facebook"}
            onClick={() => {
              setTab("facebook");
              setPlaying(false);
            }}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              tab === "facebook"
                ? "bg-primary text-primary-foreground"
                : "border border-border hover:bg-accent"
            }`}
          >
            <Facebook className="size-4" aria-hidden /> {t("live.facebook")}
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gold/40 bg-card shadow-elegant">
          <div className="relative aspect-video w-full hero-surface">
            {tab === "youtube" && liveConfig.isLive && ytEmbed && playing ? (
              <iframe
                src={`${ytEmbed}&autoplay=1`}
                title={t("live.youtube")}
                allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="size-full"
              />
            ) : tab === "facebook" && liveConfig.isLive && fbEmbed && playing ? (
              <iframe
                src={fbEmbed}
                title={t("live.facebook")}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="size-full"
              />
            ) : (
              <div className="flex size-full flex-col items-center justify-center gap-4 p-6 text-center">
                {liveConfig.isLive && (tab === "youtube" ? ytEmbed : fbEmbed) ? (
                  <button
                    onClick={() => setPlaying(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-live px-6 py-3 text-sm font-bold text-live-foreground"
                  >
                    <PlayCircle className="size-5" aria-hidden /> {t("live.watch")}
                  </button>
                ) : (
                  <>
                    <p className="font-display text-lg">{t("live.none")}</p>
                    {tab === "facebook" && (
                      <a
                        href={siteConfig.facebookUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-primary underline-offset-4 hover:underline dark:text-gold"
                      >
                        {t("live.fbFallback")}
                      </a>
                    )}
                    <Link
                      to="/programs"
                      className="rounded-full border border-gold px-5 py-2 text-sm font-semibold text-primary dark:text-gold"
                    >
                      {t("live.nextCta")}
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="grid gap-4 border-t border-border p-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
                  liveConfig.isLive
                    ? "bg-live text-live-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {liveConfig.isLive && (
                  <span className="live-dot size-2 rounded-full bg-live-foreground" aria-hidden />
                )}
                {liveConfig.isLive ? t("live.now") : t("live.next")}
              </p>
              <h3 className="mt-2 text-lg">{liveConfig.programName}</h3>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                <li className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4" aria-hidden /> {liveConfig.venue}
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-4" aria-hidden /> {liveConfig.date}
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Clock className="size-4" aria-hidden /> {liveConfig.time}
                </li>
              </ul>
            </div>
            <a
              href={tab === "facebook" ? siteConfig.facebookUrl : siteConfig.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full brand-gradient px-5 py-2.5 text-sm font-bold text-primary-foreground"
            >
              <PlayCircle className="size-4" aria-hidden /> {t("live.watch")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
