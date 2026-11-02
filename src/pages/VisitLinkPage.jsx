// Seed 103 (CWE-79): unsafe URL. The anchor `href` is taken straight from the `link` query
// parameter, so a `javascript:` URL would run when the link is clicked.
export default function VisitLinkPage({ link = "" }) {
  if (!link) {
    return (
      <section>
        <h1>Visit link</h1>
        <p>No link provided.</p>
      </section>
    );
  }
  return (
    <section>
      <h1>Visit link</h1>
      <a className="target" href={link}>Visit link</a>
    </section>
  );
}
