import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SafeLinkPage from "./SafeLinkPage.jsx";

describe("SafeLinkPage", () => {
  it("renders the bundled https docs link", () => {
    render(<SafeLinkPage />);
    const link = screen.getByRole("link", { name: "Open the docs" });
    expect(link).toHaveAttribute("href", "https://example.com/docs");
  });
});
