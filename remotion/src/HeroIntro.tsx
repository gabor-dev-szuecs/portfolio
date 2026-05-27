import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily: fraunces } = loadFraunces();
const { fontFamily: inter } = loadInter();
const { fontFamily: jetbrains } = loadJetBrains();

const BG = "#0e0d0c";
const ACCENT = "#4db87a";
const TEXT = "#f3efe7";
const TEXT_SOFT = "#c9c2b3";
const TEXT_MUTE = "#8a8273";

const FULL_NAME = "Gabor Szücs";
const TAGLINE = "Connecting systems, APIs and intelligent workflows.";
const TAGLINE_FRAME = 84;

export const HeroIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // BG fade in
  const bgOp = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  // Typewriter name: frame 14 → 54
  const charsVisible = Math.floor(
    interpolate(frame, [14, 54], [0, FULL_NAME.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const cursorBlink = Math.floor(frame / 10) % 2 === 0;
  const showCursor = frame < 60;

  // Accent line: frame 56 → 74
  const lineW = interpolate(frame, [56, 74], [0, 320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Role spring: starts frame 68
  const roleSpr = spring({ frame: frame - 68, fps, config: { damping: 24, stiffness: 90 } });
  const roleY = interpolate(roleSpr, [0, 1], [22, 0]);
  const roleOp = interpolate(frame, [68, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Grid opacity — very subtle
  const gridOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        opacity: bgOp,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Subtle engineering grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: gridOp * 0.6,
          backgroundImage: [
            "linear-gradient(rgba(243,239,231,0.045) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(243,239,231,0.045) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "80px 80px",
        }}
      />

      {/* Accent corner dots */}
      {[
        { top: 40, left: 40 },
        { top: 40, right: 40 },
        { bottom: 40, left: 40 },
        { bottom: 40, right: 40 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: ACCENT,
            opacity: interpolate(frame, [20 + i * 5, 30 + i * 5], [0, 0.5], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            ...pos,
          }}
        />
      ))}

      {/* Center content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Name */}
        <h1
          style={{
            margin: 0,
            fontSize: 88,
            fontWeight: 300,
            color: TEXT,
            fontFamily: fraunces,
            letterSpacing: "-0.025em",
            lineHeight: 1,
            height: 100,
            display: "flex",
            alignItems: "center",
          }}
        >
          {FULL_NAME.slice(0, charsVisible)}
          {showCursor && (
            <span
              style={{
                color: ACCENT,
                opacity: cursorBlink ? 1 : 0,
                marginLeft: 3,
                fontWeight: 100,
                fontSize: 80,
              }}
            >
              |
            </span>
          )}
        </h1>

        {/* Accent line */}
        <div
          style={{
            height: 2,
            width: lineW,
            backgroundColor: ACCENT,
            borderRadius: 1,
            marginTop: 10,
            marginBottom: 24,
            alignSelf: "flex-start",
          }}
        />

        {/* Role */}
        <div
          style={{
            fontSize: 22,
            color: TEXT_SOFT,
            fontFamily: inter,
            fontWeight: 400,
            letterSpacing: "0.005em",
            opacity: roleOp,
            transform: `translateY(${roleY}px)`,
            alignSelf: "flex-start",
          }}
        >
          Backend Engineer
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 24,
            alignSelf: "flex-start",
            fontFamily: jetbrains,
            fontSize: 13,
            letterSpacing: "0.06em",
            color: ACCENT,
            opacity: interpolate(frame, [TAGLINE_FRAME, TAGLINE_FRAME + 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {TAGLINE}
        </div>
      </div>
    </AbsoluteFill>
  );
};
