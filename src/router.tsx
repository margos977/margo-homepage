import { createRouter, ErrorComponent } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { NotFound } from "@/components/not-found";

if (typeof window !== "undefined") {
  window.addEventListener("vite:preloadError", () => {
    // A deploy replaced the JS chunk this page was about to load (stale
    // hashed filename from before the deploy). Reload once to pick up
    // the current build instead of surfacing a raw import error.
    const key = "reloaded-after-preload-error";
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "1");
      window.location.reload();
    }
  });
}

export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultNotFoundComponent: () => <NotFound />,
    defaultErrorComponent: ({ error }) => (
      <RouteErrorFallback error={error} />
    ),
  });

  return router;
}

function RouteErrorFallback({ error }: { error: unknown }) {
  return (
    <div>
      <p className="label-mono opacity-60">/ Something Broke</p>
      <p className="mt-4 max-w-md leading-[1.6]">
        This page hit an error loading. Reloading usually fixes it. The
        site may have just been updated.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="label-mono mt-6 inline-block border border-hairline px-3 py-2 opacity-80 transition-opacity hover:opacity-100"
      >
        Reload
      </button>
      {import.meta.env.DEV && (
        <div className="mt-8">
          <ErrorComponent error={error} />
        </div>
      )}
    </div>
  );
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
