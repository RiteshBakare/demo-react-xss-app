Deliberately vulnerable. For local testing of Vulcan only. Never deploy.

# react-xss

A tiny Vite + React single-page app (plain JavaScript, static build, no backend). It is a Vulcan
benchmark target: it contains four deliberate frontend vulnerabilities, reported in `report.sarif`,
alongside safe controls. All content is fake and harmless.

**Local testing only, never deploy.** The app is built and served only inside the Vulcan sandbox;
it is never built or run on the host.

## Seeded vulnerabilities

| Seed | Route | Issue | CWE |
|---|---|---|---|
| 101 | `/search?q=` | Renders the `q` query parameter with `dangerouslySetInnerHTML` (reflected DOM XSS) | CWE-79 |
| 102 | `/guestbook` | Renders stored comments with `dangerouslySetInnerHTML` (stored DOM XSS) | CWE-79 |
| 103 | `/link?link=` | Renders `<a href={link}>` from a query parameter (unsafe URL) | CWE-79 |
| 104 | `/go?next=` | Calls `window.location.assign(next)` on an unvalidated parameter (open redirect) | CWE-601 |

## Safe controls (must keep working after a fix)

- `/message?text=` renders text normally (React escaping); markup shows as literal text.
- `/safe-link` renders a fixed, bundled `https` link.
- `/announcement` renders **trusted bundled HTML** (bold text) with `dangerouslySetInnerHTML`. This is
  legitimate — the HTML is shipped with the app, not user input — and the banner must keep rendering
  HTML after any XSS fix.

The vitest suite asserts the behaviour a **correct fix keeps**: that each page renders, its text, its
counts and that `/message` escapes markup. It deliberately does not assert that *user input* renders
as HTML — that is the vulnerability, and a test asserting it would make a correct fix fail the tests
gate. For the same reason (T-8.9) it does not assert that an **arbitrary external URL** becomes the
`href` on `/link`: seed 103's oracle proves the bug by an attempted navigation to a canary host, so
a test demanding that external URLs still work would make every fix that blocks it fail the tests
gate. What `/link` asserts instead is that an in-app link (`/docs`) and a mail link still render,
and that the empty case says so. The trusted banner's bold DOM node is asserted by the UI snapshot's DOM signature (T-8.8), so
a patch that strips the banner's markup while keeping its text is caught by the behaviour gate and
not by the unit tests.

## Run Profile: detected, not hand-written (T-8.11)

`run-profile.json` holds **only `snapshot_pages`**. Everything else comes from the repository
itself (`docs/architecture/locator.md`):

- The run fields are detected from `package.json`, the Vite config and the route table —
  `language=node`, `kind=ui`, `framework=react`, `npm ci --ignore-scripts`, `npm run build`,
  `npm test`, port 4173, health path `/`, the eight routes — so the profile reports
  `source=manifest` with `confidence 0.8` (the port and the health path are framework defaults).
- The four `exploit_hints` are derived per finding by the deterministic Locator: `file:line` →
  the enclosing component → the route that renders it (`renderRoute` in `src/App.jsx`) → the
  query parameter the route binds, or the `localStorage` key the page reads → the sink on the
  finding's line. They are identical to the hints that were written by hand before T-8.11.

Snapshot pages stay hand-written on purpose: which pages must not change is a judgement about the
app, not something to infer (FR-35).

## Snapshot pages (UI behaviour baseline, T-8.8)

`snapshot_pages` in `run-profile.json` lists the pages whose visible text and DOM signature must be
identical before and after a fix (controlled-remediation.md §UI behaviour snapshots):

| Page | What it proves |
|---|---|
| `home` (`/`) | The shell and the route list are unchanged. |
| `message-plain` (`/message?text=hello`) | A normal message still renders. |
| `message-rich-text` (`/message?text=<b>hello</b>`) | The benign rich-text sample (FR-35): this page escapes markup by design, and must keep doing exactly that. |
| `safe-link` (`/safe-link`) | The bundled link keeps its `href`. |
| `announcement` (`/announcement`) | The trusted bundled banner keeps rendering real HTML: the `<b>` node must still be in the DOM signature. |

A seeded route is **not** a snapshot page: `/search`, `/guestbook`, `/link` and `/go` are the fix
targets, so a correct fix changes them on purpose. Proving that is the exploit gate's job.

## Hand-written patches (`patches/`)

Fixtures for the gate tests. They are written by hand, never by a model, and are applied by
`vulcan verify-patch` in the Docker integration tests:

| Patch | Expected outcome |
|---|---|
| `good.patch` | Every gate passes: seed 101 renders user input as text, the banner is untouched, all snapshot pages identical, L3. |
| `banner-break.patch` | Tests and visible text unchanged, but the sanitiser also strips the trusted banner's markup: the behaviour gate fails and names the `announcement` page's DOM-signature difference. |
| `variant-gap.patch` | Only the base payload form is blocked: the exploit gate fails because effective variants still reproduce. |
| `breaking.patch` | The tests gate fails. |
| `edits-test.patch` | The policy gate fails before any sandbox work (it edits a test file). |
| `good-guestbook.patch` | Seed 102 renders a stored comment as text: every gate passes (used by the category run, T-8.9). |
| `good-link.patch` | Seed 103 allows only the app's own origin and `mailto:` as an `href`: every gate passes. |
| `dompurify.patch` | Seed 102 keeps HTML on purpose and sanitises it with the fix guide's one allowed dependency (`dompurify`, pinned), added to `package.json` only. Vulcan regenerates the lockfile; every gate passes and the PR body says "adds a dependency". |

## Build and serve (sandbox only)

`vulcan sandbox-check tests/benchmarks/react-xss` builds and serves it in the sandbox. The install
step (the only one with network access) runs:

```
npm ci --ignore-scripts
```

The build step has no network access and runs:

```
npm run build
```

Vulcan's own static server then serves `dist/`, so `serve_cmd` is not used. See
`docs/architecture/sandbox-image.md` §Node UI apps.

## Test

```
npm test
```
