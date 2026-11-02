// Trusted announcement copy bundled with the app. This is NOT user input: it is shipped in the
// source, so rendering it as HTML is legitimate. The Announcement banner must keep rendering this
// as HTML (bold text) even after the XSS findings are fixed.
export const ANNOUNCEMENT_HTML = "Welcome to the <b>Vulcan Demo</b>!";
