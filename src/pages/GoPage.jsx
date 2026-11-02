import { useEffect } from "react";

// Seed 104 (CWE-601): open redirect. The unvalidated `next` query parameter is passed straight to
// a navigation call. `navigate` is injectable so tests can observe the redirect without leaving.
export default function GoPage({ next = "", navigate }) {
  useEffect(() => {
    if (!next) return;
    if (navigate) navigate(next);
    else window.location.assign(next);
  }, [next, navigate]);
  return (
    <section>
      <h1>Redirecting…</h1>
      <p>Taking you to your destination.</p>
    </section>
  );
}
