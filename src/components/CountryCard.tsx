"use client";

import Link from "next/link";
import Image from "next/image";
import { Country } from "@/data/library";
import { useState, useRef, useCallback } from "react";

interface Props {
  country: Country;
}

// Preview states:
//  hidden  — iframe not in DOM, cover image shown
//  enter   — iframe mounting, fading in (opacity 0 → 1)
//  visible — iframe at full opacity, 15s timer running
//  leave   — iframe fading out (opacity 1 → 0)
type PreviewState = "hidden" | "enter" | "visible" | "leave";

const FADE_MS = 600;
const PREVIEW_MS = 15000;

export default function CountryCard({ country }: Props) {
  const [hovered, setHovered] = useState(false);
  const [preview, setPreview] = useState<PreviewState>("hidden");

  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // First YouTube video in the list
  const featuredVideo = country.videos.find((v) => v.source === "youtube");
  const embedSrc = featuredVideo
    ? `https://www.youtube.com/embed/${featuredVideo.videoId}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=${featuredVideo.videoId}&enablejsapi=0`
    : null;

  const clearTimers = () => {
    if (fadeTimer.current) { clearTimeout(fadeTimer.current); fadeTimer.current = null; }
    if (previewTimer.current) { clearTimeout(previewTimer.current); previewTimer.current = null; }
  };

  const startLeave = useCallback(() => {
    clearTimers();
    setPreview("leave");
    fadeTimer.current = setTimeout(() => setPreview("hidden"), FADE_MS);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    if (!embedSrc) return;

    clearTimers();
    setPreview("enter");

    // After one frame, switch to visible so the opacity transition fires
    fadeTimer.current = setTimeout(() => {
      setPreview("visible");
      // Auto-end after 15 s
      previewTimer.current = setTimeout(startLeave, PREVIEW_MS);
    }, 50);
  }, [embedSrc, startLeave]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    startLeave();
  }, [startLeave]);

  const isIframeMounted = preview === "enter" || preview === "visible" || preview === "leave";
  const iframeOpacity = preview === "visible" ? 1 : 0;

  return (
    <Link
      href={`/${country.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "block",
        position: "relative",
        overflow: "hidden",
        borderRadius: "4px",
        aspectRatio: "16 / 10",
        textDecoration: "none",
        background: "var(--surface)",
        cursor: "pointer",
      }}
    >
      {/* ── Cover image ── */}
      <Image
        src={country.coverImage}
        alt={country.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        style={{
          objectFit: "cover",
          // Fade out image while video preview is visible
          opacity: preview === "visible" ? 0 : 1,
          transition: `opacity ${FADE_MS}ms ease, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.4s ease`,
          transform: hovered ? "scale(1.06)" : "scale(1)",
          filter: hovered && preview === "hidden" ? "brightness(0.55)" : "brightness(0.4)",
        }}
        priority={false}
      />

      {/* ── YouTube preview iframe ── */}
      {isIframeMounted && embedSrc && (
        <div
          style={{
            position: "absolute",
            // Expand slightly beyond the card to hide black letterbox bars
            inset: "-10%",
            opacity: iframeOpacity,
            transition: `opacity ${FADE_MS}ms ease`,
            pointerEvents: "none",
          }}
        >
          <iframe
            src={embedSrc}
            allow="autoplay"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
            }}
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
      )}

      {/* ── Gradient overlay (always present for text legibility) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.05) 55%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Country name + count ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent)",
            fontWeight: 500,
          }}
        >
          {country.videos.length} {country.videos.length === 1 ? "film" : "films"}
        </span>
        <h2
          style={{
            margin: 0,
            fontSize: "1.15rem",
            fontWeight: 600,
            color: "var(--text)",
            letterSpacing: "0.02em",
            lineHeight: 1.2,
          }}
        >
          {country.name}
        </h2>
      </div>

      {/* ── Hover border ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "4px",
          border: `1px solid ${hovered ? "rgba(212,184,150,0.3)" : "transparent"}`,
          transition: "border-color 0.3s ease",
          pointerEvents: "none",
        }}
      />
    </Link>
  );
}
