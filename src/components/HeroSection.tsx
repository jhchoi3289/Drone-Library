"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const BALI_VIDEO_ID = "2E0Y2KQ23E0";

export default function HeroSection({ totalTrips, totalVideos }: { totalTrips: number; totalVideos: number }) {
  return (
    <section
      style={{
        position: "relative",
        height: "100svh",
        minHeight: "600px",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* ── YouTube background video ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "max(177.78vh, 100vw)",
          height: "max(100vh, 56.25vw)",
          pointerEvents: "none",
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${BALI_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${BALI_VIDEO_ID}&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1`}
          allow="autoplay; encrypted-media"
          style={{ width: "100%", height: "100%", border: "none" }}
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>

      {/* ── Dark overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,26,15,0.35) 0%, rgba(10,26,15,0.2) 40%, rgba(10,26,15,0.75) 80%, var(--bg) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── JC watermark ── */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          right: "5%",
          zIndex: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <svg
          viewBox="0 0 160 160"
          width="220"
          height="220"
          style={{ opacity: 0.06 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Camera body */}
          <rect x="18" y="54" width="124" height="84" rx="10" fill="none" stroke="#c9a84c" strokeWidth="4" />
          {/* Camera bump */}
          <rect x="52" y="38" width="40" height="20" rx="5" fill="none" stroke="#c9a84c" strokeWidth="4" />
          {/* Lens ring */}
          <circle cx="80" cy="96" r="26" fill="none" stroke="#c9a84c" strokeWidth="4" />
          <circle cx="80" cy="96" r="14" fill="none" stroke="#c9a84c" strokeWidth="3" />
          {/* Flash dot */}
          <circle cx="32" cy="70" r="5" fill="#c9a84c" />
          {/* JC monogram centered in lens */}
          <text
            x="80"
            y="103"
            textAnchor="middle"
            fontFamily="Georgia, serif"
            fontSize="18"
            fontWeight="500"
            letterSpacing="2"
            fill="#c9a84c"
          >
            JC
          </text>
        </svg>
      </div>

      {/* ── Hero text ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 clamp(1.5rem, 6vw, 5rem) clamp(3rem, 8vh, 6rem)",
          maxWidth: "1400px",
          margin: "0 auto",
          left: "50%",
          right: "auto",
          transform: "translateX(-50%)",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            margin: "0 0 1rem",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--accent)",
            fontWeight: 500,
          }}
        >
          James Choi · Travel Films
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            margin: 0,
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.0,
            color: "var(--text)",
            fontFamily: "var(--font-cormorant), Georgia, serif",
          }}
        >
          Trips Around
          <br />
          <em style={{ color: "var(--text-muted)", fontStyle: "italic" }}>the World.</em>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            marginTop: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
            }}
          >
            {totalTrips} trips &nbsp;·&nbsp; {totalVideos} films
          </span>

          <Link
            href="#films"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent)",
              textDecoration: "none",
              borderBottom: "1px solid var(--accent-dim)",
              paddingBottom: "2px",
              transition: "border-color 0.2s",
            }}
          >
            View All Films ↓
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
