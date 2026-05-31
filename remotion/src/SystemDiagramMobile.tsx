import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
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

const NODE_W = 320;
const NODE_H = 96;
const ARROW_GAP = 36;
const OFFSET_X = (390 - NODE_W) / 2;
const TOTAL_H = 4 * NODE_H + 3 * ARROW_GAP;
const OFFSET_Y = (700 - TOTAL_H) / 2 + 24;

const NODES = [
  {
    title: "Backend Core",
    color: ACCENT,
    items: ["Java 21 · Spring Boot", "Spring Security · Spring Data JPA"],
  },
  {
    title: "API Layer",
    color: "#60a5fa",
    items: ["REST APIs · WebClient", "Spring Scheduler · Virtual Threads"],
  },
  {
    title: "Integrations",
    color: "#f59e0b",
    items: ["Oxaion ERP · Billbee", "Magento 2 · SPS/TCP · LDAP · OAuth2"],
  },
  {
    title: "Data & Infra",
    color: "#a78bfa",
    items: ["PostgreSQL · MSSQL · IBM DB2", "Docker · GitLab · Grafana · Nexus"],
  },
];

function NodeCard({ node, y }: { node: (typeof NODES)[0]; y: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: OFFSET_X,
        top: y,
        width: NODE_W,
        height: NODE_H,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: CARD_BG,
          border: `1px solid ${RULE}`,
          borderTop: `2px solid ${node.color}`,
          borderRadius: 6,
          padding: "12px 16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontSize: 12,
            fontWeight: 700,
            color: node.color,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            marginBottom: 8,
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
              lineHeight: 1.7,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrowLineVertical({ y }: { y: number }) {
  const lineLen = ARROW_GAP - 14;
  const cx = OFFSET_X + NODE_W / 2;

  return (
    <div
      style={{
        position: "absolute",
        left: cx - 12,
        top: y + NODE_H,
        width: 24,
        height: ARROW_GAP,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <svg width={24} height={ARROW_GAP} style={{ overflow: "visible" }}>
        <line
          x1={12} y1={6} x2={12} y2={ARROW_GAP - 6}
          stroke={RULE} strokeWidth={1.5}
          strokeDasharray={lineLen} strokeDashoffset={0}
        />
        <polygon
          points={`8,${ARROW_GAP - 6} 12,${ARROW_GAP} 16,${ARROW_GAP - 6}`}
          fill={TEXT_MUTE}
        />
      </svg>
    </div>
  );
}

function DataPulseVertical({ arrowIndex, frame }: { arrowIndex: number; frame: number }) {
  const x = OFFSET_X + NODE_W / 2;
  const y0 = OFFSET_Y + arrowIndex * (NODE_H + ARROW_GAP) + NODE_H + 6;
  const yEnd = y0 + ARROW_GAP - 12;

  const period = 54;
  const phaseOffset = arrowIndex * 18;
  const t = ((frame - phaseOffset) % period + period) % period;

  if (t > 36) return null;

  const py = interpolate(t, [0, 36], [y0, yEnd], {
    easing: Easing.inOut(Easing.ease),
  });
  const op = interpolate(t, [0, 4, 28, 36], [0, 1, 1, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: x - 3,
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
        }}
      />

      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: jetbrains,
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase" as const,
          color: TEXT_MUTE,
        }}
      >
        System Architecture
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 58,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: inter,
          fontSize: 20,
          fontWeight: 300,
          color: TEXT,
          letterSpacing: "-0.01em",
        }}
      >
        How the systems connect
      </div>

      {/* Static vertical arrows */}
      {[0, 1, 2].map((i) => (
        <ArrowLineVertical key={i} y={OFFSET_Y + i * (NODE_H + ARROW_GAP)} />
      ))}

      {/* Static node cards */}
      {NODES.map((node, i) => (
        <NodeCard key={node.title} node={node} y={OFFSET_Y + i * (NODE_H + ARROW_GAP)} />
      ))}

      {/* Pulsing dots — only thing that animates */}
      {[0, 1, 2].map((i) => (
        <DataPulseVertical key={i} arrowIndex={i} frame={frame} />
      ))}

      {/* Bottom caption */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: jetbrains,
          fontSize: 11,
          color: TEXT_MUTE,
          letterSpacing: "0.06em",
        }}
      >
        Java · Spring Boot · Docker · PostgreSQL
      </div>
    </AbsoluteFill>
  );
};
