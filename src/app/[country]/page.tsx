import { library, getCountry } from "@/data/library";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import VideoCard from "@/components/VideoCard";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  return library.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getCountry(slug);
  if (!country) return { title: "Not Found" };
  return {
    title: `${country.name} — Travel Films`,
    description: country.description ?? `Travel films from ${country.name}.`,
  };
}

export default async function CountryPage({ params }: Props) {
  const { country: slug } = await params;
  const country = getCountry(slug);
  if (!country) notFound();

  return (
    <>
      <Navbar />

      {/* Hero banner */}
      <div
        style={{
          position: "relative",
          height: "clamp(280px, 45vw, 520px)",
          overflow: "hidden",
          background: "var(--surface)",
        }}
      >
        <Image
          src={country.coverImage}
          alt={country.name}
          fill
          priority
          style={{ objectFit: "cover", filter: "brightness(0.35)" }}
          sizes="100vw"
        />
        {/* Top-to-bottom gradient so navbar is readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(10,26,15,0.5) 0%, rgba(10,26,15,0) 40%, rgba(10,26,15,0.9) 100%)",
          }}
        />

        {/* Hero text */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "2rem clamp(1rem, 5vw, 4rem)",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* Breadcrumb */}
          <div style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Link
              href="/"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
            >
              All Trips
            </Link>
            <span style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}>›</span>
            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              {country.name}
            </span>
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(2rem, 6vw, 4rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              lineHeight: 1,
            }}
          >
            {country.name}
          </h1>

          {country.description && (
            <p
              style={{
                marginTop: "0.75rem",
                marginBottom: 0,
                fontSize: "0.88rem",
                color: "var(--text-muted)",
                maxWidth: "560px",
                lineHeight: 1.6,
              }}
            >
              {country.description}
            </p>
          )}
        </div>
      </div>

      {/* Videos */}
      <main
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "2.5rem clamp(1rem, 5vw, 4rem) 6rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "1rem",
            marginBottom: "2rem",
            borderBottom: "1px solid var(--border)",
            paddingBottom: "1rem",
          }}
        >
          <span
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            {country.videos.length} {country.videos.length === 1 ? "video" : "videos"}
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "1.5rem",
          }}
        >
          {country.videos.map((video) => (
            <VideoCard key={video.id} video={video} />
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
        <Link
          href="/"
          style={{
            fontSize: "0.7rem",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
            textDecoration: "none",
          }}
        >
          ← All Trips
        </Link>
        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
          Personal Film Library
        </span>
      </footer>
    </>
  );
}
