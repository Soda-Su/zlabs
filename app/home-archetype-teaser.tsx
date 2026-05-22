"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import { PixelAvatar } from "./ai-archetype/avatar";
import { archetypeRegistry } from "./ai-archetype/data";
import { getResultState } from "./ai-archetype/logic";
import type {
  AccessoryId,
  ArchetypeId,
  ExpressionId,
  ResultState,
  SignalFlavor
} from "./ai-archetype/types";

type HomeTeaserSample = {
  archetype: ArchetypeId;
  signal: SignalFlavor;
  recipe: ResultState["recipe"];
  shortLine: string;
  badge: string;
  peekExpression: ExpressionId;
  peekAccessory: AccessoryId;
};

function createSample(
  archetype: ArchetypeId,
  signal: SignalFlavor,
  overrides: {
    palette: ResultState["recipe"]["palette"];
    expression: ExpressionId;
    accessory: AccessoryId;
  },
  shortLine: string,
  badge: string,
  peekExpression: ExpressionId,
  peekAccessory: AccessoryId
): HomeTeaserSample {
  return {
    archetype,
    signal,
    recipe: getResultState(archetype, signal, overrides).recipe,
    shortLine,
    badge,
    peekExpression,
    peekAccessory
  };
}

const teaserSamples: HomeTeaserSample[] = [
  createSample(
    "cartographer",
    "grounded",
    { palette: "sage", expression: "focused", accessory: "visor" },
    "Turns loose signal into something legible.",
    "Pattern scout",
    "calm",
    "headset"
  ),
  createSample(
    "dreamer",
    "speculative",
    { palette: "dusk", expression: "mischief", accessory: "star" },
    "Keeps unusual ideas alive long enough to matter.",
    "Future pull",
    "focused",
    "visor"
  ),
  createSample(
    "tinkerer",
    "grounded",
    { palette: "electric", expression: "focused", accessory: "visor" },
    "Builds first, learns fast, sharpens by testing.",
    "Prototype mode",
    "mischief",
    "headset"
  ),
  createSample(
    "conductor",
    "grounded",
    { palette: "electric", expression: "calm", accessory: "headset" },
    "Gets people, pace, and process moving together.",
    "Room energy",
    "focused",
    "visor"
  ),
  createSample(
    "catalyst",
    "speculative",
    { palette: "sage", expression: "mischief", accessory: "star" },
    "Creates momentum and gets the room unstuck.",
    "Spark starter",
    "focused",
    "headset"
  )
];

export function HomeArchetypeTeaser() {
  const [sampleIndex, setSampleIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const previewTimerRef = useRef<number | null>(null);
  const shuffleTimerRef = useRef<number[]>([]);
  const sample = teaserSamples[sampleIndex];
  const definition = archetypeRegistry[sample.archetype];

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    return () => {
      if (previewTimerRef.current) {
        window.clearTimeout(previewTimerRef.current);
      }

      shuffleTimerRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  function clearShuffleTimers() {
    shuffleTimerRef.current.forEach((timer) => window.clearTimeout(timer));
    shuffleTimerRef.current = [];
  }

  function beginPreview(track = false) {
    if (isShuffling) {
      return;
    }

    if (previewTimerRef.current) {
      window.clearTimeout(previewTimerRef.current);
    }

    setIsPreviewing(true);

    if (track) {
      posthog.capture("homepage_archetype_teaser_preview_tapped", {
        archetype: sample.archetype
      });
    }

    previewTimerRef.current = window.setTimeout(() => {
      setIsPreviewing(false);
      previewTimerRef.current = null;
    }, prefersReducedMotion ? 160 : 480);
  }

  function shuffleSample() {
    if (isShuffling) {
      return;
    }

    clearShuffleTimers();

    if (previewTimerRef.current) {
      window.clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }

    const sequence = Array.from(
      { length: prefersReducedMotion ? 1 : 8 },
      (_, step) => (sampleIndex + step + 1) % teaserSamples.length
    );
    const finalIndex = sequence[sequence.length - 1] ?? sampleIndex;

    if (prefersReducedMotion) {
      setSampleIndex(finalIndex);
      setIsPreviewing(true);
      posthog.capture("homepage_archetype_teaser_shuffled", {
        archetype: teaserSamples[finalIndex].archetype
      });

      previewTimerRef.current = window.setTimeout(() => {
        setIsPreviewing(false);
        previewTimerRef.current = null;
      }, 180);

      return;
    }

    setIsShuffling(true);

    sequence.forEach((index, step) => {
      const timer = window.setTimeout(() => {
        setSampleIndex(index);

        if (step === sequence.length - 1) {
          setIsShuffling(false);
          setIsPreviewing(true);
          posthog.capture("homepage_archetype_teaser_shuffled", {
            archetype: teaserSamples[index].archetype
          });

          previewTimerRef.current = window.setTimeout(() => {
            setIsPreviewing(false);
            previewTimerRef.current = null;
          }, 540);
        }
      }, 120 * (step + 1));

      shuffleTimerRef.current.push(timer);
    });
  }

  const previewRecipe = isPreviewing
    ? {
        ...sample.recipe,
        expression: sample.peekExpression,
        accessory: sample.peekAccessory
      }
    : sample.recipe;

  return (
    <div className="archetype-home-promo">
      <div className="archetype-home-copy">
        <p className="text-sm text-ink/48">Playful experiment</p>
        <h2 className="mt-2 max-w-2xl text-3xl leading-tight text-ink sm:text-4xl">
          Meet your AI archetype.
        </h2>
        <p className="mt-4 max-w-2xl text-[1.02rem] leading-8 text-ink/62">
          A small pixel-game about how you think, build, and move with AI:
          seven quick prompts, eight archetypes, one downloadable avatar card.
        </p>

        <div className="archetype-home-actions">
          <div className="archetype-home-button-row">
            <Link
              className="chip-link bg-white"
              href="/ai-archetype"
              onClick={() =>
                posthog.capture("homepage_archetype_teaser_cta_clicked", {
                  archetype: sample.archetype,
                  cta: "play_quiz"
                })
              }
            >
              Play the quiz
            </Link>
            <button
              type="button"
              className="archetype-home-shuffle"
              onClick={shuffleSample}
              disabled={isShuffling}
            >
              {isShuffling ? "Shuffling..." : "Shuffle a sample"}
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="story-status">Shareable result card</span>
            <span className="story-status">Pixel avatar</span>
            <span className="story-status">Mystery shuffle</span>
          </div>
        </div>
      </div>

      <div className="archetype-home-preview">
        <button
          type="button"
          className={`archetype-home-preview-card archetype-home-preview-button${
            isShuffling ? " archetype-home-preview-card-shuffling" : ""
          }${isPreviewing ? " archetype-home-preview-card-active" : ""}`}
          onClick={() => beginPreview(true)}
          onMouseEnter={() => beginPreview(false)}
          onFocus={() => beginPreview(false)}
          aria-label={`Preview ${definition.title}`}
        >
          <div className="archetype-home-preview-meta">
            <span className="story-status story-status-lead">
              {isShuffling ? "Mystery sample" : definition.name}
            </span>
            <span className="story-status">
              {sample.signal === "speculative" ? "Speculative signal" : "Grounded signal"}
            </span>
            <span className="story-status">{sample.badge}</span>
          </div>

          <div className="archetype-home-avatar-shell">
            <PixelAvatar
              archetype={sample.archetype}
              recipe={previewRecipe}
              size={220}
            />
          </div>

          <div className="mt-5 text-left">
            <p className="text-sm text-ink/48">
              {isShuffling ? "Now settling on..." : definition.title}
            </p>
            <p className="mt-2 max-w-sm text-[0.96rem] leading-6 text-ink/62">
              {isShuffling ? "Cycling through a few possibilities..." : sample.shortLine}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
