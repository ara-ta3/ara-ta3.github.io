import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HobbiesPage from "@/pages/hobbies/+Page";

describe("HobbiesPage", () => {
  it("Splatoonの詳細ページへの導線を表示する", () => {
    render(<HobbiesPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("趣味");
    expect(screen.getByRole("link", { name: /Splatoon/ })).toHaveAttribute(
      "href",
      "/hobbies/splatoon/",
    );
  });
});
