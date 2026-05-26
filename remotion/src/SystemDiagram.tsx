import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily: inter } = loadInter();
const { fontFamily: jetbrains } = loadJetBrains();

const BG = "#0e0d0c";
const ACCENT = "#4db87a";
const ACCENT_DIM = "#2d8653";
const TEXT = "#f3efe7";
const TEXT_SOFT = "#c9c2b3";
const TEXT_MUTE = "#8a8273";
const CARD_BG = "#131110";
const RULE = "#2a2723";

const NODE_W = 224;
const NODE_H = 134;
const ARROW_GAP = 64;
const TOTAL_W = 4 * NODE_W + 3 * ARROW_GAP; // 896 + 192 = 1088
const OFFSET_X = (1280 - TOTAL_W) / 2; // 96
const CENTER_Y = (540 - NODE_H) / 2; // 203

const NODES = [
  {
    title: "Backend Core",
    color: ACCENT,
    items: ["Java 21 · Spring Boot", "Spring Security", "Spring Data JPA"],
  },
  {
    title: "API Layer",
    color: "#60a5fa",
    items: ["REST APIs · WebClient", "Spring Scheduler", "Virtual Threads"],
  },
  {
    title: "Integrations",
    color: "#f59e0b",
    items: ["Oxaion ERP · Billbee", "Magento 2 · SPS/TCP", "LDAP · OAuth2"],
  },
  {
    title: "Data & Infra",
    color: "#a78bfa",
    items: ["PostgreSQL · MSSQL", "Docker · GitLab", "Grafana · Nexus"],
  },
];

const NODE_APPEAR = [8, 48, 88, 128];
const ARROW_APPEAR = [28, 68, 108];
const PULSE_START = 155;

function NodeCard({
  node,
  spr,
  x,
}: {
  node: (typeof NODES)[0];
  spr: number;
  x: number;
}) {
  const opacity = spr;
  const translateY = interpolate(spr, [0, 1], [18, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: CENTER_Y,
        width: NODE_W,
        height: NODE_H,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {/* Card */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: CARD_BG,
          border: `1px solid ${RULE}`,
          borderTop: `2px solid ${node.color}`,
          borderRadius: 6,
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontSize: 11,
            fontWeight: 700,
            color: node.color,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            marginBottom: 9,
          }}
        >
          {node.title}
        </div>
        {node.items.map((item) => (
          <div
            key={item}
            style={{
              fontFamily: jetbrains,
              fontSize: 11,
              color: TEXT_SOFT,
              lineHeight: 1.75,
              whiteSpace: "nowrap" as const,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrowLine({
  progress,
  x,
}: {
  progress: number;
  x: number;
}) {
  const lineLen = ARROW_GAP - 16;
  const dashProgress = interpolate(progress, [0, 1], [lineLen, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headOp = interpolate(progress, [0.7, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x + NODE_W,
        top: CENTER_Y + NODE_H / 2 - 12,
        width: ARROW_GAP,
        height: 24,
        display: "flex",
        alignItems: "center",
      }}
    >
      <svg
        width={ARROW_GAP}
        height={24}
        style={{ overflow: "visible" }}
      >
        <line
          x1={8}
          y1={12}
          x2={ARROW_GAP - 8}
          y2={12}
          stroke={RULE}
          strokeWidth={1.5}
          strokeDasharray={lineLen}
          strokeDashoffset={dashProgress}
        />
        <polygon
          points={`${ARROW_GAP - 8},8 ${ARROW_GAP},12 ${ARROW_GAP - 8},16`}
          fill={TEXT_MUTE}
          opacity={headOp}
        />
      </svg>
    </div>
  );
}

function DataPulse({
  arrowIndex,
  frame,
  allVisible,
}: {
  arrowIndex: number;
  frame: number;
  allVisible: boolean;
}) {
  if (!allVisible) return null;

  const x0 = OFFSET_X + arrowIndex * (NODE_W + ARROW_GAP) + NODE_W;
  const xEnd = x0 + ARROW_GAP - 12;
  const y = CENTER_Y + NODE_H / 2;

  // Stagger each arrow's pulse by arrowIndex * 18 frames
  const phaseOffset = arrowIndex * 18;
  const period = 54;
  const t = ((frame - PULSE_START - phaseOffset) % period + period) % period;

  if (t > 36) return null;

  const px = interpolate(t, [0, 36], [x0 + 8, xEnd], {
    easing: Easing.inOut(Easing.ease),
  });
  const op = interpolate(t, [0, 4, 28, 36], [0, 1, 1, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: px - 3,
        top: y - 3,
        width: 6,
        height: 6,
        borderRadius: "50%",
        backgroundColor: ACCENT,
        opacity: op,
        boxShadow: `0 0 8px ${ACCENT}, 0 0 16px ${ACCENT_DIM}`,
      }}
    />
  );
}

export const SystemDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title fade
  const titleOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // Node springs
  const nodeSprings = NODE_APPEAR.map((startF) =>
    spring({ frame: frame - startF, fps, config: { damping: 24, stiffness: 90 } })
  );

  // Arrow progress
  const arrowProgress = ARROW_APPEAR.map((startF) =>
    interpolate(frame, [startF, startF + 18], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    })
  );

  const allVisible = frame >= PULSE_START;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            "linear-gradient(rgba(243,239,231,0.03) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(243,239,231,0.03) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "80px 80px",
          opacity: titleOp,
        }}
      />

      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 52,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: jetbrains,
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase" as const,
          color: TEXT_MUTE,
          opacity: titleOp,
        }}
      >
        System Architecture
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 74,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: inter,
          fontSize: 22,
          fontWeight: 300,
          color: TEXT,
          letterSpacing: "-0.01em",
          opacity: titleOp,
        }}
      >
        How the systems connect
      </div>

      {/* Arrows */}
      {ARROW_APPEAR.map((_, i) => (
        <ArrowLine
          key={i}
          progress={arrowProgress[i]}
          x={OFFSET_X + i * (NODE_W + ARROW_GAP)}
        />
      ))}

      {/* Node cards */}
      {NODES.map((node, i) => (
        <NodeCard
          key={node.title}
          node={node}
          spr={nodeSprings[i]}
          x={OFFSET_X + i * (NODE_W + ARROW_GAP)}
        />
      ))}

      {/* Data pulses */}
      {[0, 1, 2].map((i) => (
        <DataPulse key={i} arrowIndex={i} frame={frame} allVisible={allVisible} />
      ))}

      {/* Bottom caption */}
      <div
        style={{
          position: "absolute",
          bottom: 44,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: jetbrains,
          fontSize: 11,
          color: TEXT_MUTE,
          letterSpacing: "0.06em",
          opacity: interpolate(frame, [145, 160], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Java · Spring Boot · Docker · PostgreSQL · ERP Integration
      </div>
    </AbsoluteFill>
  );
};
