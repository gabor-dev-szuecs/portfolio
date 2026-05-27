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

// Portrait canvas: 540×900
const CANVAS_W = 540;
const NODE_W = 460;
const NODE_H = 108;
const ARROW_H = 50;
const OFFSET_X = (CANVAS_W - NODE_W) / 2; // 40px margin each side

// Y positions: title zone 0–140, nodes start at 148
const START_Y = 148;
const nodeY = (i: number) => START_Y + i * (NODE_H + ARROW_H);
const arrowY = (i: number) => nodeY(i) + NODE_H;

const NODES = [
  {
    title: "Backend Core",
    color: ACCENT,
    items: ["Java 21 · Spring Boot", "Spring Security · Spring Data JPA"],
  },
  {
    title: "API Layer",
    color: "#60a5fa",
    items: ["REST APIs · Spring Scheduler", "WebClient · Virtual Threads"],
  },
  {
    title: "Integrations",
    color: "#f59e0b",
    items: ["Oxaion ERP · Billbee · Magento 2", "SPS/TCP · LDAP · OAuth2"],
  },
  {
    title: "Data & Infra",
    color: "#a78bfa",
    items: ["PostgreSQL · MSSQL · IBM DB2", "Docker · GitLab · Grafana"],
  },
];

const NODE_APPEAR = [8, 44, 80, 116];
const ARROW_APPEAR = [24, 60, 96];
const PULSE_START = 140;

function NodeCard({ node, spr, idx }: { node: (typeof NODES)[0]; spr: number; idx: number }) {
  const opacity = spr;
  const translateY = interpolate(spr, [0, 1], [14, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: OFFSET_X,
        top: nodeY(idx),
        width: NODE_W,
        height: NODE_H,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: CARD_BG,
          border: `1px solid ${RULE}`,
          borderLeft: `3px solid ${node.color}`,
          borderRadius: 8,
          padding: "12px 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontSize: 13,
            fontWeight: 700,
            color: node.color,
            letterSpacing: "0.07em",
            textTransform: "uppercase" as const,
            marginBottom: 2,
          }}
        >
          {node.title}
        </div>
        {node.items.map((item) => (
          <div
            key={item}
            style={{
              fontFamily: jetbrains,
              fontSize: 12,
              color: TEXT_SOFT,
              lineHeight: 1.5,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrowDown({ progress, idx }: { progress: number; idx: number }) {
  const y0 = arrowY(idx);
  const lineH = ARROW_H - 12;
  const dashProgress = interpolate(progress, [0, 1], [lineH, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headOp = interpolate(progress, [0.7, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cx = CANVAS_W / 2;

  return (
    <svg
      style={{ position: "absolute", left: 0, top: y0, overflow: "visible" }}
      width={CANVAS_W}
      height={ARROW_H}
    >
      <line
        x1={cx}
        y1={6}
        x2={cx}
        y2={ARROW_H - 6}
        stroke={RULE}
        strokeWidth={1.5}
        strokeDasharray={lineH}
        strokeDashoffset={dashProgress}
      />
      <polygon
        points={`${cx - 6},${ARROW_H - 8} ${cx},${ARROW_H} ${cx + 6},${ARROW_H - 8}`}
        fill={TEXT_MUTE}
        opacity={headOp}
      />
    </svg>
  );
}

function DataPulse({ idx, frame }: { idx: number; frame: number }) {
  const y0 = arrowY(idx) + 6;
  const yEnd = arrowY(idx) + ARROW_H - 10;
  const cx = CANVAS_W / 2;

  const phaseOffset = idx * 16;
  const period = 50;
  const t = ((frame - PULSE_START - phaseOffset) % period + period) % period;
  if (t > 34) return null;

  const py = interpolate(t, [0, 34], [y0, yEnd], {
    easing: Easing.inOut(Easing.ease),
  });
  const op = interpolate(t, [0, 4, 26, 34], [0, 1, 1, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: cx - 3,
        top: py - 3,
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

export const SystemDiagramMobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  const nodeSprings = NODE_APPEAR.map((startF) =>
    spring({ frame: frame - startF, fps, config: { damping: 24, stiffness: 90 } })
  );

  const arrowProgress = ARROW_APPEAR.map((startF) =>
    interpolate(frame, [startF, startF + 16], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    })
  );

  const allVisible = frame >= PULSE_START;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            "linear-gradient(rgba(243,239,231,0.03) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(243,239,231,0.03) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "60px 60px",
          opacity: titleOp,
        }}
      />

      {/* Label */}
      <div
        style={{
          position: "absolute",
          top: 52,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: jetbrains,
          fontSize: 10,
          letterSpacing: "0.14em",
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
          top: 76,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: inter,
          fontSize: 20,
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
        <ArrowDown key={i} progress={arrowProgress[i]} idx={i} />
      ))}

      {/* Nodes */}
      {NODES.map((node, i) => (
        <NodeCard key={node.title} node={node} spr={nodeSprings[i]} idx={i} />
      ))}

      {/* Pulses */}
      {allVisible && [0, 1, 2].map((i) => (
        <DataPulse key={i} idx={i} frame={frame} />
      ))}

      {/* Caption */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: jetbrains,
          fontSize: 10,
          color: TEXT_MUTE,
          letterSpacing: "0.06em",
          opacity: interpolate(frame, [130, 145], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Java · Spring Boot · Docker · PostgreSQL · ERP
      </div>
    </AbsoluteFill>
  );
};
