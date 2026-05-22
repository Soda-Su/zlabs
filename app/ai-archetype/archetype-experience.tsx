"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import posthog from "posthog-js";
import { PixelAvatar } from "./avatar";
import { archetypeRegistry, paletteRegistry, quizQuestions } from "./data";
import {
  buildCardHref,
  deserializeResultState,
  getDisplayScoresForResult,
  getResultState,
  randomResultState,
  resolveArchetypeFromAnswers,
  serializeResultState
} from "./logic";
import { QuadrantMap } from "./quadrant-map";
import type {
  AccessoryId,
  ExpressionId,
  PaletteId,
  QuizAnswer,
  ResultState
} from "./types";

type ArchetypeExperienceProps = {
  initialSearchParams: Record<string, string | string[] | undefined>;
};

type Phase = "intro" | "quiz" | "reveal" | "result";
type RevealSource = "quiz" | "random" | "restored" | null;

const paletteLabels = Object.fromEntries(
  paletteRegistry.map((item) => [item.id, item.label])
) as Record<PaletteId, string>;

const expressionLabels: Record<ExpressionId, string> = {
  calm: "Calm",
  mischief: "Mischief",
  focused: "Focused"
};

const accessoryLabels: Record<AccessoryId, string> = {
  visor: "Visor",
  headset: "Headset",
  star: "Star",
  none: "None"
};

export function ArchetypeExperience({
  initialSearchParams
}: ArchetypeExperienceProps) {
  const initialResult = useMemo(
    () => deserializeResultState(initialSearchParams),
    [initialSearchParams]
  );
  const [phase, setPhase] = useState<Phase>(initialResult ? "result" : "intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [resultState, setResultState] = useState<ResultState | null>(initialResult);
  const [revealSource, setRevealSource] = useState<RevealSource>(
    initialResult ? "restored" : null
  );
  const [copied, setCopied] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [compactLayout, setCompactLayout] = useState(false);

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
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(max-width: 639px)");
    const update = () => setCompactLayout(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const url = new URL(window.location.href);

    if (resultState) {
      const params = serializeResultState(resultState);
      url.search = params.toString();
    } else {
      url.search = "";
    }

    window.history.replaceState({}, "", url.toString());
  }, [resultState]);

  useEffect(() => {
    if (phase !== "reveal") {
      return;
    }

    const timer = window.setTimeout(
      () => setPhase("result"),
      prefersReducedMotion ? 140 : 980
    );

    return () => window.clearTimeout(timer);
  }, [phase, prefersReducedMotion]);

  const currentQuestion = quizQuestions[stepIndex];
  const archetype = resultState ? archetypeRegistry[resultState.archetype] : null;
  const scoreSnapshot = resultState ? getDisplayScoresForResult(resultState) : null;
  const tuneAccessoryOptions = archetype?.allowedAccessories ?? ["none"];
  const cardHref = resultState ? buildCardHref(resultState) : "#";

  function startQuiz() {
    setAnswers([]);
    setStepIndex(0);
    setResultState(null);
    setPhase("quiz");
    setRevealSource(null);
    posthog.capture("ai_archetype_started", {
      source: "direct_start"
    });
  }

  function finishWithState(nextState: ResultState, origin: "quiz" | "random") {
    setResultState(nextState);
    setPhase(origin === "quiz" ? "reveal" : "result");
    setRevealSource(origin);

    posthog.capture("ai_archetype_revealed", {
      archetype: nextState.archetype,
      signal: nextState.signal,
      origin
    });
  }

  function randomize() {
    const nextState = randomResultState();
    setAnswers([]);
    setStepIndex(0);
    finishWithState(nextState, "random");
    posthog.capture("ai_archetype_started", {
      source: "randomize"
    });
  }

  function chooseAnswer(answer: QuizAnswer) {
    if (!currentQuestion) {
      return;
    }

    const nextAnswers = [...answers, answer];

    setAnswers(nextAnswers);
    posthog.capture("ai_archetype_question_answered", {
      question_id: currentQuestion.id,
      answer_id: answer.id,
      question_index: stepIndex + 1
    });

    if (stepIndex < quizQuestions.length - 1) {
      setStepIndex((value) => value + 1);
      return;
    }

    const resolved = resolveArchetypeFromAnswers(nextAnswers);
    finishWithState(resolved.result, "quiz");
  }

  function tuneRecipe(
    field: "palette" | "expression" | "accessory",
    value: PaletteId | ExpressionId | AccessoryId
  ) {
    if (!resultState) {
      return;
    }

    const nextState = getResultState(resultState.archetype, resultState.signal, {
      palette:
        field === "palette"
          ? (value as PaletteId)
          : resultState.recipe.palette,
      expression:
        field === "expression"
          ? (value as ExpressionId)
          : resultState.recipe.expression,
      accessory:
        field === "accessory"
          ? (value as AccessoryId)
          : resultState.recipe.accessory
    });

    setResultState(nextState);
    posthog.capture("ai_archetype_tuned", {
      archetype: nextState.archetype,
      field,
      value
    });
  }

  async function copyLink() {
    if (!resultState || typeof window === "undefined") {
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);

    posthog.capture("ai_archetype_link_copied", {
      archetype: resultState.archetype
    });
  }

  function retake() {
    setAnswers([]);
    setStepIndex(0);
    setResultState(null);
    setPhase("intro");
    setRevealSource(null);
  }

  return (
    <main className="archetype-shell">
      <section className="archetype-topbar">
        <Link href="/" className="brand-mark">
          <span className="brand-text">Z Labs</span>
        </Link>
        <div className="flex items-center gap-3 text-sm text-ink/55">
          <span className="hidden sm:inline">Playful side quest</span>
          <Link href="/apply" className="quiet-link">
            Join the Beta
          </Link>
        </div>
      </section>

      <section className="archetype-stage">
        <div className="archetype-stage-copy">
          <p className="archetype-kicker">Your AI Archetype</p>
          <h1 className="archetype-title">
            A quick pixel quiz about how you work with AI.
          </h1>
          <p className="archetype-subtitle">
            Answer seven short questions, get one AI archetype, then adjust the
            avatar and save the card.
          </p>
        </div>

        <div className="archetype-poster">
          <div className="archetype-poster-copy">
            <p className="archetype-poster-label">What you get</p>
            <h2>One type. One avatar. One card to keep or share.</h2>
            <p>
              This is a light personality game. It focuses on work style, team style,
              and how you usually respond to new AI ideas.
            </p>
          </div>
          <div className="archetype-poster-preview">
            <div className="archetype-poster-orb" />
            <PixelAvatar
              archetype={resultState?.archetype ?? "catalyst"}
              recipe={
                resultState?.recipe ??
                getResultState("catalyst", "speculative").recipe
              }
              size={compactLayout ? 210 : 240}
            />
          </div>
        </div>
      </section>

      <section className="archetype-flow">
        {phase === "intro" ? (
          <div className="archetype-panel archetype-panel-grid">
            <div>
              <p className="archetype-panel-kicker">How it works</p>
              <div className="grid gap-4 text-ink/66">
                <p>1. Answer seven short questions.</p>
                <p>2. We map you to one of eight AI archetypes.</p>
                <p>3. Adjust the avatar and save the result card.</p>
              </div>
            </div>
            <div className="archetype-action-stack">
              <button type="button" className="archetype-cta" onClick={startQuiz}>
                Start the quiz
              </button>
              <button
                type="button"
                className="archetype-secondary"
                onClick={randomize}
              >
                Skip to a random one
              </button>
            </div>
          </div>
        ) : null}

        {phase === "quiz" && currentQuestion ? (
          <div className="archetype-panel">
            <div className="flex flex-col gap-5">
              <div className="archetype-quiz-header">
                <p className="archetype-panel-kicker">{currentQuestion.eyebrow}</p>
                <span className="text-sm text-ink/40">
                  {stepIndex + 1} / {quizQuestions.length}
                </span>
              </div>
              <h2 className="archetype-quiz-title text-3xl leading-tight text-ink sm:text-4xl">
                {currentQuestion.prompt}
              </h2>
              <div className="grid gap-3">
                {currentQuestion.answers.map((answer) => (
                  <button
                    key={answer.id}
                    type="button"
                    className="archetype-choice"
                    onClick={() => chooseAnswer(answer)}
                  >
                    <span className="archetype-choice-label">{answer.label}</span>
                    <span className="archetype-choice-copy">{answer.description}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {phase === "reveal" && resultState && archetype ? (
          <div className="archetype-panel archetype-reveal">
            <div className="archetype-reveal-copy">
              <p className="archetype-panel-kicker">Your result</p>
              <h2 className="text-4xl leading-tight text-ink sm:text-5xl">
                {archetype.title}
              </h2>
              <p className="max-w-2xl text-[1.02rem] leading-7 text-ink/64">
                {archetype.oneLiner}
              </p>
            </div>
            <PixelAvatar
              archetype={resultState.archetype}
              recipe={resultState.recipe}
              size={compactLayout ? 224 : 260}
              className="archetype-avatar-reveal"
            />
          </div>
        ) : null}

        {phase === "result" && resultState && archetype && scoreSnapshot ? (
          <div className="archetype-panel archetype-result-grid">
            <div className="archetype-result-hero">
              <PixelAvatar
                archetype={resultState.archetype}
                recipe={resultState.recipe}
                size={compactLayout ? 232 : 280}
              />
              <div className="archetype-result-copy flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="story-status story-status-lead">
                    {archetype.name}
                  </span>
                  <span className="story-status">
                    {resultState.signal === "speculative"
                      ? "Speculative signal"
                      : "Grounded signal"}
                  </span>
                  {revealSource === "quiz" ? (
                    <span className="story-status">Quiz-made</span>
                  ) : null}
                  {revealSource === "random" ? (
                    <span className="story-status">Randomized</span>
                  ) : null}
                  {revealSource === "restored" ? (
                    <span className="story-status">Shared result</span>
                  ) : null}
                </div>
                <h2 className="text-4xl leading-tight text-ink sm:text-5xl">
                  {archetype.title}
                </h2>
                <p className="max-w-2xl text-[1.02rem] leading-8 text-ink/65">
                  {archetype.oneLiner}
                </p>
                <div className="flex flex-wrap gap-2">
                  {archetype.traits.map((trait) => (
                    <span key={trait} className="keyword-pill">
                      {trait}
                    </span>
                  ))}
                </div>
                <p className="max-w-2xl text-sm leading-6 text-ink/54">
                  {archetype.labLine}
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
              <div className="archetype-controls">
                <div className="archetype-control-group">
                  <p className="archetype-panel-kicker">Tune the look</p>
                  <h3>Same type, new look.</h3>
                </div>

                <div className="archetype-control-group">
                  <span className="archetype-control-label">Palette</span>
                  <div className="archetype-control-options">
                    {paletteRegistry.map((palette) => (
                      <button
                        key={palette.id}
                        type="button"
                        className={`archetype-control-chip${
                          resultState.recipe.palette === palette.id
                            ? " archetype-control-chip-active"
                            : ""
                        }`}
                        onClick={() => tuneRecipe("palette", palette.id)}
                      >
                        {paletteLabels[palette.id]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="archetype-control-group">
                  <span className="archetype-control-label">Expression</span>
                  <div className="archetype-control-options">
                    {(Object.keys(expressionLabels) as ExpressionId[]).map((id) => (
                      <button
                        key={id}
                        type="button"
                        className={`archetype-control-chip${
                          resultState.recipe.expression === id
                            ? " archetype-control-chip-active"
                            : ""
                        }`}
                        onClick={() => tuneRecipe("expression", id)}
                      >
                        {expressionLabels[id]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="archetype-control-group">
                  <span className="archetype-control-label">Accessory</span>
                  <div className="archetype-control-options">
                    {tuneAccessoryOptions.map((id) => (
                      <button
                        key={id}
                        type="button"
                        className={`archetype-control-chip${
                          resultState.recipe.accessory === id
                            ? " archetype-control-chip-active"
                            : ""
                        }`}
                        onClick={() => tuneRecipe("accessory", id)}
                      >
                        {accessoryLabels[id]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="archetype-readout">
                <div className="archetype-quadrant-shell">
                  <div className="archetype-quadrant-copy">
                    <p className="archetype-panel-kicker">Work map</p>
                    <h3>Observe and social position</h3>
                    <p>
                      This map places you by how you respond to new ideas and how
                      much energy you draw from working with other people.
                    </p>
                  </div>
                  <div className="archetype-quadrant-frame">
                    <QuadrantMap
                      drive={scoreSnapshot.drive}
                      orbit={scoreSnapshot.orbit}
                      currentLabel={archetype.name}
                      size={compactLayout ? 272 : 320}
                    />
                  </div>
                </div>

                <div className="archetype-action-row">
                  <a
                    className="archetype-cta"
                    href={cardHref}
                    download
                    onClick={() =>
                      posthog.capture("ai_archetype_downloaded", {
                        archetype: resultState.archetype
                      })
                    }
                  >
                    Download avatar card
                  </a>
                  <button
                    type="button"
                    className="archetype-secondary"
                    onClick={copyLink}
                  >
                    {copied ? "Link copied" : "Copy share link"}
                  </button>
                </div>

                <div className="archetype-soft-cta">
                  <p className="text-sm leading-6 text-ink/58">
                    If this feels right, bring that energy into the real room.
                  </p>
                  <div className="archetype-soft-actions">
                    <Link
                      href={`/apply?source=ai-archetype&archetype=${resultState.archetype}`}
                      className="chip-link bg-white"
                      onClick={() =>
                        posthog.capture("ai_archetype_cta_clicked", {
                          archetype: resultState.archetype,
                          cta: "apply"
                        })
                      }
                    >
                      Bring it into Z Labs
                    </Link>
                    <button
                      type="button"
                      className="chip-link bg-transparent"
                      onClick={retake}
                    >
                      Retake the quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
