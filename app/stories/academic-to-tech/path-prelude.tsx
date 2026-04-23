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
    id: "question-shape",
    prompt: "A question follows you home. Which version of it feels more alive?",
    note: "Choose the one that gives you more energy, not the one that sounds more respectable.",
    options: [
      {
        label: "The open horizon",
        detail: "I want to stay with the question until it reveals a deeper structure.",
        delta: -2
      },
      {
        label: "The useful edge",
        detail: "I want to shape the question into something other people can act on soon.",
        delta: 2
      }
    ]
  },
  {
    id: "proof",
    prompt: "When work lands well, what proof do you trust most?",
    note: "Think instinctively. What makes the work feel real?",
    options: [
      {
        label: "Durable citation",
        detail: "A body of thought that holds up under scrutiny and lasts beyond the moment.",
        delta: -2
      },
      {
        label: "Adoption in motion",
        detail: "A team, product, or decision starts behaving differently because of the work.",
        delta: 2
      }
    ]
  },
  {
    id: "daily-shape",
    prompt: "At the end of a strong week, which sentence feels more satisfying?",
    note: "This is about where your effort most naturally turns into meaning.",
    options: [
      {
        label: "I clarified something important",
        detail: "The idea is cleaner, truer, and better defended than it was before.",
        delta: -1
      },
      {
        label: "I moved something forward",
        detail: "The work turned into action, alignment, or a thing that now exists in the world.",
        delta: 1
      }
    ]
  },
  {
    id: "time-horizon",
    prompt: "A difficult year still feels worth it if, by the end, you have...",
    note: "This one is about time horizon more than ambition.",
    options: [
      {
        label: "Followed the question farther",
        detail: "Even if the payoff is subtle, the inquiry itself became sharper and truer.",
        delta: -1
      },
      {
        label: "Turned ambiguity into movement",
        detail: "Even if the answer is imperfect, something meaningful now exists in the world.",
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
      label: "The Seminar Room",
      eyebrow: "Depth seems to sharpen you.",
      summary:
        "You look most at home where rigor has time to deepen before it performs. Long inquiry, careful standards of proof, and slower-blooming work may still be your clearest source of energy.",
      tone: "Academic"
    };
  }

  if (score <= 40) {
    return {
      label: "The Field Scholar",
      eyebrow: "You lean academic, but not sealed off from the world.",
      summary:
        "You still seem nourished by serious inquiry, though you likely want that thought to stay porous to application. Translational research, strategy, and thoughtful hybrid roles may feel especially natural.",
      tone: "Academic-leaning"
    };
  }

  if (score <= 60) {
    return {
      label: "The Bridge Figure",
      eyebrow: "You do not split neatly, and that is useful.",
      summary:
        "You seem energized by both durable thought and real-world consequence. Roles that translate between research, product, and institutional decision-making may fit you unusually well.",
      tone: "Between both"
    };
  }

  if (score <= 80) {
    return {
      label: "The Applied Translator",
      eyebrow: "You lean toward motion, but still care about depth.",
      summary:
        "You appear most alive when ideas start changing what teams do. You likely prefer applied environments that still respect reasoning, nuance, and the quality of the underlying question.",
      tone: "Industry-leaning"
    };
  }

  return {
    label: "The Product Studio",
    eyebrow: "Momentum seems to feed you.",
    summary:
      "You look most energized where ambiguity turns into decisions, products, and visible consequence. Shorter feedback loops, execution, and shared movement may be where your work metabolizes best right now.",
    tone: "Industry"
  };
}

export function PathPrelude() {
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
      <div className="prelude-shell gradient-visual gradient-academic-tech">
        <div className="prelude-grid">
          <div className="prelude-copy">
            <p className="hero-kicker">Path Prelude</p>
            <h2 className="prelude-title">
              A small mirror before the field guide.
            </h2>
            <p className="prelude-dek">
              Four short scenes. No verdict, no performance. Just a gentler way
              to notice whether your energy currently gathers closer to academic
              depth or industry motion.
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
                    <span>Academic</span>
                    <span>Industry</span>
                  </div>
                  <div className="spectrum-track" aria-hidden="true">
                    <div className="spectrum-track-fill" />
                    <div
                      className="spectrum-marker"
                      style={{ left: `${score}%` }}
                    />
                  </div>
                  <div className="spectrum-chip-row" aria-hidden="true">
                    <span>The Seminar Room</span>
                    <span>The Bridge Figure</span>
                    <span>The Product Studio</span>
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
