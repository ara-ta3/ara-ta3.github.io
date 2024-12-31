import React from "react";
import { render } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import Header from "./Header.tsx";

describe("Header Snapshot Test", () => {
  test("render headers", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
