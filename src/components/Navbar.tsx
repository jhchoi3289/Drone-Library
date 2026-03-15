import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "0 1.5rem",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(to bottom, rgba(10,26,15,0.97) 0%, rgba(10,26,15,0) 100%)",
      }}
    >
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

      <span
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        Personal Film Library
      </span>
    </nav>
  );
}
