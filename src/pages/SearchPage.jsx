// Seed 101 (CWE-79): reflected DOM XSS. The `q` query parameter is rendered as raw HTML.
export default function SearchPage({ query = "" }) {
  return (
    <section>
      <h1>Search</h1>
      {query ? <p>Results for your search:</p> : <p>Type a query to search.</p>}
      <div className="search-results" dangerouslySetInnerHTML={{ __html: query }} />
    </section>
  );
}
