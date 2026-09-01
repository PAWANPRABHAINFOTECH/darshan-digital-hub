import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { advertisements, upcomingPrograms, type ProgramItem } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import { EmptyState, SectionHeading } from "@/components/layout/SiteLayout";

function AdSlider() {
  const { t } = useI18n();
  const now = Date.now();
  const slides = advertisements
    .filter((a) => a.active)
    .filter((a) => {
      const startOk = !a.startDate || new Date(a.startDate).getTime() <= now;
      const endOk = !a.endDate || new Date(a.endDate).getTime() >= now;
      return startOk && endOk;
    })
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  const slide = slides[index] ?? slides[0];
  if (!slide) return <EmptyState text={t("ads.empty")} />;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-video w-full bg-surface">
        {slide.image && (
          <img
            src={slide.image}
            alt={slide.title}
            loading="lazy"
            decoding="async"
            className="size-full object-contain"
          />
        )}
        <button
          type="button"
          aria-label="Previous"
          onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
          className="absolute top-1/2 left-2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-background/80"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => setIndex((i) => (i + 1) % slides.length)}
          className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-background/80"
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-base">{slide.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{slide.description}</p>
        <div className="mt-3 flex gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-saffron" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProgramCard({ program }: { program: ProgramItem }) {
  const { t } = useI18n();
  return (
    <article className="flex min-w-[85%] snap-start flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft sm:min-w-0">
      <div className="relative aspect-video w-full hero-surface">
        {program.image ? (
          <img
            src={program.image}
            alt={program.name}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        ) : (
          <div className="mandala-veil grid size-full place-items-center">
            <span className="font-display text-2xl gold-text">{program.type}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base">{program.name}</h3>
        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
          <li className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" aria-hidden /> {program.date}
          </li>
          <li className="flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden /> {program.time}
          </li>
          <li className="flex items-center gap-1.5">
            <MapPin className="size-3.5" aria-hidden /> {program.venue}
          </li>
        </ul>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{program.description}</p>
        <div className="mt-4 flex gap-2">
          <Link
            to="/programs"
            className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-accent"
          >
            {t("common.viewDetails")}
          </Link>
          <Link
            to="/booking"
            className="rounded-full brand-gradient px-3 py-1.5 text-xs font-semibold text-primary-foreground"
          >
            {t("common.bookEnquiry")}
          </Link>
        </div>
      </div>
    </article>
  );
}

export function AdsAndPrograms() {
  const { t } = useI18n();
  return (
    <section className="section-pad">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Sponsored" title={t("ads.title")} />
          <AdSlider />
        </div>
        <div>
          <SectionHeading eyebrow="Calendar" title={t("programs.title")} />
          <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-1 sm:overflow-visible">
            {upcomingPrograms.slice(0, 3).map((p) => (
              <ProgramCard key={p.id} program={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
