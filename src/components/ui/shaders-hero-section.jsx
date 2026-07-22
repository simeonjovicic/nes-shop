import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";
import "./shaders-hero-section.css";

const NES_SHADER_COLORS = [
  "#f5f2e9",
  "#d8cfb9",
  "#a6813f",
  "#6f8579",
  "#24473a",
  "#f5f2e9",
];

const WEBGL_OPTIONS = {
  alpha: false,
  antialias: false,
  powerPreference: "low-power",
};

const FOOTSTEP_ROUTE = [
  { x: 2, y: 92, rotation: -14 },
  { x: 5, y: 81, rotation: 9 },
  { x: 3, y: 70, rotation: -9 },
  { x: 7, y: 59, rotation: 14 },
  { x: 16, y: 50, rotation: 32 },
  { x: 18, y: 41, rotation: 25 },
  { x: 24, y: 33, rotation: 48 },
  { x: 34, y: 27, rotation: 66 },
  { x: 47, y: 25, rotation: 86 },
  { x: 60, y: 27, rotation: 105 },
  { x: 70, y: 32, rotation: 124 },
  { x: 78, y: 40, rotation: 145 },
  { x: 81, y: 49, rotation: 169 },
];

function FootprintMark({ side }) {
  return (
    <svg viewBox="0 0 40 76" aria-hidden="true">
      <g transform={side === "right" ? "translate(40 0) scale(-1 1)" : undefined}>
        <path d="M20.1 72.2c-5.8.1-9.4-4.1-8.8-10 .6-5.7 4.2-10 5-15.7.8-5.5-1.5-10.4-.8-15.4.6-4.8 3.3-9.8 7.9-10.5 5.4-.8 9.4 5.2 9 12.3-.4 6.6-3.4 11.9-3.9 17.8-.5 5.6 2.9 10.1 2.3 14.8-.6 4.4-4.4 6.6-10.7 6.7Z" />
        <circle cx="30.4" cy="9" r="6.1" />
        <circle cx="19.5" cy="6.5" r="4.8" />
        <circle cx="11.2" cy="8.7" r="3.8" />
        <circle cx="5.7" cy="13.1" r="2.9" />
        <circle cx="3.2" cy="18.7" r="2.2" />
      </g>
    </svg>
  );
}

function BarefootTrail() {
  return (
    <div className="hero-footprint-trail" aria-hidden="true">
      {FOOTSTEP_ROUTE.map((step, index) => {
        const side = index % 2 === 0 ? "left" : "right";
        const scale = 0.78 + (step.y / 100) * 0.21;

        return (
          <span
            className="footstep"
            style={{
              "--step-x": `${step.x}%`,
              "--step-y": `${step.y}%`,
              "--step-rotation": `${step.rotation}deg`,
              "--step-scale": scale.toFixed(2),
              "--step-delay": `${(index * 0.38).toFixed(2)}s`,
            }}
            key={`${step.x}-${step.y}`}
          >
            <FootprintMark side={side} />
          </span>
        );
      })}
    </div>
  );
}

function supportsWebGL2() {
  if (typeof document === "undefined") return false;

  try {
    const testCanvas = document.createElement("canvas");
    const context = testCanvas.getContext("webgl2");
    const isSupported = Boolean(context);
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return isSupported;
  } catch {
    return false;
  }
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ShaderBackground({ children }) {
  const [supportsShader] = useState(supportsWebGL2);
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(motionQuery.matches);
    motionQuery.addEventListener?.("change", updateMotionPreference);

    return () => motionQuery.removeEventListener?.("change", updateMotionPreference);
  }, []);

  return (
    <div className="shader-background">
      <div className="hero-shader-fallback" aria-hidden="true" />
      {supportsShader && (
        <MeshGradient
          className="hero-shader-mesh"
          aria-hidden="true"
          colors={NES_SHADER_COLORS}
          speed={reducedMotion ? 0 : 0.13}
          frame={3800}
          distortion={0.86}
          swirl={0.22}
          grainMixer={0.15}
          grainOverlay={0.034}
          fit="cover"
          scale={1.12}
          rotation={-7}
          minPixelRatio={1}
          maxPixelCount={2000000}
          webGlContextAttributes={WEBGL_OPTIONS}
        />
      )}
      <div className="hero-shader-veil" aria-hidden="true" />
      <BarefootTrail />
      <div className="hero-shader-foreground">{children}</div>
    </div>
  );
}
