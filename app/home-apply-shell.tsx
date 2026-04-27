"use client";

import type { MouseEvent, ReactNode } from "react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { ApplicationForm } from "./apply/application-form";

export function HomeApplyShell({
  children
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    function handleOpen(event: Event) {
      const customEvent = event as CustomEvent<{ email?: string }>;
      openModal(customEvent.detail?.email?.trim() ?? "");
    }

    window.addEventListener("zlabs:open-apply", handleOpen as EventListener);

    return () => {
      window.removeEventListener(
        "zlabs:open-apply",
        handleOpen as EventListener
      );
    };
  }, []);

  const description = useMemo(
    () =>
      "Share the basics, one representative work, and the question you are quietly carrying into the next phase of AI-native experience, the knowledge economy, and next-gen VC.",
    []
  );

  function openModal(nextEmail = "") {
    setEmail(nextEmail);
    setIsOpen(true);
  }

  function handleApplyLinkCapture(event: MouseEvent<HTMLDivElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const link = target.closest("a[href]");

    if (!(link instanceof HTMLAnchorElement)) {
      return;
    }

    const href = link.getAttribute("href");

    if (!href || !href.startsWith("/apply")) {
      return;
    }

    event.preventDefault();

    const url = new URL(href, window.location.origin);
    openModal(url.searchParams.get("email")?.trim() ?? "");
  }

  return (
    <div onClickCapture={handleApplyLinkCapture}>
      {children}
      {isOpen ? (
        <div
          className="apply-modal-overlay"
          role="presentation"
          onClick={() => setIsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-apply-title"
            className="apply-modal-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="apply-modal-header">
              <div>
                <p className="text-sm text-ink/55">Selective beta</p>
                <h2
                  id="home-apply-title"
                  className="mt-2 text-3xl leading-tight text-ink sm:text-4xl"
                >
                  Request quiet access.
                </h2>
                <p className="mt-3 max-w-2xl leading-7 text-ink/60">
                  {description}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close beta access form"
                className="apply-modal-close"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="apply-modal-body">
              <div className="apply-modal-note">
                <p className="text-sm text-ink/55">Beta note</p>
                <p className="mt-3 max-w-sm leading-7 text-ink/60">
                  A concise introduction is enough. We read for clarity,
                  curiosity, and signal. Precision matters more than
                  performance.
                </p>
              </div>
              <div className="apply-modal-form">
                <Suspense
                  fallback={
                    <p className="text-sm text-ink/55">Loading form...</p>
                  }
                >
                  <ApplicationForm initialEmailOverride={email} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
