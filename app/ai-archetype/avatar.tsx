import { archetypeRegistry, paletteRegistry } from "./data";
import type {
  AccessoryId,
  ArchetypeId,
  AuraId,
  AvatarRecipe,
  FrameId,
  SpriteAccent,
  SpriteHairStyle,
  SpriteHairTone,
  SpriteHeadwear,
  SpriteOutfitStyle,
  SpritePose,
  SpritePropStyle
} from "./types";

type PixelAvatarProps = {
  archetype: ArchetypeId;
  recipe: AvatarRecipe;
  size?: number;
  className?: string;
  label?: string;
};

type PixelRect = {
  x: number;
  y: number;
  w?: number;
  h?: number;
};

const cell = 4;
const viewBoxSize = 136;

function px(x: number, y: number, w = 1, h = 1): PixelRect {
  return { x, y, w, h };
}

function rectKey(rect: PixelRect, index: number) {
  return `${rect.x}-${rect.y}-${rect.w ?? 1}-${rect.h ?? 1}-${index}`;
}

function insetPixels(rects: readonly PixelRect[]) {
  return rects.map((rect) => {
    const width = rect.w ?? 1;
    const height = rect.h ?? 1;
    const insetX = width > 2 ? 1 : 0;
    const insetY = height > 2 ? 1 : 0;

    return {
      x: rect.x + insetX,
      y: rect.y + insetY,
      w: Math.max(1, width - insetX * 2),
      h: Math.max(1, height - insetY * 2)
    };
  });
}

function PixelLayer({
  rects,
  fill,
  opacity = 1
}: {
  rects: readonly PixelRect[];
  fill: string;
  opacity?: number;
}) {
  return rects.map((rect, index) => (
    <rect
      key={rectKey(rect, index)}
      x={rect.x * cell}
      y={rect.y * cell}
      width={(rect.w ?? 1) * cell}
      height={(rect.h ?? 1) * cell}
      fill={fill}
      opacity={opacity}
      shapeRendering="crispEdges"
    />
  ));
}

const faceOutline = [
  px(11, 4, 10, 1),
  px(10, 5, 12, 1),
  px(9, 6, 14, 8),
  px(10, 14, 12, 2),
  px(11, 16, 10, 1)
] as const;

const torsoOutline = [
  px(12, 18, 8, 1),
  px(10, 19, 12, 1),
  px(9, 20, 14, 6),
  px(10, 26, 12, 2)
] as const;

const legOutline = [px(11, 28, 4, 3), px(17, 28, 4, 3)] as const;
const shoeOutline = [px(10, 31, 5, 2), px(17, 31, 5, 2)] as const;
const neckPixels = [px(14, 17, 4, 1)] as const;
const floorShadow = [px(9, 33, 14, 1), px(11, 34, 10, 1)] as const;

const hairToneMap: Record<SpriteHairTone, { base: string; light: string }> = {
  chestnut: {
    base: "#8d4f46",
    light: "#c07a65"
  },
  ink: {
    base: "#283049",
    light: "#48526f"
  },
  charcoal: {
    base: "#3b4259",
    light: "#65708a"
  },
  silver: {
    base: "#b5c4db",
    light: "#dce7f4"
  }
};

function backgroundMarks(aura: AuraId) {
  switch (aura) {
    case "grid":
      return [px(6, 8, 2, 1), px(24, 8, 2, 1), px(6, 23, 2, 1), px(24, 23, 2, 1)];
    case "ripple":
      return [px(5, 11, 3, 1), px(24, 11, 3, 1), px(7, 23, 2, 1), px(22, 23, 2, 1)];
    case "flare":
      return [px(15, 6, 2, 1), px(5, 17, 1, 2), px(26, 17, 1, 2), px(15, 27, 2, 1)];
    case "satellite":
      return [px(6, 10, 2, 1), px(24, 13, 2, 1), px(9, 25, 2, 1), px(21, 25, 2, 1)];
  }
}

function faceEyes(expression: AvatarRecipe["expression"]) {
  switch (expression) {
    case "calm":
      return [px(13, 10, 2, 1), px(17, 10, 2, 1)];
    case "mischief":
      return [px(13, 10, 2, 1), px(17, 10, 1, 1), px(18, 11, 1, 1)];
    default:
      return [px(13, 10, 2, 2), px(17, 10, 2, 2)];
  }
}

function faceBrows(expression: AvatarRecipe["expression"]) {
  switch (expression) {
    case "calm":
      return [px(13, 8, 2, 1), px(17, 8, 2, 1)];
    case "mischief":
      return [px(13, 8, 2, 1), px(17, 8, 1, 1), px(18, 7, 1, 1)];
    default:
      return [px(13, 8, 2, 1), px(17, 8, 2, 1), px(15, 7, 2, 1)];
  }
}

function faceMouth(expression: AvatarRecipe["expression"]) {
  switch (expression) {
    case "calm":
      return [px(14, 13, 4, 1), px(15, 14, 2, 1)];
    case "mischief":
      return [px(14, 13, 2, 1), px(16, 14, 2, 1), px(18, 13, 1, 1)];
    default:
      return [px(14, 13, 4, 1), px(15, 14, 2, 1), px(14, 12, 1, 1), px(17, 12, 1, 1)];
  }
}

function faceCheeks(expression: AvatarRecipe["expression"]) {
  switch (expression) {
    case "focused":
      return [px(11, 12, 1, 1), px(20, 12, 1, 1)];
    default:
      return [px(11, 13, 1, 1), px(20, 13, 1, 1)];
  }
}

function hairPixels(style: SpriteHairStyle) {
  switch (style) {
    case "parted":
      return [px(11, 4, 10, 1), px(10, 5, 5, 2), px(17, 5, 5, 2), px(9, 7, 3, 5), px(20, 7, 3, 5)];
    case "bob":
      return [px(11, 4, 10, 1), px(10, 5, 12, 2), px(9, 7, 14, 2), px(9, 9, 3, 7), px(20, 9, 3, 7)];
    case "tuft":
      return [px(11, 4, 10, 1), px(10, 5, 12, 2), px(9, 7, 14, 2), px(8, 9, 4, 4), px(19, 9, 4, 4), px(14, 3, 4, 1)];
    case "swoop":
      return [px(11, 4, 10, 1), px(10, 5, 12, 2), px(9, 7, 13, 2), px(10, 9, 12, 2), px(9, 10, 3, 4), px(19, 8, 4, 6)];
  }
}

function hairHighlightPixels(style: SpriteHairStyle) {
  switch (style) {
    case "parted":
      return [px(12, 5, 2, 1), px(18, 5, 2, 1)];
    case "bob":
      return [px(13, 5, 4, 1), px(17, 6, 2, 1)];
    case "tuft":
      return [px(14, 4, 2, 1), px(11, 6, 3, 1)];
    case "swoop":
      return [px(12, 5, 5, 1), px(17, 7, 2, 1)];
  }
}

function headwearPixels(type: SpriteHeadwear) {
  switch (type) {
    case "visor-band":
      return {
        outline: [px(10, 8, 12, 1)],
        fill: [px(11, 9, 10, 1)],
        accent: [px(11, 8, 10, 1)]
      };
    case "cap":
      return {
        outline: [px(11, 3, 10, 1), px(10, 4, 12, 2), px(20, 7, 4, 1)],
        fill: [px(11, 4, 10, 2), px(20, 8, 3, 1)],
        accent: [px(12, 4, 8, 1)]
      };
    case "crown":
      return {
        outline: [px(11, 3, 10, 1), px(12, 2, 2, 1), px(15, 1, 2, 1), px(18, 2, 2, 1)],
        fill: [px(12, 3, 8, 1)],
        accent: [px(12, 2, 2, 1), px(15, 1, 2, 1), px(18, 2, 2, 1)]
      };
    default:
      return {
        outline: [],
        fill: [],
        accent: []
      };
  }
}

function outfitDetailPixels(style: SpriteOutfitStyle, accent: SpriteAccent) {
  switch (style) {
    case "blazer":
      return {
        accent: [
          px(14, 20, 2, 5),
          px(12, 21, 2, 3),
          px(18, 21, 2, 3),
          accent === "tie" ? px(15, 20, 2, 6) : px(11, 24, 10, 1),
          accent === "satchel" ? px(18, 23, 3, 2) : px(10, 24, 1, 1)
        ],
        trim: [px(10, 19, 12, 1)]
      };
    case "coat":
      return {
        accent: [px(13, 20, 2, 6), px(17, 20, 2, 6), px(11, 26, 10, 1)],
        trim: [px(10, 19, 12, 1), accent === "lapel" ? px(12, 20, 1, 4) : px(19, 20, 1, 4)]
      };
    case "tunic":
      return {
        accent: [px(12, 21, 8, 1), px(11, 24, 10, 1), px(14, 19, 4, 2)],
        trim: [px(10, 19, 12, 1), accent === "trim" ? px(11, 26, 10, 1) : px(15, 20, 2, 1)]
      };
    case "hoodie":
      return {
        accent: [px(12, 20, 8, 1), px(13, 23, 6, 2), px(11, 19, 2, 2), px(19, 19, 2, 2)],
        trim: [px(10, 19, 12, 1), accent === "tie" ? px(15, 20, 1, 3) : px(16, 20, 1, 3)]
      };
  }
}

function armOutlinePixels(pose: SpritePose) {
  switch (pose) {
    case "open":
      return [px(7, 20, 3, 6), px(22, 20, 3, 6)];
    case "left-prop":
      return [px(7, 20, 3, 7), px(22, 21, 2, 5)];
    case "right-prop":
      return [px(8, 21, 2, 5), px(22, 20, 3, 7)];
    default:
      return [px(8, 20, 2, 6), px(22, 20, 2, 6)];
  }
}

function handPixels(pose: SpritePose) {
  switch (pose) {
    case "left-prop":
      return [px(7, 27, 2, 1), px(22, 25, 2, 1)];
    case "right-prop":
      return [px(8, 25, 2, 1), px(23, 27, 2, 1)];
    case "open":
      return [px(7, 25, 2, 1), px(23, 25, 2, 1)];
    default:
      return [px(8, 26, 2, 1), px(22, 26, 2, 1)];
  }
}

function propPixels(style: SpritePropStyle) {
  switch (style) {
    case "map":
      return {
        outline: [px(24, 17, 5, 1), px(23, 18, 7, 4), px(24, 22, 5, 1)],
        fill: [px(24, 19, 5, 2)],
        accent: [px(25, 18, 1, 4), px(27, 18, 1, 4)]
      };
    case "shield":
      return {
        outline: [px(24, 18, 4, 1), px(23, 19, 6, 4), px(24, 23, 4, 2)],
        fill: [px(24, 19, 4, 4)],
        accent: [px(25, 20, 2, 2)]
      };
    case "spark":
      return {
        outline: [px(24, 18, 1, 4), px(23, 19, 3, 2)],
        fill: [px(26, 18, 2, 1), px(25, 17, 1, 1)],
        accent: [px(27, 19, 2, 1), px(26, 20, 1, 2)]
      };
    case "mirror":
      return {
        outline: [px(24, 17, 4, 1), px(23, 18, 6, 5), px(24, 23, 4, 1), px(25, 24, 1, 2)],
        fill: [px(24, 19, 4, 3)],
        accent: [px(25, 19, 1, 3), px(27, 20, 1, 1)]
      };
    case "toolkit":
      return {
        outline: [px(24, 21, 5, 1), px(23, 22, 7, 3), px(25, 20, 3, 1)],
        fill: [px(24, 22, 5, 2)],
        accent: [px(26, 21, 1, 3), px(23, 23, 1, 1)]
      };
    case "baton":
      return {
        outline: [px(24, 22, 6, 1), px(28, 20, 1, 5)],
        fill: [px(25, 22, 4, 1)],
        accent: [px(29, 19, 1, 2)]
      };
    case "flask":
      return {
        outline: [px(24, 18, 3, 1), px(23, 19, 5, 5), px(24, 24, 3, 1)],
        fill: [px(24, 20, 3, 3)],
        accent: [px(24, 23, 3, 1), px(25, 17, 1, 2)]
      };
    case "megaphone":
      return {
        outline: [px(23, 20, 3, 1), px(24, 19, 5, 1), px(25, 18, 5, 1), px(28, 17, 2, 1), px(24, 21, 2, 2)],
        fill: [px(25, 19, 3, 2), px(28, 18, 1, 1)],
        accent: [px(23, 21, 1, 2), px(29, 18, 1, 1)]
      };
  }
}

function accessoryOverlay(accessory: AccessoryId) {
  switch (accessory) {
    case "visor":
      return {
        outline: [px(10, 9, 12, 1), px(11, 10, 10, 1)],
        fill: [px(11, 9, 10, 1)],
        accent: [px(13, 10, 6, 1)]
      };
    case "headset":
      return {
        outline: [px(9, 9, 1, 4), px(22, 9, 1, 4), px(10, 8, 12, 1)],
        fill: [px(9, 10, 1, 2), px(22, 10, 1, 2)],
        accent: [px(22, 12, 2, 1), px(23, 13, 1, 1)]
      };
    case "star":
      return {
        outline: [px(21, 5, 1, 1), px(23, 5, 1, 1), px(21, 7, 1, 1), px(23, 7, 1, 1)],
        fill: [px(22, 4, 1, 4), px(21, 6, 3, 1)],
        accent: [px(22, 6, 1, 1)]
      };
    default:
      return {
        outline: [],
        fill: [],
        accent: []
      };
  }
}

function frameGradient(frame: FrameId, background: string) {
  if (frame === "beacon") {
    return `radial-gradient(circle at 20% 18%, rgba(126,245,255,0.28), transparent 24%), radial-gradient(circle at 82% 18%, rgba(241,179,109,0.24), transparent 26%), ${background}`;
  }

  return `radial-gradient(circle at 24% 22%, rgba(255,255,255,0.62), transparent 18%), radial-gradient(circle at 78% 76%, rgba(139,166,255,0.12), transparent 22%), ${background}`;
}

function activeHeadwear(defaultHeadwear: SpriteHeadwear, accessory: AccessoryId) {
  if (accessory === "visor") {
    return "visor-band";
  }

  return defaultHeadwear;
}

function topTrimPixels(headwear: SpriteHeadwear) {
  if (headwear === "cap" || headwear === "crown") {
    return [px(12, 3, 8, 1)];
  }

  return [];
}

export function PixelAvatar({
  archetype,
  recipe,
  size = 240,
  className,
  label
}: PixelAvatarProps) {
  const definition = archetypeRegistry[archetype];
  const palette = paletteRegistry.find((item) => item.id === recipe.palette) ?? paletteRegistry[0];
  const hairTone = hairToneMap[definition.sprite.hairTone];
  const headwear = headwearPixels(
    activeHeadwear(definition.sprite.headwear, recipe.accessory)
  );
  const outfitDetails = outfitDetailPixels(
    definition.sprite.outfit,
    definition.sprite.accent
  );
  const arms = armOutlinePixels(definition.sprite.pose);
  const hands = handPixels(definition.sprite.pose);
  const prop = propPixels(definition.sprite.prop);
  const accessory = accessoryOverlay(recipe.accessory);

  return (
    <div
      aria-label={label ?? `${definition.title} avatar`}
      role="img"
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "26px",
        border: "1px solid rgba(16,16,16,0.08)",
        background: frameGradient(recipe.frame, palette.background),
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.72), 0 18px 50px rgba(16,16,16,0.08)",
        padding: "12px"
      }}
    >
      <svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        <rect
          x="4"
          y="4"
          width="128"
          height="128"
          rx="18"
          fill="rgba(255,255,255,0.48)"
          stroke="rgba(16,16,16,0.08)"
          strokeWidth="1"
        />
        <PixelLayer rects={backgroundMarks(recipe.aura)} fill={palette.aura} opacity={0.3} />
        <PixelLayer rects={floorShadow} fill="rgba(16,16,16,0.12)" />
        <PixelLayer rects={faceOutline} fill="#243047" />
        <PixelLayer rects={insetPixels(faceOutline)} fill={palette.face} />
        <PixelLayer rects={hairPixels(definition.sprite.hair)} fill={hairTone.base} />
        <PixelLayer
          rects={hairHighlightPixels(definition.sprite.hair)}
          fill={hairTone.light}
          opacity={0.95}
        />
        <PixelLayer
          rects={topTrimPixels(definition.sprite.headwear)}
          fill={hairTone.light}
          opacity={0.6}
        />
        <PixelLayer rects={headwear.outline} fill="#243047" />
        <PixelLayer rects={headwear.fill} fill={palette.face} />
        <PixelLayer rects={headwear.accent} fill={palette.accent} />
        <PixelLayer rects={neckPixels} fill={palette.face} />
        <PixelLayer rects={arms} fill="#243047" />
        <PixelLayer rects={insetPixels(arms)} fill={palette.body} />
        <PixelLayer rects={torsoOutline} fill="#243047" />
        <PixelLayer rects={insetPixels(torsoOutline)} fill={palette.body} />
        <PixelLayer rects={outfitDetails.accent} fill={palette.accent} opacity={0.95} />
        <PixelLayer rects={outfitDetails.trim} fill="rgba(255,255,255,0.24)" opacity={0.84} />
        <PixelLayer rects={legOutline} fill="#243047" />
        <PixelLayer rects={insetPixels(legOutline)} fill="#324566" />
        <PixelLayer rects={shoeOutline} fill="#243047" />
        <PixelLayer rects={insetPixels(shoeOutline)} fill="#e7edf5" />
        <PixelLayer rects={faceBrows(recipe.expression)} fill="#243047" />
        <PixelLayer rects={faceEyes(recipe.expression)} fill="#243047" />
        <PixelLayer rects={faceCheeks(recipe.expression)} fill={palette.accent} opacity={0.34} />
        <PixelLayer rects={faceMouth(recipe.expression)} fill="#243047" />
        <PixelLayer rects={hands} fill={palette.face} />
        <PixelLayer rects={prop.outline} fill="#243047" />
        <PixelLayer rects={prop.fill} fill="#f4f7fb" />
        <PixelLayer rects={prop.accent} fill={palette.accent} />
        <PixelLayer rects={accessory.outline} fill="#243047" />
        <PixelLayer rects={accessory.fill} fill={palette.aura} opacity={0.94} />
        <PixelLayer rects={accessory.accent} fill={palette.accent} />
      </svg>
    </div>
  );
}
