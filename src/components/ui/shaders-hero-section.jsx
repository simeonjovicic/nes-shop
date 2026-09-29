import { useEffect, useRef } from "react";
import { createSandRenderer } from "./sand-shader";
import "./shaders-hero-section.css";

export function ShaderBackground({ children }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let renderer;
    let frame;
    let visible = true;
    let elapsed = 4.6;
    let lastFrame = 0;
    let previousTime = 0;

    const draw = (now) => {
      if (!renderer || !visible || document.hidden || motionQuery.matches) return;
      frame = window.requestAnimationFrame(draw);
      if (now - lastFrame < 1000 / 30) return;
      if (previousTime) elapsed += Math.min((now - previousTime) / 1000, 0.1);
      previousTime = now;
      lastFrame = now;
      renderer.render(elapsed);
    };
    const updatePlayback = () => {
      window.cancelAnimationFrame(frame);
      previousTime = 0;
      if (!renderer) return;
      renderer.render(elapsed);
      if (visible && !document.hidden && !motionQuery.matches) frame = window.requestAnimationFrame(draw);
    };
    const resize = () => {
      if (!renderer) return;
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      renderer.resize(width, height);
      renderer.render(elapsed);
    };
    const initialize = () => {
      try { renderer = createSandRenderer(canvas); } catch { renderer = null; }
      if (!renderer) return;
      resize();
      canvas.dataset.ready = "true";
      updatePlayback();
    };
    const loseContext = (event) => {
      event.preventDefault();
      window.cancelAnimationFrame(frame);
      delete canvas.dataset.ready;
      renderer?.dispose();
      renderer = null;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    }, { threshold: 0 });
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    motionQuery.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);
    canvas.addEventListener("webglcontextlost", loseContext);
    canvas.addEventListener("webglcontextrestored", initialize);
    initialize();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      motionQuery.removeEventListener("change", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
      canvas.removeEventListener("webglcontextlost", loseContext);
      canvas.removeEventListener("webglcontextrestored", initialize);
      renderer?.dispose();
    };
  }, []);

  return (
    <div className="shader-background">
      <div className="hero-shader-fallback" aria-hidden="true" />
      <canvas ref={canvasRef} className="hero-sand-canvas" aria-hidden="true" />
      <div className="hero-shader-veil" aria-hidden="true" />
      <div className="hero-shader-foreground">{children}</div>
    </div>
  );
}
