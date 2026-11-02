// Safe control: a fixed, bundled https link. The href is a constant, never user input.
const DOCS_URL = "https://example.com/docs";

export default function SafeLinkPage() {
  return (
    <section>
      <h1>Documentation</h1>
      <a className="docs" href={DOCS_URL}>
        Open the docs
      </a>
    </section>
  );
}
