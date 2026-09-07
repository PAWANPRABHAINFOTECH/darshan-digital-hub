import { Link } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin, Radio } from "lucide-react";
import { formatBroadcastDate, formatBroadcastTime } from "@/config/broadcasts";
import { useSchedule } from "@/hooks/use-schedule";
import { useI18n } from "@/i18n/LanguageProvider";
import { EmptyState, SectionHeading } from "@/components/layout/SiteLayout";

export function LiveSchedule() {
  const { t, lang } = useI18n();
  const { live, upcoming } = useSchedule();

  const rows = [...(live ? [live] : []), ...upcoming];

  return (
    <section className="section-pad" id="schedule">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading
          eyebrow="Schedule"
          title={t("live.scheduleTitle")}
          description={t("live.scheduleText")}
        />

        {rows.length === 0 ? (
          <EmptyState text={t("live.scheduleEmpty")} />
        ) : (
          <ul className="grid gap-3">
            {rows.map((r) => {
              const isLive = live?.id === r.id;
              return (
                <li
                  key={r.id}
                  className="grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div>
                    <p className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          isLive
                            ? "bg-live text-live-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {isLive && (
                          <span
                            className="live-dot size-1.5 rounded-full bg-live-foreground"
                            aria-hidden
                          />
                        )}
                        {isLive ? t("live.now") : r.type}
                      </span>
                      <span className="font-display text-base">{r.name}</span>
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                      <li className="inline-flex items-center gap-1.5">
                        <CalendarDays className="size-4" aria-hidden />{" "}
                        {formatBroadcastDate(r.start, lang)}
                      </li>
                      <li className="inline-flex items-center gap-1.5">
                        <Clock className="size-4" aria-hidden /> {formatBroadcastTime(r, lang)}
                      </li>
                      <li className="inline-flex items-center gap-1.5">
                        <MapPin className="size-4" aria-hidden /> {r.venue}
                      </li>
                    </ul>
                  </div>
                  {isLive ? (
                    <a
                      href="#live"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-live px-5 py-2 text-sm font-bold text-live-foreground"
                    >
                      <Radio className="size-4" aria-hidden /> {t("live.watch")}
                    </a>
                  ) : (
                    <Link
                      to="/programs"
                      className="inline-flex items-center justify-center rounded-full border border-gold px-5 py-2 text-sm font-semibold text-primary dark:text-gold"
                    >
                      {t("live.scheduleDetails")}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
