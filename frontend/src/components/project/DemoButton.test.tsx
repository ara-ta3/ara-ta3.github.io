import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import DemoButton from "@/components/project/DemoButton";

describe("DemoButton", () => {
  test("公開ページとSNSの外部リンクを表示する", () => {
    render(
      <DemoButton
        demoUrl="https://example.com/"
        socialLinks={[
          {
            label: "Instagram",
            url: "https://www.instagram.com/example/",
          },
          { label: "X", url: "https://x.com/example" },
        ]}
      />,
    );

    expect(
      screen.getByRole("link", { name: "公開ページを見る" }),
    ).toHaveAttribute("href", "https://example.com/");
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/example/",
    );
    expect(screen.getByRole("link", { name: "X" })).toHaveAttribute(
      "href",
      "https://x.com/example",
    );
  });
});
