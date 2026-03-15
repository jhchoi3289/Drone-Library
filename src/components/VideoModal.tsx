"use client";

import { useEffect } from "react";
import { Video, getEmbedUrl } from "@/data/library";

interface Props {
  video: Video;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backdropFilter: "blur(8px)",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>

      {/* Modal box */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "900px",
          background: "var(--surface)",
          borderRadius: "6px",
          overflow: "hidden",
          animation: "slideUp 0.25s ease",
          boxShadow: "0 40px 80px rgba(0,0,0,0.8)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 1rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--text)",
                lineHeight: 1.2,
              }}
            >
              {video.title}
            </div>
            {video.location && (
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "var(--accent)",
                  marginTop: "2px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {video.location}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              all: "unset",
              cursor: "pointer",
              color: "var(--text-muted)",
              fontSize: "1.2rem",
              lineHeight: 1,
              padding: "0.25rem 0.5rem",
              borderRadius: "3px",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            ✕
          </button>
        </div>

        {/* Iframe */}
        <div style={{ position: "relative", aspectRatio: "16 / 9", background: "#000" }}>
          <iframe
            src={getEmbedUrl(video)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}
