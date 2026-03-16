"use client";

import { useRef } from "react";
import { library } from "@/data/library";
import CountryCard from "./CountryCard";

const CARD_WIDTH = 400; // px per card
const CARD_GAP = 2;    // px gap (applied as paddingRight on each wrapper)

export default function CarouselStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  const items = [...library, ...library]; // duplicate for seamless infinite loop

  const pause = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const play = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return (
    <div style={{ overflow: "hidden", width: "100%", position: "relative" }}>
      {/* Soft edge fade-outs */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "80px",
          background: "linear-gradient(to right, var(--bg), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "80px",
          background: "linear-gradient(to left, var(--bg), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Scrolling track */}
      <div
        ref={trackRef}
        onMouseEnter={pause}
        onMouseLeave={play}
        style={{
          display: "flex",
          width: "fit-content",
          animation: `carouselLeft ${library.length * 6}s linear infinite`,
        }}
      >
        {items.map((country, i) => (
          <div
            key={`${country.slug}-${i}`}
            style={{
              width: `${CARD_WIDTH}px`,
              flexShrink: 0,
              paddingRight: `${CARD_GAP}px`,
            }}
          >
            <CountryCard country={country} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes carouselLeft {
          from { transform: translateX(0%); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
