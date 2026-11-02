import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import GoPage from "./GoPage.jsx";

describe("GoPage", () => {
  it("redirects to the next destination on mount", () => {
    const navigate = vi.fn();
    render(<GoPage next="/dashboard" navigate={navigate} />);
    expect(navigate).toHaveBeenCalledWith("/dashboard");
  });

  it("does not redirect when there is no destination", () => {
    const navigate = vi.fn();
    render(<GoPage next="" navigate={navigate} />);
    expect(navigate).not.toHaveBeenCalled();
  });

  it("shows a redirecting message", () => {
    render(<GoPage next="/dashboard" navigate={vi.fn()} />);
    expect(screen.getByText("Taking you to your destination.")).toBeInTheDocument();
  });
});
