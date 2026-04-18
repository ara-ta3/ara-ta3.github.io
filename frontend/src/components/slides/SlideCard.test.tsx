import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SlideCard from "@/components/slides/SlideCard";

describe("SlideCard", () => {
  test("renders slide with image, description, date, and event link", () => {
    const { asFragment } = render(
      <SlideCard
        slide={{
          slug: "sample",
          title: "サンプルスライド",
          description: "スライドの説明",
          image: "https://example.com/thumb.png",
          date: "2026-04-22",
          url: "/slides/sample.html",
          eventName: "サンプルイベント",
          eventUrl: "https://example.com/event/1",
        }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders slide without optional fields", () => {
    const { asFragment } = render(
      <SlideCard
        slide={{
          slug: "minimal",
          title: "最小スライド",
          url: "/slides/minimal.html",
        }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
