import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About | Travel Films",
  description: "James is a Brooklyn-based videographer who captures honest moments from his travels around the world.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "120px clamp(1.5rem, 6vw, 5rem) 6rem",
          display: "flex",
          flexDirection: "column",
          gap: "0",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            margin: "0 0 1.25rem",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--accent)",
            fontWeight: 500,
          }}
        >
          About
        </p>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* ── Photo ── */}
          <div
            style={{
              position: "relative",
              aspectRatio: "2 / 3",
              borderRadius: "3px",
              overflow: "hidden",
              background: "var(--surface)",
            }}
          >
            <Image
              src="/james.jpg"
              alt="James at Charles Bridge, Prague"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />
            {/* subtle vignette */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, transparent 60%, rgba(10,26,15,0.4) 100%)",
                pointerEvents: "none",
              }}
            />
            <p
              style={{
                position: "absolute",
                bottom: "1rem",
                left: "1.25rem",
                margin: 0,
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Prague, Czechia
            </p>
          </div>

          {/* ── Bio ── */}
          <div
            style={{
              paddingTop: "0.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--text)",
              }}
            >
              James Choi
            </h1>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "var(--text-muted)",
                  fontWeight: 300,
                }}
              >
                Brooklyn-based amateur videographer with a passion for capturing
                the world as it actually feels, not just how it looks.
              </p>

              <p
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "var(--text-muted)",
                  fontWeight: 300,
                }}
              >
                Every trip is a new chapter. With his wife by his side and a
                drone overhead, James documents the quiet moments and sweeping
                landscapes that turn travel into something worth remembering.
              </p>

              <p
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "var(--text-muted)",
                  fontWeight: 300,
                }}
              >
                This library is a personal archive. No filters, no pretense.
                Just honest films from the road.
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "var(--border)" }} />

            {/* Stats row */}
            <div
              style={{
                display: "flex",
                gap: "2.5rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "Based in", value: "Brooklyn, NY" },
                { label: "Travelling with", value: "Wife + Drone" },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text)",
                      fontWeight: 400,
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Back link */}
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--accent)",
                textDecoration: "none",
                fontWeight: 500,
                marginTop: "0.5rem",
                transition: "opacity 0.2s",
              }}
            >
              ← View All Films
            </Link>
          </div>
        </div>
      </main>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 680px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
