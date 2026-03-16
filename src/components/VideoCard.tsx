"use client";

import Image from "next/image";
import { Video, getThumbnail } from "@/data/library";
import { useState } from "react";
import VideoModal from "./VideoModal";

interface Props {
  video: Video;
}

export default function VideoCard({ video }: Props) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const thumbnail = getThumbnail(video);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          all: "unset",
          display: "block",
          cursor: "pointer",
          position: "relative",
          borderRadius: "4px",
          overflow: "hidden",
          background: "var(--surface)",
          width: "100%",
        }}
      >
        {/* Thumbnail */}
        <div style={{ position: "relative", aspectRatio: "16 / 9", overflow: "hidden" }}>
          <Image
            src={thumbnail}
            alt={video.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{
              objectFit: "cover",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              filter: hovered ? "brightness(0.6)" : "brightness(0.75)",
            }}
          />

          {/* Dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
            }}
          />

          {/* Play icon */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.3)",
                transform: hovered ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.3s ease, background 0.3s ease",
                backdropFilter: "blur(4px)",
              }}
            >
              {/* Play triangle */}
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "8px solid transparent",
                  borderBottom: "8px solid transparent",
                  borderLeft: "14px solid rgba(255,255,255,0.9)",
                  marginLeft: "3px",
                }}
              />
            </div>
          </div>

          {/* Source badge */}
          <div
            style={{
              position: "absolute",
              top: "0.6rem",
              right: "0.6rem",
              fontSize: "0.55rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 600,
              padding: "2px 6px",
              borderRadius: "2px",
              background: video.source === "youtube" ? "rgba(255,0,0,0.7)" : "rgba(26,183,234,0.7)",
              color: "#fff",
              backdropFilter: "blur(4px)",
            }}
          >
            {video.source}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "0.75rem 1rem 1rem" }}>
          <h3
            style={{
              margin: 0,
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "var(--text)",
              lineHeight: 1.3,
              letterSpacing: "0.01em",
            }}
          >
            {video.title}
          </h3>

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              marginTop: "0.4rem",
              flexWrap: "wrap",
            }}
          >
            {video.location && (
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "var(--accent)",
                  letterSpacing: "0.08em",
                }}
              >
                {video.location}
              </span>
            )}
            {video.year && (
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.05em",
                }}
              >
                {video.year}
              </span>
            )}
          </div>

          {video.description && (
            <p
              style={{
                margin: "0.5rem 0 0",
                fontSize: "0.78rem",
                color: "var(--text-muted)",
                lineHeight: 1.55,
              }}
            >
              {video.description}
            </p>
          )}
        </div>
      </button>

      {open && <VideoModal video={video} onClose={() => setOpen(false)} />}
    </>
  );
}

function formatDate(raw: string): string {
  // Accepts "YYYY-MM" or "YYYY"
  const parts = raw.split("-");
  if (parts.length === 2) {
    const d = new Date(`${raw}-01`);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  }
  return raw;
}
