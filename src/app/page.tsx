import { library } from "@/data/library";
import CountryCard from "@/components/CountryCard";
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
          paddingBottom: "64px",
          paddingLeft: "clamp(1rem, 5vw, 4rem)",
          paddingRight: "clamp(1rem, 5vw, 4rem)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--accent)",
            fontWeight: 500,
            marginBottom: "1rem",
          }}
        >
          Personal Film Library
        </p>
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

      {/* Country grid */}
      <main
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(1rem, 5vw, 4rem) 6rem",
        }}
      >
        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "var(--border)",
            marginBottom: "2.5rem",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: "1px",
            background: "var(--border)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {library.map((country) => (
            <div key={country.slug} style={{ background: "var(--bg)" }}>
              <CountryCard country={country} />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "1.5rem clamp(1rem, 5vw, 4rem)",
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
          TRAVEL FILMS
        </span>
        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
          Personal Film Library
        </span>
      </footer>
    </>
  );
}
