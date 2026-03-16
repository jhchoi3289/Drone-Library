import { library } from "@/data/library";
import CarouselStrip from "@/components/CarouselStrip";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FadeIn from "@/components/FadeIn";

export default function HomePage() {
  const totalVideos = library.reduce((sum, c) => sum + c.videos.length, 0);

  return (
    <>
      <Navbar />

      {/* Full-screen cinematic hero */}
      <HeroSection totalTrips={library.length} totalVideos={totalVideos} />

      {/* Films section */}
      <section id="films" style={{ paddingTop: "4rem" }}>
        <FadeIn>
          <div
            style={{
              padding: "0 clamp(1rem, 5vw, 4rem) 1.5rem",
              maxWidth: "1400px",
              margin: "0 auto",
              display: "flex",
              alignItems: "baseline",
              gap: "1rem",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--text)",
                fontFamily: "var(--font-cormorant), Georgia, serif",
              }}
            >
              All Films
            </h2>
            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              {library.length} trips
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "var(--border)",
              marginBottom: "2rem",
            }}
          />
        </FadeIn>

        {/* Carousel — full width */}
        <FadeIn delay={0.1}>
          <CarouselStrip />
        </FadeIn>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "1.5rem clamp(1rem, 5vw, 4rem)",
          maxWidth: "1400px",
          margin: "3rem auto 0",
        }}
      >
        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
          TRAVEL FILMS
        </span>
      </footer>
    </>
  );
}
