"use client";

import type { MouseEvent, ReactNode } from "react";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import posthog from "posthog-js";
import { ApplicationForm } from "./apply/application-form";
import { contactEmail } from "./site-config";

const dinnerPromptStorageKey = "zlabs:dinner-prompt-dismissed:v2";
const dinnerPromptTheme = "designer-researcher-builder";
const dinnerPromptDelayMs = 1400;
const dinnerPromptCooldownMs = 1000 * 60 * 60 * 24 * 7;
const dinnerFastLaneMailto = `mailto:${contactEmail}?subject=${encodeURIComponent(
  "Z Dinners No. 1 interest"
)}`;

export function HomeApplyShell({
  children
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDinnerPromptOpen, setIsDinnerPromptOpen] = useState(false);
  const [isDesktopApplyPromptOpen, setIsDesktopApplyPromptOpen] = useState(false);
  const [isMobileExperience, setIsMobileExperience] = useState(false);
  const [email, setEmail] = useState("");
  const isAnyModalOpen =
    isOpen || isDinnerPromptOpen || isDesktopApplyPromptOpen;

  const persistDinnerPromptDismissal = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      dinnerPromptStorageKey,
      String(Date.now())
    );
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    posthog.capture("apply_modal_dismissed");
  }, []);

  const closeDinnerPrompt = useCallback(() => {
    setIsDinnerPromptOpen(false);
    persistDinnerPromptDismissal();
    posthog.capture("dinner_prompt_dismissed", {
      theme: dinnerPromptTheme
    });
  }, [persistDinnerPromptDismissal]);

  const closeDesktopApplyPrompt = useCallback(() => {
    setIsDesktopApplyPromptOpen(false);
  }, []);

  const openDesktopApplyPrompt = useCallback(() => {
    setIsDinnerPromptOpen(false);
    setIsDesktopApplyPromptOpen(true);
    persistDinnerPromptDismissal();
    posthog.capture("mobile_desktop_apply_prompt_viewed");
  }, [persistDinnerPromptDismissal]);

  const openModal = useCallback((nextEmail = "") => {
    if (isMobileExperience) {
      openDesktopApplyPrompt();
      return;
    }

    persistDinnerPromptDismissal();
    setEmail(nextEmail);
    setIsDinnerPromptOpen(false);
    setIsOpen(true);
    posthog.capture("apply_modal_opened", { email_prefilled: nextEmail !== "" });
  }, [isMobileExperience, openDesktopApplyPrompt, persistDinnerPromptDismissal]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobileExperience(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isAnyModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (isOpen) {
          closeModal();
          return;
        }

        if (isDesktopApplyPromptOpen) {
          closeDesktopApplyPrompt();
          return;
        }

        closeDinnerPrompt();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    closeDesktopApplyPrompt,
    closeDinnerPrompt,
    closeModal,
    isAnyModalOpen,
    isDesktopApplyPromptOpen,
    isOpen
  ]);

  useEffect(() => {
    if (typeof window === "undefined" || isAnyModalOpen || isMobileExperience) {
      return;
    }

    const previousDismissedAt = window.localStorage.getItem(
      dinnerPromptStorageKey
    );

    if (previousDismissedAt) {
      const dismissedAt = Number(previousDismissedAt);

      if (
        Number.isFinite(dismissedAt) &&
        Date.now() - dismissedAt < dinnerPromptCooldownMs
      ) {
        return;
      }

      window.localStorage.removeItem(dinnerPromptStorageKey);
    }

    const timer = window.setTimeout(() => {
      setIsDinnerPromptOpen(true);
      posthog.capture("dinner_prompt_viewed", {
        theme: dinnerPromptTheme
      });
    }, dinnerPromptDelayMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isAnyModalOpen, isMobileExperience]);

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
  }, [openModal]);

  const description = useMemo(
    () =>
      "Share the basics, one representative work, and the question you are quietly carrying into the next phase of AI-native experience, the knowledge economy, and next-gen VC.",
    []
  );

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

    if (isMobileExperience) {
      openDesktopApplyPrompt();
      return;
    }

    const url = new URL(href, window.location.origin);
    openModal(url.searchParams.get("email")?.trim() ?? "");
  }

  function handleDinnerPromptCta(cta: "details" | "apply" | "email") {
    persistDinnerPromptDismissal();
    posthog.capture("dinner_prompt_cta_clicked", {
      theme: dinnerPromptTheme,
      cta
    });
  }

  return (
    <div onClickCapture={handleApplyLinkCapture}>
      {children}
      {isDesktopApplyPromptOpen ? (
        <div
          className="apply-modal-overlay mobile-apply-prompt-overlay"
          role="presentation"
          onClick={closeDesktopApplyPrompt}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-apply-prompt-title"
            className="mobile-apply-prompt"
            onClick={(event) => event.stopPropagation()}
          >
            <div>
              <p className="text-sm text-ink/50">Selective beta</p>
              <h2 id="mobile-apply-prompt-title" className="mt-2">
                Continue from desktop.
              </h2>
              <p className="mt-3">
                The mobile version is a short preview. Come back from a laptop
                or desktop for the full essays, vision, and application flow.
              </p>
            </div>
            <button
              type="button"
              className="mobile-apply-prompt-button"
              onClick={closeDesktopApplyPrompt}
            >
              Got it
            </button>
          </div>
        </div>
      ) : null}
      {isDinnerPromptOpen ? (
        <div
          className="apply-modal-overlay"
          role="presentation"
          onClick={closeDinnerPrompt}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-dinner-title"
            className="apply-modal-panel dinner-prompt-panel dinner-hero-glow w-full max-w-[760px] overflow-hidden rounded-[1rem] border border-ink/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.92)_0%,rgba(249,247,243,0.96)_58%,rgba(238,243,246,0.94)_100%)] shadow-[0_22px_80px_rgba(16,16,16,0.08)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="apply-modal-header border-b border-ink/8">
              <div>
                <p className="text-sm text-ink/55">An invitation from Z Dinners</p>
                <h2
                  id="home-dinner-title"
                  className="mt-2 max-w-2xl text-3xl leading-tight text-ink sm:text-4xl"
                >
                  Designer, researcher, builder, or whatever?
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-ink/62">
                  Around Config week in San Francisco, Z Dinners is convening
                  a small independent discussion for people whose work no
                  longer fits one clean title.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close dinner invitation"
                className="apply-modal-close"
                onClick={closeDinnerPrompt}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="grid gap-6 px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="story-status story-status-lead story-status-spotlight">
                  First gathering
                </span>
                <span className="story-status">Config week</span>
                <span className="story-status">San Francisco</span>
                <span className="story-status">Independent private dinner</span>
              </div>

              <p className="max-w-2xl text-[1.02rem] leading-7 text-ink/66">
                A quieter invitation than a splashy launch. If you are in SF
                for the product-building energy around Config, this is the
                smaller conversation after the stage: AI, organization, and the
                taste required when tools move faster.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/dinners/designer-researcher-builder-or-whatever"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-ink px-5 text-sm font-medium text-white transition duration-300 hover:bg-zlabs-blue-deep focus:outline-none focus:ring-2 focus:ring-zlabs-blue-deep focus:ring-offset-2 focus:ring-offset-white"
                  onClick={() => handleDinnerPromptCta("details")}
                >
                  Read the invitation
                </Link>
                <Link
                  href="/apply?interest=designer-researcher-builder-dinner"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-ink/12 bg-white/72 px-5 text-sm text-ink/68 transition duration-300 hover:border-ink/18 hover:bg-white"
                  onClick={() => handleDinnerPromptCta("apply")}
                >
                  Ask for a seat
                </Link>
              </div>

              <p className="max-w-2xl text-sm leading-6 text-ink/52">
                Already applied to Z Labs?{" "}
                <a
                  href={dinnerFastLaneMailto}
                  className="quiet-link text-ink/70"
                  onClick={() => handleDinnerPromptCta("email")}
                >
                  Email Soda directly for this table.
                </a>
              </p>
            </div>
          </div>
        </div>
      ) : null}
      {isOpen ? (
        <div
          className="apply-modal-overlay"
          role="presentation"
          onClick={closeModal}
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
                onClick={closeModal}
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
