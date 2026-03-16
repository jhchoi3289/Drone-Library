"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Country } from "@/data/library";
import { useState, useRef, useCallback } from "react";

interface Props {
  country: Country;
}

type PreviewState = "hidden" | "enter" | "visible" | "leave";

const FADE_MS = 600;
const PREVIEW_MS = 15000;

export default function CountryCard({ country }: Props) {
  const [hovered, setHovered] = useState(false);
  const [preview, setPreview] = useState<PreviewState>("hidden");

  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const featuredVideo = country.videos.find((v) => v.source === "youtube");
  const embedSrc = featuredVideo
    ? `https://www.youtube.com/embed/${featuredVideo.videoId}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=${featuredVideo.videoId}&enablejsapi=0`
    : null;

  // Year + location label from first video
  const firstVideo = country.videos[0];
  const metaLabel = [firstVideo?.location, firstVideo?.year].filter(Boolean).join(" · ");

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
    fadeTimer.current = setTimeout(() => {
      setPreview("visible");
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
        borderRadius: "3px",
        aspectRatio: "16 / 9",
        textDecoration: "none",
        background: "var(--surface)",
        cursor: "pointer",
      }}
    >
      {/* ── Cover image with slow Framer Motion zoom ── */}
      <motion.div
        animate={{ scale: hovered && preview !== "visible" ? 1.07 : 1 }}
        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "absolute",
          inset: 0,
          opacity: preview === "visible" ? 0 : 1,
          transition: `opacity ${FADE_MS}ms ease`,
        }}
      >
        <Image
          src={country.coverImage}
          alt={country.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{
            objectFit: "cover",
            filter: hovered ? "brightness(0.5)" : "brightness(0.38)",
            transition: "filter 0.5s ease",
          }}
          priority={false}
        />
      </motion.div>

      {/* ── YouTube preview iframe ── */}
      {isIframeMounted && embedSrc && (
        <div
          style={{
            position: "absolute",
            inset: "-10%",
            opacity: iframeOpacity,
            transition: `opacity ${FADE_MS}ms ease`,
            pointerEvents: "none",
          }}
        >
          <iframe
            src={embedSrc}
            allow="autoplay"
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
      )}

      {/* ── Gradient overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.05) 55%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Text ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.2rem",
          pointerEvents: "none",
        }}
      >
        {metaLabel && (
          <span
            style={{
              fontSize: "0.58rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent)",
              fontWeight: 500,
            }}
          >
            {metaLabel}
          </span>
        )}
        <h2
          style={{
            margin: 0,
            fontSize: "1.15rem",
            fontWeight: 500,
            color: "var(--text)",
            letterSpacing: "0.01em",
            lineHeight: 1.2,
            fontFamily: "var(--font-cormorant), Georgia, serif",
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
          borderRadius: "3px",
          border: `1px solid ${hovered ? "rgba(201,168,76,0.25)" : "transparent"}`,
          transition: "border-color 0.4s ease",
          pointerEvents: "none",
        }}
      />
    </Link>
  );
}
