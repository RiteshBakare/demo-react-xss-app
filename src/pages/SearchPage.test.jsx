import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SearchPage from "./SearchPage.jsx";

describe("SearchPage", () => {
  it("prompts for a query when empty", () => {
    render(<SearchPage query="" />);
    expect(screen.getByText("Type a query to search.")).toBeInTheDocument();
  });

  it("renders a plain-text query into the results", () => {
    const { container } = render(<SearchPage query="widgets" />);
    const results = container.querySelector(".search-results");
    expect(results).toHaveTextContent("widgets");
    expect(screen.getByText("Results for your search:")).toBeInTheDocument();
  });

  // Rendering USER INPUT as HTML is seed 101, not behaviour to keep: asserting it here would
  // make a correct fix fail the tests gate. The trusted-HTML expectation lives on the
  // Announcement banner and in the UI snapshot's DOM signature (T-8.8) instead.
  it("shows the query text whatever markup it contains", () => {
    const { container } = render(<SearchPage query="<b>hello</b>" />);
    expect(container.querySelector(".search-results")).toHaveTextContent("hello");
  });
});
