import type {
  ArchetypeDefinition,
  ArchetypeId,
  PaletteDefinition,
  QuizQuestion
} from "./types";

export const archetypePriority: ArchetypeId[] = [
  "cartographer",
  "guardian",
  "dreamer",
  "mirror",
  "tinkerer",
  "conductor",
  "alchemist",
  "catalyst"
];

export const paletteRegistry: PaletteDefinition[] = [
  {
    id: "dusk",
    label: "Dusk",
    body: "#2d3157",
    accent: "#f1b36d",
    outline: "#161728",
    face: "#f5e8d1",
    aura: "#8ba6ff",
    background: "#efe7dc"
  },
  {
    id: "electric",
    label: "Electric",
    body: "#1760d1",
    accent: "#f5d94e",
    outline: "#0d204d",
    face: "#f6ead7",
    aura: "#7ef5ff",
    background: "#eef4fb"
  },
  {
    id: "sage",
    label: "Sage",
    body: "#4c7561",
    accent: "#f0ba73",
    outline: "#22352b",
    face: "#f5e8d4",
    aura: "#a7dbc0",
    background: "#edf1ea"
  }
];

export const archetypeRegistry: Record<ArchetypeId, ArchetypeDefinition> = {
  cartographer: {
    id: "cartographer",
    name: "Cartographer",
    title: "The Cartographer",
    oneLiner: "You like to understand the system before you act.",
    traits: ["Sees patterns", "Works carefully", "Good with ambiguity"],
    labLine: "In your lab, you often turn messy information into a clear map.",
    axis: { drive: "observe", method: "structure", orbit: "solo" },
    preferredSignal: "grounded",
    defaultRecipe: {
      palette: "dusk",
      expression: "focused",
      accessory: "visor",
      aura: "grid"
    },
    sprite: {
      hair: "parted",
      hairTone: "chestnut",
      headwear: "none",
      outfit: "blazer",
      prop: "map",
      pose: "left-prop",
      accent: "satchel"
    },
    allowedAccessories: ["visor", "headset", "none"]
  },
  guardian: {
    id: "guardian",
    name: "Guardian",
    title: "The Guardian",
    oneLiner: "You help teams move forward without losing structure.",
    traits: ["Reliable", "Calm under pressure", "Protects quality"],
    labLine: "In your lab, you often keep the standards, timing, and people aligned.",
    axis: { drive: "observe", method: "structure", orbit: "social" },
    preferredSignal: "grounded",
    defaultRecipe: {
      palette: "sage",
      expression: "calm",
      accessory: "headset",
      aura: "satellite"
    },
    sprite: {
      hair: "parted",
      hairTone: "ink",
      headwear: "none",
      outfit: "coat",
      prop: "shield",
      pose: "open",
      accent: "lapel"
    },
    allowedAccessories: ["headset", "star", "none"]
  },
  dreamer: {
    id: "dreamer",
    name: "Dreamer",
    title: "The Dreamer",
    oneLiner: "You keep unusual ideas alive long enough to see what they can become.",
    traits: ["Imaginative", "Future-facing", "Comfortable exploring"],
    labLine: "In your lab, you often notice the next direction before other people do.",
    axis: { drive: "observe", method: "flux", orbit: "solo" },
    preferredSignal: "speculative",
    defaultRecipe: {
      palette: "dusk",
      expression: "mischief",
      accessory: "star",
      aura: "ripple"
    },
    sprite: {
      hair: "bob",
      hairTone: "chestnut",
      headwear: "crown",
      outfit: "tunic",
      prop: "spark",
      pose: "left-prop",
      accent: "trim"
    },
    allowedAccessories: ["star", "visor", "none"]
  },
  mirror: {
    id: "mirror",
    name: "Mirror",
    title: "The Mirror",
    oneLiner: "You quickly understand the mood, needs, and direction of a group.",
    traits: ["Reads people well", "Context-aware", "Good with nuance"],
    labLine: "In your lab, you often name what the room is feeling before anyone says it out loud.",
    axis: { drive: "observe", method: "flux", orbit: "social" },
    preferredSignal: "speculative",
    defaultRecipe: {
      palette: "sage",
      expression: "focused",
      accessory: "star",
      aura: "satellite"
    },
    sprite: {
      hair: "swoop",
      hairTone: "charcoal",
      headwear: "none",
      outfit: "coat",
      prop: "mirror",
      pose: "open",
      accent: "trim"
    },
    allowedAccessories: ["star", "headset", "none"]
  },
  tinkerer: {
    id: "tinkerer",
    name: "Tinkerer",
    title: "The Tinkerer",
    oneLiner: "You learn best by building, testing, and improving.",
    traits: ["Hands-on", "Practical", "Moves fast"],
    labLine: "In your lab, you often turn a sketch into a working prototype very quickly.",
    axis: { drive: "act", method: "structure", orbit: "solo" },
    preferredSignal: "grounded",
    defaultRecipe: {
      palette: "electric",
      expression: "focused",
      accessory: "visor",
      aura: "grid"
    },
    sprite: {
      hair: "tuft",
      hairTone: "ink",
      headwear: "visor-band",
      outfit: "hoodie",
      prop: "toolkit",
      pose: "left-prop",
      accent: "lapel"
    },
    allowedAccessories: ["visor", "headset", "none"]
  },
  conductor: {
    id: "conductor",
    name: "Conductor",
    title: "The Conductor",
    oneLiner: "You help people, timing, and work move together.",
    traits: ["Organized", "Clear communicator", "Strong coordinator"],
    labLine: "In your lab, you often align people and pace before the work drifts.",
    axis: { drive: "act", method: "structure", orbit: "social" },
    preferredSignal: "grounded",
    defaultRecipe: {
      palette: "electric",
      expression: "calm",
      accessory: "headset",
      aura: "flare"
    },
    sprite: {
      hair: "parted",
      hairTone: "charcoal",
      headwear: "visor-band",
      outfit: "blazer",
      prop: "baton",
      pose: "open",
      accent: "tie"
    },
    allowedAccessories: ["headset", "visor", "none"]
  },
  alchemist: {
    id: "alchemist",
    name: "Alchemist",
    title: "The Alchemist",
    oneLiner: "You combine fragments and instinct into new ideas that work.",
    traits: ["Experimental", "Energetic", "Likes leaps"],
    labLine: "In your lab, you often turn rough pieces into a new direction.",
    axis: { drive: "act", method: "flux", orbit: "solo" },
    preferredSignal: "speculative",
    defaultRecipe: {
      palette: "dusk",
      expression: "mischief",
      accessory: "visor",
      aura: "flare"
    },
    sprite: {
      hair: "swoop",
      hairTone: "silver",
      headwear: "none",
      outfit: "tunic",
      prop: "flask",
      pose: "right-prop",
      accent: "trim"
    },
    allowedAccessories: ["visor", "star", "none"]
  },
  catalyst: {
    id: "catalyst",
    name: "Catalyst",
    title: "The Catalyst",
    oneLiner: "You create momentum and help ideas spread through a group.",
    traits: ["High energy", "Social", "Good at starting motion"],
    labLine: "In your lab, you often create the moment when talk becomes action.",
    axis: { drive: "act", method: "flux", orbit: "social" },
    preferredSignal: "speculative",
    defaultRecipe: {
      palette: "electric",
      expression: "mischief",
      accessory: "star",
      aura: "flare"
    },
    sprite: {
      hair: "tuft",
      hairTone: "chestnut",
      headwear: "cap",
      outfit: "hoodie",
      prop: "megaphone",
      pose: "open",
      accent: "tie"
    },
    allowedAccessories: ["star", "headset", "none"]
  }
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "drive-1",
    eyebrow: "Question 1 of 7",
    prompt: "A new AI idea arrives. What do you do first?",
    answers: [
      {
        id: "map-first",
        label: "Study it first",
        description: "You want to understand the pattern before you act.",
        effects: { observe: 1 }
      },
      {
        id: "ship-first",
        label: "Try it right away",
        description: "You trust it more after you test it in the real world.",
        effects: { act: 1 }
      }
    ]
  },
  {
    id: "method-1",
    eyebrow: "Question 2 of 7",
    prompt: "When the path is unclear, what helps you most?",
    answers: [
      {
        id: "scaffold",
        label: "A clear structure",
        description: "You like a simple framework, even if you change it later.",
        effects: { structure: 1 }
      },
      {
        id: "spark",
        label: "An interesting spark",
        description: "You follow the strong clue and shape the work as you go.",
        effects: { flux: 1 }
      }
    ]
  },
  {
    id: "orbit-1",
    eyebrow: "Question 3 of 7",
    prompt: "When do you do your best work?",
    answers: [
      {
        id: "alone-lab",
        label: "Working alone first",
        description: "You like to make the idea clear before sharing it.",
        effects: { solo: 1 }
      },
      {
        id: "with-room",
        label: "Working with people",
        description: "You think best when ideas are moving between people in real time.",
        effects: { social: 1 }
      }
    ]
  },
  {
    id: "drive-2",
    eyebrow: "Question 4 of 7",
    prompt: "A good idea starts to wobble. What do you do?",
    answers: [
      {
        id: "study-wobble",
        label: "Study the problem",
        description: "You want to learn what the instability is telling you.",
        effects: { observe: 1 }
      },
      {
        id: "stress-test",
        label: "Test it under pressure",
        description: "You want evidence as quickly as possible.",
        effects: { act: 1 }
      }
    ]
  },
  {
    id: "method-2",
    eyebrow: "Question 5 of 7",
    prompt: "Your notes usually look more like...",
    answers: [
      {
        id: "index-cards",
        label: "An organized stack",
        description: "You use structure to keep ideas clear and moving.",
        effects: { structure: 1 }
      },
      {
        id: "constellation",
        label: "A loose cluster",
        description: "You let small pieces connect before you organize them.",
        effects: { flux: 1 }
      }
    ]
  },
  {
    id: "orbit-2",
    eyebrow: "Question 6 of 7",
    prompt: "When progress depends on alignment, what feels more natural?",
    answers: [
      {
        id: "refine-privately",
        label: "Think it through alone first",
        description: "You like to bring in others after the idea feels clearer.",
        effects: { solo: 1 }
      },
      {
        id: "rally-people",
        label: "Talk it through with people",
        description: "You like to sharpen the idea through live conversation.",
        effects: { social: 1 }
      }
    ]
  },
  {
    id: "signal",
    eyebrow: "Question 7 of 7",
    prompt: "Which kind of signal do you trust more?",
    answers: [
      {
        id: "grounded",
        label: "Clear proof",
        description: "You trust signals that can stand up to review and scale.",
        effects: { grounded: 1 }
      },
      {
        id: "speculative",
        label: "Strong possibility",
        description: "You are willing to follow an idea before it is fully proven.",
        effects: { speculative: 1 }
      }
    ]
  }
];
