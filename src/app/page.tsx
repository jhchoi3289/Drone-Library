import { library } from "@/data/library";
import CarouselStrip from "@/components/CarouselStrip";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const totalVideos = library.reduce((sum, c) => sum + c.videos.length, 0);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <header
        style={{
          paddingTop: "120px",
          paddingBottom: "56px",
          paddingLeft: "clamp(1rem, 5vw, 4rem)",
          paddingRight: "clamp(1rem, 5vw, 4rem)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--text)",
          }}
        >
          Trips Around
          <br />
          <span style={{ color: "var(--text-muted)" }}>the World.</span>
        </h1>

        <p
          style={{
            marginTop: "1.5rem",
            marginBottom: 0,
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            letterSpacing: "0.05em",
          }}
        >
          {library.length} countries &nbsp;·&nbsp; {totalVideos} videos
        </p>
      </header>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "var(--border)",
          marginBottom: "2.5rem",
        }}
      />

      {/* Carousel — full-width, edge-to-edge */}
      <main style={{ paddingBottom: "6rem" }}>
        <CarouselStrip />
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "1.5rem clamp(1rem, 5vw, 4rem)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
          }}
        >
          TRAVEL FILMS
        </span>
      </footer>
    </>
  );
}
