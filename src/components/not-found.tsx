import { Link } from "@tanstack/react-router";

export function NotFound({
  message = "This page doesn't exist yet.",
}: {
  message?: string;
}) {
  return (
    <div>
      <p className="label-mono opacity-60">/ 404</p>
      <p className="mt-4 leading-[1.6]">{message}</p>
      <Link
        to="/"
        className="label-mono mt-6 inline-block opacity-60 transition-opacity hover:opacity-100"
      >
        Home
      </Link>
    </div>
  );
}
