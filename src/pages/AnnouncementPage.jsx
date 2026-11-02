import { ANNOUNCEMENT_HTML } from "../announcement.js";

// Safe control: the Announcement banner legitimately renders trusted HTML that is bundled with the
// app (see announcement.js). This is intentional and must keep rendering HTML (the bold text) even
// after the user-input XSS findings are fixed.
export default function AnnouncementPage() {
  return (
    <section>
      <h1>Announcement</h1>
      <div className="announcement" dangerouslySetInnerHTML={{ __html: ANNOUNCEMENT_HTML }} />
    </section>
  );
}
