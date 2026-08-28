import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { featuredVideos, siteConfig, ytThumb, type VideoItem } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import { EmptyState, SectionHeading } from "@/components/layout/SiteLayout";

function VideoCard({ video }: { video: VideoItem }) {
  const { t } = useI18n();
  const [active, setActive] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="relative aspect-video w-full bg-surface">
        {active ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={`${t("common.watch")}: ${video.title}`}
            className="group relative size-full"
          >
            <img
              src={ytThumb(video.id)}
              alt={video.title}
              width={480}
              height={270}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
            <span className="absolute inset-0 grid place-items-center bg-foreground/20 transition-colors group-hover:bg-foreground/35">
              <PlayCircle className="size-14 text-live" aria-hidden />
            </span>
          </button>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold tracking-wide text-saffron uppercase">
          {video.category}
        </p>
        <h3 className="mt-1 line-clamp-2 text-base">{video.title}</h3>
        {video.date && <p className="mt-1 text-xs text-muted-foreground">{video.date}</p>}
        <button
          type="button"
          onClick={() => setActive(true)}
          className="mt-3 rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-accent"
        >
          {t("common.watch")}
        </button>
      </div>
    </article>
  );
}

export function FeaturedVideos({ limit = 8 }: { limit?: number }) {
  const { t } = useI18n();
  const videos = featuredVideos.slice(0, limit);

  return (
    <section className="section-pad bg-surface">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="YouTube" title={t("videos.title")} />
        {videos.length === 0 ? (
          <EmptyState text={t("videos.empty")} />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <a
            href={siteConfig.youtubePlaylistUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-bold text-primary-foreground shadow-elegant"
          >
            {t("videos.more")}
          </a>
        </div>
      </div>
    </section>
  );
}
