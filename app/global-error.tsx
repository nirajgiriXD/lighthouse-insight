"use client";

/**
 * Last-resort boundary: this replaces the root layout, so it has to ship its
 * own document shell and cannot rely on the app's styles being applied.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          background: "#0c1018",
          color: "#f2f3f7",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ maxWidth: "32rem" }}>
          <h1 style={{ fontSize: "1.75rem", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
            The application failed to start.
          </h1>
          <p style={{ margin: "0 0 1.5rem", lineHeight: 1.6, color: "#a5a9b4" }}>
            An unexpected error occurred before the interface could load.
            {error.digest ? ` Reference: ${error.digest}.` : ""}
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "0.7rem 1.25rem",
              borderRadius: "0.625rem",
              border: 0,
              background: "#7a9eff",
              color: "#0c1018",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reload the application
          </button>
        </div>
      </body>
    </html>
  );
}
