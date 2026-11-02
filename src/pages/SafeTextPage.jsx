// Safe control: renders the `text` parameter as plain text. React escapes it, so any markup shows
// as literal characters and never becomes DOM. This must keep behaving the same after fixes.
export default function SafeTextPage({ text = "" }) {
  return (
    <section>
      <h1>Message</h1>
      <p className="message">{text || "No message."}</p>
    </section>
  );
}
