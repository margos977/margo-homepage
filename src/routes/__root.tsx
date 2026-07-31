/// <reference types="vite/client" />
import {
  HeadContent,
  Scripts,
  createRootRoute,
  useLocation,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ConsoleLayout } from "@/components/console-layout";
import { about, person } from "@/data/site";
import appCss from "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${person.name} · ${person.role}` },
      {
        name: "description",
        content: about.firstSentence,
      },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const location = useLocation();
  const sidebar = !location.pathname.startsWith("/case-studies/");

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ConsoleLayout sidebar={sidebar}>{children}</ConsoleLayout>
        <Scripts />
      </body>
    </html>
  );
}
