import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import VisitLinkPage from "./VisitLinkPage.jsx";

describe("VisitLinkPage", () => {
  // Turning the `link` parameter into an href that can point ANYWHERE is seed 103, not behaviour
  // to keep: the exploit oracle proves the bug by an attempted navigation to a canary host
  // (adversarial-verification.md §Browser oracle), so asserting that an arbitrary external URL
  // becomes the href would make every correct fix fail either the tests gate or the exploit gate.
  // What is behaviour: an in-app link works, a mail link works, and the empty case says so.
  it("renders an anchor for an in-app link", () => {
    render(<VisitLinkPage link="/docs" />);
    const link = screen.getByRole("link", { name: "Visit link" });
    expect(link).toHaveAttribute("href", "/docs");
  });

  it("renders an anchor for a mail link", () => {
    render(<VisitLinkPage link="mailto:team@example.com" />);
    const link = screen.getByRole("link", { name: "Visit link" });
    expect(link).toHaveAttribute("href", "mailto:team@example.com");
  });

  it("shows a fallback when no link is provided", () => {
    render(<VisitLinkPage link="" />);
    expect(screen.getByText("No link provided.")).toBeInTheDocument();
    expect(screen.queryByRole("link")).toBeNull();
  });
});
