import "./index.css";
import { Composition } from "remotion";
import { HeroIntro } from "./HeroIntro";
import { SystemDiagram } from "./SystemDiagram";
import { SystemDiagramMobile } from "./SystemDiagramMobile";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 4 seconds — plays once on page load, covers full screen */}
      <Composition
        id="HeroIntro"
        component={HeroIntro}
        durationInFrames={120}
        fps={30}
        width={1280}
        height={720}
      />

      {/* ~1.8s seamless loop — only pulse dots animate */}
      <Composition
        id="SystemDiagram"
        component={SystemDiagram}
        durationInFrames={54}
        fps={30}
        width={1280}
        height={540}
      />

      {/* Mobile portrait — same seamless loop */}
      <Composition
        id="SystemDiagramMobile"
        component={SystemDiagramMobile}
        durationInFrames={54}
        fps={30}
        width={390}
        height={700}
      />
    </>
  );
};
