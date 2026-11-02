import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SafeTextPage from "./SafeTextPage.jsx";

describe("SafeTextPage", () => {
  it("renders markup as literal text, never as DOM", () => {
    const { container } = render(<SafeTextPage text="<b>hi</b>" />);
    const message = container.querySelector(".message");
    expect(message).toHaveTextContent("<b>hi</b>");
    expect(container.querySelector(".message b")).toBeNull();
  });

  it("shows a fallback when the message is empty", () => {
    render(<SafeTextPage text="" />);
    expect(screen.getByText("No message.")).toBeInTheDocument();
  });
});
