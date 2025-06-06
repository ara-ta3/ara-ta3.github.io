import { renderHook, act } from "@testing-library/react";
import { expect, test, describe, beforeEach } from "vitest";
import useLocalStorage from "@/hooks/useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("initializes from localStorage", () => {
    localStorage.setItem("ls-key", "1");
    const { result } = renderHook(() => useLocalStorage<number>("ls-key", 0));
    expect(result.current[0]).toBe(1);
  });

  test("updates localStorage when value changes", () => {
    const { result } = renderHook(() => useLocalStorage<number>("ls-key", 0));
    act(() => {
      const [, setValue] = result.current;
      setValue(5);
    });
    expect(localStorage.getItem("ls-key")).toBe("5");
  });

  test("stores object values", () => {
    const { result } = renderHook(() =>
      useLocalStorage<Record<string, number>>("ls-obj", { a: 1 }),
    );
    act(() => {
      const [, setValue] = result.current;
      setValue((prev) => ({ ...prev, b: 2 }));
    });
    expect(localStorage.getItem("ls-obj")).toBe(JSON.stringify({ a: 1, b: 2 }));
  });
});
