"use client";

import { useEffect } from "react";

const scripts = [
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Draggable.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/InertiaPlugin.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Flip.min.js",
  "https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js",
  "/neuro.js",
];

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-neuro-src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") resolve();
      else existing.addEventListener("load", resolve, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.neuroSrc = src;
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true },
    );
    script.addEventListener("error", reject, { once: true });
    document.body.appendChild(script);
  });
}

export default function ScriptLoader() {
  useEffect(() => {
    let active = true;

    async function initializeExperience() {
      try {
        for (const src of scripts) {
          if (!active) return;
          await loadScript(src);
        }
      } catch (error) {
        console.error("Failed to initialize the NEURO experience.", error);
      }
    }

    initializeExperience();
    return () => {
      active = false;
    };
  }, []);

  return null;
}
