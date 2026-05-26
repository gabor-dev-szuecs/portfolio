import "./index.css";
import { Composition } from "remotion";
import { HeroIntro } from "./HeroIntro";
import { SystemDiagram } from "./SystemDiagram";

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

      {/* 6 seconds — loops in the Stack section */}
      <Composition
        id="SystemDiagram"
        component={SystemDiagram}
        durationInFrames={190}
        fps={30}
        width={1280}
        height={540}
      />
    </>
  );
};
