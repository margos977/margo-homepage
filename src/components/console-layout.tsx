import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ConsoleNav } from "@/components/console-nav";
import { person } from "@/data/site";

export function ConsoleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col">
      <header className="w-full px-6 py-10 md:px-10">
        <Link to="/" className="block">
          <h1 className="text-[min(8.2vw,98.4px)] font-normal leading-[0.9] tracking-tight">
            {person.name}
          </h1>
        </Link>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <ConsoleNav />
        <main className="flex-1 px-6 py-12 md:px-12">{children}</main>
      </div>

      <footer className="w-full border-t border-hairline px-6 py-6 md:px-10">
        <p className="label-mono opacity-60">
          © {new Date().getFullYear()} {person.name}
        </p>
      </footer>
    </div>
  );
}
