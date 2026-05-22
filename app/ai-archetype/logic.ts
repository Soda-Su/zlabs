import { archetypePriority, archetypeRegistry } from "./data";
import type {
  AccessoryId,
  ArchetypeDefinition,
  ArchetypeId,
  AvatarRecipe,
  AxisScores,
  ExpressionId,
  PaletteId,
  QuizAnswer,
  ResultState,
  ScoreTally,
  SignalFlavor
} from "./types";

export type ResolvedArchetype = {
  archetype: ArchetypeDefinition;
  scores: AxisScores;
  tally: ScoreTally;
  result: ResultState;
};

const emptyScoreTally: ScoreTally = {
  observe: 0,
  act: 0,
  structure: 0,
  flux: 0,
  solo: 0,
  social: 0,
  grounded: 0,
  speculative: 0
};

const paletteIds = new Set<PaletteId>(["dusk", "electric", "sage"]);
const expressionIds = new Set<ExpressionId>(["calm", "mischief", "focused"]);
const accessoryIds = new Set<AccessoryId>(["visor", "headset", "star", "none"]);

function getAxisScores(tally: ScoreTally): AxisScores {
  return {
    drive: tally.act - tally.observe,
    method: tally.flux - tally.structure,
    orbit: tally.social - tally.solo,
    signal: tally.speculative - tally.grounded
  };
}

function targetScoreForPole(pole: "observe" | "act" | "structure" | "flux" | "solo" | "social") {
  switch (pole) {
    case "observe":
    case "structure":
    case "solo":
      return -2;
    default:
      return 2;
  }
}

function targetSignalScore(signal: SignalFlavor) {
  return signal === "speculative" ? 1 : -1;
}

function recipeWithDefaults(
  archetype: ArchetypeId,
  signal: SignalFlavor,
  partial?: Partial<Pick<AvatarRecipe, "palette" | "expression" | "accessory">>
): AvatarRecipe {
  const definition = archetypeRegistry[archetype];
  const accessory = partial?.accessory ?? definition.defaultRecipe.accessory;
  const safeAccessory = definition.allowedAccessories.includes(accessory)
    ? accessory
    : definition.defaultRecipe.accessory;

  return {
    palette: partial?.palette ?? definition.defaultRecipe.palette,
    expression: partial?.expression ?? definition.defaultRecipe.expression,
    accessory: safeAccessory,
    aura: definition.defaultRecipe.aura,
    frame: signal === "speculative" ? "beacon" : "archive"
  };
}

function getSearchValue(
  source: URLSearchParams | Record<string, string | string[] | undefined>,
  key: string
) {
  if (source instanceof URLSearchParams) {
    return source.get(key) ?? undefined;
  }

  const value = source[key];

  return Array.isArray(value) ? value[0] : value;
}

export function aggregateQuizAnswers(answers: QuizAnswer[]) {
  const tally = answers.reduce<ScoreTally>((running, answer) => {
    const next = { ...running };

    for (const [key, amount] of Object.entries(answer.effects)) {
      if (!amount) {
        continue;
      }

      next[key as keyof ScoreTally] += amount;
    }

    return next;
  }, emptyScoreTally);

  return {
    tally,
    scores: getAxisScores(tally)
  };
}

export function resolveArchetypeFromAnswers(answers: QuizAnswer[]): ResolvedArchetype {
  const { tally, scores } = aggregateQuizAnswers(answers);
  const best = archetypePriority
    .map((id) => {
      const definition = archetypeRegistry[id];
      const distance =
        Math.abs(scores.drive - targetScoreForPole(definition.axis.drive)) +
        Math.abs(scores.method - targetScoreForPole(definition.axis.method)) +
        Math.abs(scores.orbit - targetScoreForPole(definition.axis.orbit));
      const signalDistance = Math.abs(
        scores.signal - targetSignalScore(definition.preferredSignal)
      );

      return {
        definition,
        distance,
        signalDistance,
        priority: archetypePriority.indexOf(id)
      };
    })
    .sort((left, right) => {
      if (left.distance !== right.distance) {
        return left.distance - right.distance;
      }

      if (left.signalDistance !== right.signalDistance) {
        return left.signalDistance - right.signalDistance;
      }

      return left.priority - right.priority;
    })[0];

  const signal: SignalFlavor = scores.signal > 0 ? "speculative" : "grounded";
  const result: ResultState = {
    archetype: best.definition.id,
    signal,
    recipe: recipeWithDefaults(best.definition.id, signal)
  };

  return {
    archetype: best.definition,
    scores,
    tally,
    result
  };
}

export function getResultState(
  archetype: ArchetypeId,
  signal: SignalFlavor,
  overrides?: Partial<Pick<AvatarRecipe, "palette" | "expression" | "accessory">>
): ResultState {
  return {
    archetype,
    signal,
    recipe: recipeWithDefaults(archetype, signal, overrides)
  };
}

export function getDisplayScoresForResult(state: ResultState): AxisScores {
  const definition = archetypeRegistry[state.archetype];

  return {
    drive: targetScoreForPole(definition.axis.drive),
    method: targetScoreForPole(definition.axis.method),
    orbit: targetScoreForPole(definition.axis.orbit),
    signal: targetSignalScore(state.signal)
  };
}

export function serializeResultState(state: ResultState) {
  const params = new URLSearchParams();

  params.set("a", state.archetype);
  params.set("s", state.signal);
  params.set("p", state.recipe.palette);
  params.set("e", state.recipe.expression);
  params.set("x", state.recipe.accessory);

  return params;
}

export function deserializeResultState(
  source: URLSearchParams | Record<string, string | string[] | undefined>
) {
  const archetype = getSearchValue(source, "a");
  const signal = getSearchValue(source, "s");

  if (!archetype || !signal || !(archetype in archetypeRegistry)) {
    return null;
  }

  if (signal !== "grounded" && signal !== "speculative") {
    return null;
  }

  const palette = getSearchValue(source, "p");
  const expression = getSearchValue(source, "e");
  const accessory = getSearchValue(source, "x");

  const overrides: Partial<Pick<AvatarRecipe, "palette" | "expression" | "accessory">> = {};

  if (palette && paletteIds.has(palette as PaletteId)) {
    overrides.palette = palette as PaletteId;
  }

  if (expression && expressionIds.has(expression as ExpressionId)) {
    overrides.expression = expression as ExpressionId;
  }

  if (accessory && accessoryIds.has(accessory as AccessoryId)) {
    overrides.accessory = accessory as AccessoryId;
  }

  return getResultState(archetype as ArchetypeId, signal, overrides);
}

export function randomResultState() {
  const archetype = archetypePriority[Math.floor(Math.random() * archetypePriority.length)];
  const definition = archetypeRegistry[archetype];
  const signal = Math.random() > 0.5 ? "speculative" : definition.preferredSignal;
  const paletteOptions: PaletteId[] = ["dusk", "electric", "sage"];
  const expressionOptions: ExpressionId[] = ["calm", "mischief", "focused"];
  const accessoryOptions = definition.allowedAccessories.filter(
    (item): item is AccessoryId => item !== undefined
  );

  return getResultState(archetype, signal, {
    palette: paletteOptions[Math.floor(Math.random() * paletteOptions.length)],
    expression: expressionOptions[Math.floor(Math.random() * expressionOptions.length)],
    accessory:
      accessoryOptions[Math.floor(Math.random() * accessoryOptions.length)] ??
      definition.defaultRecipe.accessory
  });
}

export function buildCardHref(state: ResultState) {
  return `/ai-archetype/card?${serializeResultState(state).toString()}`;
}
