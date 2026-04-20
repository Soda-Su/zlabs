"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

type SubmitState = "idle" | "success" | "error";

type InviteFormProps = {
  placeholder?: string;
  buttonLabel?: string;
  variant?: "hero" | "footer";
};

export function InviteForm({
  placeholder = "Join the Z Labs waitlist",
  buttonLabel = "Join the Waitlist",
  variant = "hero"
}: InviteFormProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const isHero = variant === "hero";
  const inputId = `invite-email-${variant}`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setState("error");
      setMessage("Enter a valid email to join the waitlist.");
      return;
    }

    setState("success");
    setMessage("Opening waitlist.");
    window.location.href = `/apply?email=${encodeURIComponent(trimmedEmail)}`;
  }

  return (
    <form
      id={isHero ? "request-invite" : undefined}
      onSubmit={handleSubmit}
      className="w-full scroll-mt-24"
    >
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <div
        className={
          isHero
            ? "form-shell mx-auto flex flex-col gap-3 p-2 sm:flex-row"
            : "flex flex-col gap-3 sm:flex-row"
        }
      >
        <div className="relative flex-1">
          <Mail
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/35"
          />
          <input
            id={inputId}
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={placeholder}
            autoComplete="email"
            className={
              isHero
                ? "h-14 w-full rounded-md border border-transparent bg-transparent pl-12 pr-4 text-base text-ink outline-none placeholder:text-ink/45 focus:border-ink/10 focus:bg-white"
                : "h-12 w-full rounded-md border border-ink/15 bg-white pl-12 pr-4 text-sm text-ink outline-none transition duration-300 placeholder:text-ink/45 focus:border-zlabs-blue-deep"
            }
          />
        </div>
        <button
          type="submit"
          disabled={state === "success"}
          className={
            isHero
              ? "group inline-flex h-14 items-center justify-center gap-2 rounded-md bg-ink px-5 text-sm font-medium text-white transition duration-300 hover:bg-zlabs-blue-deep focus:outline-none focus:ring-2 focus:ring-zlabs-blue-deep focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60"
              : "group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-ink px-5 text-sm font-medium text-white transition duration-300 hover:bg-zlabs-blue-deep focus:outline-none focus:ring-2 focus:ring-zlabs-blue-deep focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60"
          }
        >
          {state === "success" ? "Opening" : buttonLabel}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
      <p
        aria-live="polite"
        className={`mt-3 min-h-6 text-sm ${
          state === "success" ? "text-zlabs-blue-deep" : "text-ink/55"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
