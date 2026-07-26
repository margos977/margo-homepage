import { useLocation } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { indexNav, findMe, status } from "@/data/site";

export function ConsoleNav() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    if (!isHome) return;

    const sections = indexNav
      .map((item) => document.getElementById(item.href.replace("#", "")))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <nav className="flex w-full shrink-0 flex-col gap-10 px-6 py-10 md:sticky md:top-0 md:h-screen md:w-[280px] md:overflow-y-auto md:px-10">
      <NavSection label="Index" showDivider>
        <ul className="-mx-1.5 flex flex-col gap-2">
          {indexNav.map((item) => {
            const href = isHome ? item.href : `/${item.href}`;
            const active = isHome && activeHash === item.href;
            return (
              <li key={item.href}>
                <a
                  href={href}
                  onClick={(event) => {
                    if (!isHome) return;
                    const id = item.href.replace("#", "");
                    const target = document.getElementById(id);
                    if (target) {
                      event.preventDefault();
                      target.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={
                    active
                      ? "marker-highlight inline-block px-1.5 leading-none"
                      : "inline-block px-1.5 leading-none text-ink hover:underline"
                  }
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </NavSection>

      <NavSection label="Find Me">
        <ul className="flex flex-col gap-2">
          {findMe.map((item) => {
            const external = item.href.startsWith("http");
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="inline-block leading-none text-rust underline underline-offset-2"
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </NavSection>

      <NavSection label="Status">
        <p className="opacity-80">{status}</p>
      </NavSection>
    </nav>
  );
}

function NavSection({
  label,
  showDivider = false,
  children,
}: {
  label: string;
  showDivider?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <p
        className={
          showDivider
            ? "label-mono mb-3 border-b border-hairline pb-3 opacity-60"
            : "label-mono mb-3 opacity-60"
        }
      >
        / {label.toUpperCase()}
      </p>
      {children}
    </div>
  );
}
