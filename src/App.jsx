import AnnouncementPage from "./pages/AnnouncementPage.jsx";
import GoPage from "./pages/GoPage.jsx";
import GuestbookPage from "./pages/GuestbookPage.jsx";
import SafeLinkPage from "./pages/SafeLinkPage.jsx";
import SafeTextPage from "./pages/SafeTextPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import VisitLinkPage from "./pages/VisitLinkPage.jsx";

// The app's routes, also published in run-profile.json.
export const ROUTES = [
  "/",
  "/search",
  "/guestbook",
  "/link",
  "/go",
  "/message",
  "/safe-link",
  "/announcement",
];

function HomePage() {
  return (
    <section>
      <h1>react-xss benchmark</h1>
      <p>Local testing only. Never deploy.</p>
      <ul>
        {ROUTES.filter((r) => r !== "/").map((route) => (
          <li key={route}>
            <a href={route}>{route}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Pick the page for a path. Query values come from `params` (a URLSearchParams).
export function renderRoute(pathname, params) {
  switch (pathname) {
    case "/search":
      return <SearchPage query={params.get("q") ?? ""} />;
    case "/guestbook":
      return <GuestbookPage />;
    case "/link":
      return <VisitLinkPage link={params.get("link") ?? ""} />;
    case "/go":
      return <GoPage next={params.get("next") ?? ""} />;
    case "/message":
      return <SafeTextPage text={params.get("text") ?? ""} />;
    case "/safe-link":
      return <SafeLinkPage />;
    case "/announcement":
      return <AnnouncementPage />;
    default:
      return <HomePage />;
  }
}

export default function App() {
  const params = new URLSearchParams(window.location.search);
  return <main>{renderRoute(window.location.pathname, params)}</main>;
}
