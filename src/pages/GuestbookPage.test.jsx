import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import GuestbookPage, { STORAGE_KEY } from "./GuestbookPage.jsx";

afterEach(() => {
  window.localStorage.clear();
});

describe("GuestbookPage", () => {
  it("renders every seeded comment", () => {
    const { container } = render(<GuestbookPage />);
    expect(container.querySelectorAll(".comments li")).toHaveLength(3);
    expect(screen.getByText("Great app, thanks!")).toBeInTheDocument();
    expect(screen.getByText("Works well on mobile.")).toBeInTheDocument();
  });

  // Rendering a STORED COMMENT as HTML is seed 102, not behaviour to keep: asserting it here
  // would make a correct fix fail the tests gate. Only the comment's words are behaviour.
  it("shows the words of a comment that contains markup", () => {
    const { container } = render(<GuestbookPage />);
    expect(container.querySelector(".comments")).toHaveTextContent("design");
  });

  it("shows an empty message when there are no comments", () => {
    render(<GuestbookPage comments={[]} />);
    expect(screen.getByText("No comments yet.")).toBeInTheDocument();
  });

  it("renders a comment posted to localStorage through the stored-HTML sink", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ id: 42, body: "A <b>posted</b> note." }]),
    );
    const { container } = render(<GuestbookPage />);
    // Bundled comments (3) plus the one from storage.
    expect(container.querySelectorAll(".comments li")).toHaveLength(4);
    const comments = container.querySelectorAll(".comments li");
    expect(comments[comments.length - 1]).toHaveTextContent("posted");
  });

  it("ignores absent or malformed localStorage", () => {
    window.localStorage.setItem(STORAGE_KEY, "not json");
    const { container } = render(<GuestbookPage />);
    expect(container.querySelectorAll(".comments li")).toHaveLength(3);
  });
});
