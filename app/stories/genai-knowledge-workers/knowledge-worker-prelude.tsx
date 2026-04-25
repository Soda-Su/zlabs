"use client";

import { useMemo, useState } from "react";
import { ArrowDown, RotateCcw } from "lucide-react";

type Option = {
  label: string;
  detail: string;
  delta: number;
};

type Scene = {
  id: string;
  prompt: string;
  note: string;
  options: [Option, Option];
};

type ResultProfile = {
  label: string;
  eyebrow: string;
  summary: string;
  tone: string;
};

const scenes: Scene[] = [
  {
    id: "first-instinct",
    prompt: "A model opens beside your work. What do you want from it first?",
    note: "Pick the answer that sounds most like your instinct, not the one that sounds smartest.",
    options: [
      {
        label: "Sharpen the thinking",
        detail: "I want it to pressure-test the draft so the ideas become cleaner and harder to fake.",
        delta: -2
      },
      {
        label: "Accelerate the first pass",
        detail: "I want it to get me to a workable starting point fast so the rest of the system can move.",
        delta: 2
      }
    ]
  },
  {
    id: "good-enough",
    prompt: "The model gives you something plausible in thirty seconds. What happens next?",
    note: "This is about where your standards and energy naturally go.",
    options: [
      {
        label: "Slow down and interrogate it",
        detail: "I immediately want to verify, reframe, and see whether the answer actually deserves trust.",
        delta: -2
      },
      {
        label: "Route it into the workflow",
        detail: "I want to use it as a live ingredient in a larger chain of decisions, teammates, and outputs.",
        delta: 2
      }
    ]
  },
  {
    id: "scarcity",
    prompt: "As generated language becomes abundant, what feels scarcer to you?",
    note: "Abundance is not the same thing as value. Listen for what still feels hard to replace.",
    options: [
      {
        label: "Original judgment",
        detail: "Taste, verification, and point of view feel like the layer that will matter more.",
        delta: -1
      },
      {
        label: "Operational coordination",
        detail: "The ability to direct models, people, and systems into coherent motion feels scarcer.",
        delta: 1
      }
    ]
  },
  {
    id: "trusted-for",
    prompt: "What do people most often trust you for?",
    note: "Not your title. Your actual function in the room.",
    options: [
      {
        label: "Craft and discernment",
        detail: "I am usually the one who notices what is weak, unclear, or too generic to stand.",
        delta: -1
      },
      {
        label: "Direction and orchestration",
        detail: "I am usually the one who turns ambiguity into process, sequencing, and forward motion.",
        delta: 1
      }
    ]
  }
];

const totalScenes = scenes.length;

function clamp(value: number, lower: number, upper: number) {
  return Math.min(upper, Math.max(lower, value));
}

function normalize(value: number, min: number, max: number) {
  return Math.round(((value - min) / (max - min)) * 100);
}

function getResultProfile(score: number): ResultProfile {
  if (score <= 20) {
    return {
      label: "The Craft Bench",
      eyebrow: "You still orient around depth before motion.",
      summary:
        "You seem most alive where GenAI remains an instrument, not a substitute for authorship. Verification, style, original judgment, and hard-won clarity still feel like your home ground.",
      tone: "Deep craft"
    };
  }

  if (score <= 40) {
    return {
      label: "The Systems Editor",
      eyebrow: "You are open to leverage, but not at the expense of standards.",
      summary:
        "You appear to welcome GenAI as a compressor of routine effort while keeping your center of gravity in critique, refinement, and intellectual quality control.",
      tone: "Craft-leaning"
    };
  }

  if (score <= 60) {
    return {
      label: "The Bridge Operator",
      eyebrow: "You live between authorship and orchestration.",
      summary:
        "You seem comfortable letting models carry some of the surface load while you hold the harder layer: framing, trust, and deciding what should happen next.",
      tone: "Between both"
    };
  }

  if (score <= 80) {
    return {
      label: "The Workflow Architect",
      eyebrow: "You think in systems as much as sentences.",
      summary:
        "You appear energized by turning GenAI into coordinated leverage. The value you create may come less from solitary output and more from building clean flows between models, people, and decisions.",
      tone: "Orchestration-leaning"
    };
  }

  return {
    label: "The Command Surface",
    eyebrow: "You naturally read this shift as organizational, not merely personal.",
    summary:
      "You seem drawn to the layer where GenAI becomes infrastructure for execution. Your advantage may come from directing cognitive systems well, while keeping accountability and judgment in human hands.",
    tone: "AI-leveraged orchestration"
  };
}

export function KnowledgeWorkerPrelude() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const isComplete = answers.length === totalScenes;
  const activeScene = scenes[index] ?? scenes[scenes.length - 1];

  const { score, profile } = useMemo(() => {
    const total = answers.reduce(
      (sum, answerIndex, sceneIndex) =>
        sum + scenes[sceneIndex].options[answerIndex].delta,
      0
    );

    const normalizedScore = normalize(clamp(total, -6, 6), -6, 6);

    return {
      score: normalizedScore,
      profile: getResultProfile(normalizedScore)
    };
  }, [answers]);

  function choose(optionIndex: number) {
    setAnswers((current) => [...current, optionIndex]);
    setIndex((current) => Math.min(current + 1, totalScenes));
  }

  function restart() {
    setAnswers([]);
    setIndex(0);
  }

  function scrollToGuide() {
    const element = document.getElementById("field-guide-start");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="mx-auto max-w-[1180px] px-4 pb-10 pt-10 sm:px-6 lg:px-8">
      <div className="prelude-shell gradient-visual gradient-signal">
        <div className="prelude-grid">
          <div className="prelude-copy">
            <p className="hero-kicker">Path Prelude</p>
            <h2 className="prelude-title">
              A small mirror before the field guide.
            </h2>
            <p className="prelude-dek">
              Four short scenes. No verdict, no performance. Just a gentler way
              to notice whether you meet GenAI through deep craft or leveraged
              orchestration.
            </p>
          </div>

          <div className="prelude-panel">
            {!isComplete ? (
              <>
                <div className="prelude-progress-row">
                  <p className="prelude-progress-copy">
                    Scene {index + 1} of {totalScenes}
                  </p>
                  <div className="prelude-progress-dots" aria-hidden="true">
                    {scenes.map((scene, sceneIndex) => (
                      <span
                        key={scene.id}
                        className={`prelude-progress-dot ${
                          sceneIndex <= index ? "is-active" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="prelude-scene">
                  <p className="prelude-scene-prompt">{activeScene.prompt}</p>
                  <p className="prelude-scene-note">{activeScene.note}</p>
                </div>

                <div className="prelude-options">
                  {activeScene.options.map((option, optionIndex) => (
                    <button
                      key={option.label}
                      type="button"
                      className="prelude-option"
                      onClick={() => choose(optionIndex)}
                    >
                      <span className="prelude-option-label">{option.label}</span>
                      <span className="prelude-option-detail">
                        {option.detail}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="prelude-result">
                <div className="prelude-progress-row">
                  <p className="prelude-progress-copy">Your current pull</p>
                  <button
                    type="button"
                    className="prelude-link-button"
                    onClick={restart}
                  >
                    <RotateCcw className="h-4 w-4" />
                    Retake
                  </button>
                </div>

                <div className="spectrum-shell">
                  <div className="spectrum-label-row">
                    <span>Deep craft</span>
                    <span>AI orchestration</span>
                  </div>
                  <div className="spectrum-track" aria-hidden="true">
                    <div className="spectrum-track-fill" />
                    <div
                      className="spectrum-marker"
                      style={{ left: `${score}%` }}
                    />
                  </div>
                  <div className="spectrum-chip-row" aria-hidden="true">
                    <span>The Craft Bench</span>
                    <span>The Bridge Operator</span>
                    <span>The Command Surface</span>
                  </div>
                </div>

                <div className="prelude-axis-readout">
                  <div>
                    <span className="prelude-axis-name">Current line</span>
                    <span className="prelude-axis-value">{profile.tone}</span>
                  </div>
                </div>

                <div className="prelude-result-copy">
                  <p className="prelude-result-eyebrow">{profile.eyebrow}</p>
                  <h3 className="prelude-result-title">{profile.label}</h3>
                  <p className="prelude-result-summary">{profile.summary}</p>
                </div>

                <div className="prelude-actions">
                  <button
                    type="button"
                    className="prelude-primary"
                    onClick={scrollToGuide}
                  >
                    <ArrowDown className="h-4 w-4" />
                    Now read the field guide
                  </button>
                </div>

                <p className="prelude-status">
                  Keep the result lightly. It is a cue, not a verdict.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
