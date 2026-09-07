import { useEffect, useState } from "react";
import { getScheduleState, type ScheduleState } from "@/config/broadcasts";

/**
 * Time-aware schedule state. Starts from a stable SSR value (epoch-free:
 * computed once on mount) and refreshes every 30s so the LIVE badge and
 * player switch on by themselves at the scheduled time.
 */
export function useSchedule(): ScheduleState & { ready: boolean } {
  const [nowMs, setNowMs] = useState<number | null>(null);

  useEffect(() => {
    setNowMs(Date.now());
    const id = setInterval(() => setNowMs(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const state = getScheduleState(nowMs ?? 0);
  if (nowMs === null) {
    // Before hydration: show the schedule, but never claim we are live.
    return { live: null, next: state.upcoming[0] ?? null, upcoming: state.upcoming, ready: false };
  }
  return { ...state, ready: true };
}
