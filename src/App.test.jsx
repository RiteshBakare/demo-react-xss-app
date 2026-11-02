import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App, { renderRoute, ROUTES } from "./App.jsx";

describe("App routing", () => {
  it("renders the home page with a link to every other route", () => {
    render(<App />);
    expect(screen.getByText("react-xss benchmark")).toBeInTheDocument();
    for (const route of ROUTES.filter((r) => r !== "/")) {
      expect(screen.getByRole("link", { name: route })).toHaveAttribute("href", route);
    }
  });

  it("maps /search to the search page using the q parameter", () => {
    const { container } = render(renderRoute("/search", new URLSearchParams("q=widgets")));
    expect(container.querySelector(".search-results")).toHaveTextContent("widgets");
  });

  it("falls back to the home page for an unknown route", () => {
    render(renderRoute("/nope", new URLSearchParams()));
    expect(screen.getByText("Local testing only. Never deploy.")).toBeInTheDocument();
  });
});
