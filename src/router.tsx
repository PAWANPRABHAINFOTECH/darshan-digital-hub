import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// A page left open across a new deploy points at old, now-deleted chunk files.
// Reload once so the browser picks up the fresh build instead of showing a blank screen.
if (typeof window !== "undefined") {
  const RELOAD_KEY = "dps-chunk-reload";
  const recover = () => {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) ?? 0);
    if (Date.now() - last < 30000) return;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
    window.location.reload();
  };
  window.addEventListener("vite:preloadError", (event) => {
    event.preventDefault();
    recover();
  });
  window.addEventListener("unhandledrejection", (event) => {
    const message = String((event.reason as Error | undefined)?.message ?? "");
    if (message.includes("Failed to fetch dynamically imported module")) recover();
  });
}

export const getRouter = () => {

  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
