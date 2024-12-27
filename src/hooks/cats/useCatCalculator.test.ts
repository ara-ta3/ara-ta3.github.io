import { describe, it, expect } from "vitest";
import useCatCalculator from "./useCatCalculator";
import { renderHook, act } from "@testing-library/react";

describe("useCatCalculator", () => {
  it("計算対象に追加できる", () => {
    const { result } = renderHook(() => useCatCalculator());
    act(() => {
      result.current.addCalculateTarget(1);
    });
    expect(result.current.calculateTargets).toEqual({ 1: { gram: 0 } });
  });

  it("計算対象に追加した対象のグラム数を変更できる", () => {
    const { result } = renderHook(() => useCatCalculator());
    act(() => {
      result.current.addCalculateTarget(1);
      result.current.chagneCalculateTargetGram(1, 100);
    });
    expect(result.current.calculateTargets).toEqual({ 1: { gram: 100 } });
  });
});
