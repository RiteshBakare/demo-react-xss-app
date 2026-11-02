import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AnnouncementPage from "./AnnouncementPage.jsx";

// The banner's trusted HTML must keep rendering as a real <b> node. That is asserted by the UI
// snapshot's DOM signature (T-8.8), not here: a patch that strips the banner's markup but keeps
// its words must be caught by the behaviour gate, which is what banner-break.patch proves.
describe("AnnouncementPage (trusted-HTML banner)", () => {
  it("shows the welcome announcement text", () => {
    const { container } = render(<AnnouncementPage />);
    expect(container.querySelector(".announcement")).toHaveTextContent(
      "Welcome to the Vulcan Demo!",
    );
  });
});
