/**
 * BROADCAST SCHEDULE — DPS DARSHAN
 * Single place to update live timings. Each entry drives BOTH the schedule
 * list and the player: while `now` is between start and end, that entry is
 * live and its stream is embedded automatically.
 *
 * start/end use ISO date-time with the +05:30 (IST) offset.
 */

export type Broadcast = {
  id: string;
  name: string;
  type: string;
  venue: string;
  /** ISO datetime with IST offset, e.g. "2026-09-12T18:30:00+05:30" */
  start: string;
  /** ISO datetime with IST offset */
  end: string;
  platform: "youtube" | "facebook" | "both";
  /** YouTube video / stream id (11 chars). Empty → falls back to channel live. */
  youtubeVideoId?: string;
  /** Full Facebook video permalink used for the Facebook player. */
  facebookVideoUrl?: string;
};

/** Official channel id (UC...) — enables the "whatever is live now" embed. */
export const youtubeChannelId = "";

export const broadcasts: Broadcast[] = [
  {
    id: "b1",
    name: "श्रीमद्भागवत कथा",
    type: "कथा",
    venue: "—",
    start: "2026-09-14T16:00:00+05:30",
    end: "2026-09-14T20:00:00+05:30",
    platform: "both",
    youtubeVideoId: "",
    facebookVideoUrl: "",
  },
  {
    id: "b2",
    name: "सुंदरकांड पाठ",
    type: "पाठ",
    venue: "—",
    start: "2026-09-20T18:30:00+05:30",
    end: "2026-09-20T21:30:00+05:30",
    platform: "youtube",
    youtubeVideoId: "",
  },
  {
    id: "b3",
    name: "खाटूश्याम भजन संध्या",
    type: "भजन",
    venue: "—",
    start: "2026-09-27T19:00:00+05:30",
    end: "2026-09-27T23:00:00+05:30",
    platform: "both",
    youtubeVideoId: "",
    facebookVideoUrl: "",
  },
];

const IST = "Asia/Kolkata";

export function formatBroadcastDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN", {
    timeZone: IST,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatBroadcastTime(b: Broadcast, locale: string) {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleTimeString(locale === "hi" ? "hi-IN" : "en-IN", {
      timeZone: IST,
      hour: "numeric",
      minute: "2-digit",
    });
  return `${fmt(b.start)} – ${fmt(b.end)}`;
}

export type ScheduleState = {
  live: Broadcast | null;
  next: Broadcast | null;
  upcoming: Broadcast[];
};

/** Pure: given a timestamp, work out what is live and what is coming up. */
export function getScheduleState(nowMs: number, list = broadcasts): ScheduleState {
  const sorted = [...list].sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
  const live = sorted.find((b) => Date.parse(b.start) <= nowMs && nowMs < Date.parse(b.end)) ?? null;
  const upcoming = sorted.filter((b) => Date.parse(b.start) > nowMs);
  return { live, next: upcoming[0] ?? null, upcoming };
}

export function youtubeEmbedFor(b: Broadcast | null) {
  if (b?.youtubeVideoId) return `https://www.youtube.com/embed/${b.youtubeVideoId}?autoplay=1`;
  if (youtubeChannelId)
    return `https://www.youtube.com/embed/live_stream?channel=${youtubeChannelId}&autoplay=1`;
  return "";
}

export function facebookEmbedFor(b: Broadcast | null) {
  if (!b?.facebookVideoUrl) return "";
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    b.facebookVideoUrl,
  )}&autoplay=1`;
}
