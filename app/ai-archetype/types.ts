export type ArchetypeId =
  | "cartographer"
  | "guardian"
  | "dreamer"
  | "mirror"
  | "tinkerer"
  | "conductor"
  | "alchemist"
  | "catalyst";

export type SignalFlavor = "grounded" | "speculative";
export type PaletteId = "dusk" | "electric" | "sage";
export type ExpressionId = "calm" | "mischief" | "focused";
export type AccessoryId = "visor" | "headset" | "star" | "none";
export type AuraId = "grid" | "ripple" | "flare" | "satellite";
export type FrameId = "archive" | "beacon";
export type SpriteHairStyle = "parted" | "bob" | "tuft" | "swoop";
export type SpriteHairTone = "chestnut" | "ink" | "charcoal" | "silver";
export type SpriteHeadwear = "none" | "visor-band" | "cap" | "crown";
export type SpriteOutfitStyle = "blazer" | "coat" | "tunic" | "hoodie";
export type SpritePropStyle =
  | "map"
  | "shield"
  | "spark"
  | "mirror"
  | "toolkit"
  | "baton"
  | "flask"
  | "megaphone";
export type SpritePose = "neutral" | "open" | "left-prop" | "right-prop";
export type SpriteAccent = "tie" | "satchel" | "lapel" | "trim";

export type AxisPole =
  | "observe"
  | "act"
  | "structure"
  | "flux"
  | "solo"
  | "social";

export type AxisKey = "drive" | "method" | "orbit";

export type QuizEffects = Partial<Record<AxisPole | SignalFlavor, number>>;

export type QuizAnswer = {
  id: string;
  label: string;
  description: string;
  effects: QuizEffects;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  eyebrow: string;
  answers: [QuizAnswer, QuizAnswer];
};

export type AvatarRecipe = {
  palette: PaletteId;
  expression: ExpressionId;
  accessory: AccessoryId;
  aura: AuraId;
  frame: FrameId;
};

export type ResultState = {
  archetype: ArchetypeId;
  signal: SignalFlavor;
  recipe: AvatarRecipe;
};

export type ScoreTally = Record<AxisPole | SignalFlavor, number>;

export type AxisScores = {
  drive: number;
  method: number;
  orbit: number;
  signal: number;
};

export type ArchetypeDefinition = {
  id: ArchetypeId;
  name: string;
  title: string;
  oneLiner: string;
  traits: [string, string, string];
  labLine: string;
  axis: {
    drive: "observe" | "act";
    method: "structure" | "flux";
    orbit: "solo" | "social";
  };
  preferredSignal: SignalFlavor;
  defaultRecipe: Pick<AvatarRecipe, "palette" | "expression" | "accessory" | "aura">;
  sprite: {
    hair: SpriteHairStyle;
    hairTone: SpriteHairTone;
    headwear: SpriteHeadwear;
    outfit: SpriteOutfitStyle;
    prop: SpritePropStyle;
    pose: SpritePose;
    accent: SpriteAccent;
  };
  allowedAccessories: AccessoryId[];
};

export type PaletteDefinition = {
  id: PaletteId;
  label: string;
  body: string;
  accent: string;
  outline: string;
  face: string;
  aura: string;
  background: string;
};
