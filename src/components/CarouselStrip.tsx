"use client";

import { useRef } from "react";
import { library } from "@/data/library";
import CountryCard from "./CountryCard";

const CARD_WIDTH = 400;
const CARD_GAP = 2;

export default function CarouselStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  const items = [...library, ...library];

  const pause = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const play = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return (
    <>
      {/* ── Desktop: infinite auto-scroll carousel ── */}
      <div className="carousel-desktop" style={{ overflow: "hidden", width: "100%", position: "relative" }}>
        {/* Edge fade */}
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, var(--bg), transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "80px", background: "linear-gradient(to left, var(--bg), transparent)", zIndex: 2, pointerEvents: "none" }} />

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
              style={{ width: `${CARD_WIDTH}px`, flexShrink: 0, paddingRight: `${CARD_GAP}px` }}
            >
              <CountryCard country={country} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: horizontal snap scroll ── */}
      <div
        className="carousel-mobile"
        style={{
          display: "none",
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          gap: "2px",
          padding: "0 clamp(1rem, 5vw, 2rem)",
          scrollbarWidth: "none",
        }}
      >
        {library.map((country) => (
          <div
            key={country.slug}
            style={{
              scrollSnapAlign: "start",
              flexShrink: 0,
              width: "80vw",
              minWidth: "260px",
              maxWidth: "340px",
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

        /* Hide desktop scrollbar on mobile container */
        .carousel-mobile::-webkit-scrollbar { display: none; }

        @media (max-width: 768px) {
          .carousel-desktop { display: none !important; }
          .carousel-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
