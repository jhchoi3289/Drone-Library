"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "0 clamp(1rem, 4vw, 2.5rem)",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "linear-gradient(to bottom, rgba(10,26,15,0.97) 0%, rgba(10,26,15,0) 100%)",
      }}
    >
      {/* Left side — brand + About */}
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <Link
          href="/"
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent)",
            textDecoration: "none",
          }}
        >
          Travel Films
        </Link>

        <Link
          href="/about"
          style={{
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: pathname === "/about" ? "var(--accent)" : "var(--text-muted)",
            textDecoration: "none",
            transition: "color 0.2s ease",
            paddingBottom: "1px",
            borderBottom: pathname === "/about"
              ? "1px solid var(--accent)"
              : "1px solid transparent",
          }}
        >
          About
        </Link>
      </div>

    </nav>
  );
}
