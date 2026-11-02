import { guestbookComments } from "../data.js";

// Visitor-posted comments persist in localStorage under this key (a JSON array of {id, body}).
export const STORAGE_KEY = "guestbook:comments";

// Read previously posted comments from localStorage. Malformed or absent storage yields none.
function storedComments() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((c) => c && typeof c.body === "string");
  } catch {
    return [];
  }
}

// Seed 102 (CWE-79): stored DOM XSS. Each stored comment body — whether bundled or posted by a
// visitor and kept in localStorage — is rendered as raw HTML.
export default function GuestbookPage({ comments }) {
  const all = comments ?? [...guestbookComments, ...storedComments()];
  return (
    <section>
      <h1>Guestbook</h1>
      {all.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="comments">
          {all.map((comment) => (
            <li key={comment.id}>{comment.body}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
