import React from "react";
import { render } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import Home from "./+Page.tsx";

describe("Home Snapshot Test", () => {
  test("render Home", () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
