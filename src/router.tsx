import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// A page left open across a new deploy points at old, now-deleted chunk files.
// Reload once so the browser picks up the fresh build instead of showing a blank screen.
if (typeof window !== "undefined") {
  const RELOAD_KEY = "dps-chunk-reload";
  const recover = () => {
    if (sessionStorage.getItem(RELOAD_KEY)) return;
    sessionStorage.setItem(RELOAD_KEY, "1");
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
  window.addEventListener("load", () => sessionStorage.removeItem(RELOAD_KEY));
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
