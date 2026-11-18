import { describe, expect, it } from "vitest";
import { cn, formatBytes } from "./utils";

describe("formatBytes", () => {
  it("formats 0 bytes correctly", () => {
    expect(formatBytes(0)).toBe("0 Bytes");
  });

  it("formats kilobytes correctly", () => {
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(1536)).toBe("1.5 KB");
  });

  it("formats megabytes correctly", () => {
    expect(formatBytes(1024 * 1024)).toBe("1 MB");
    expect(formatBytes(2.5 * 1024 * 1024)).toBe("2.5 MB");
  });

  it("formats gigabytes correctly", () => {
    expect(formatBytes(1024 * 1024 * 1024)).toBe("1 GB");
  });

  it("respects decimal precision", () => {
    expect(formatBytes(1234567, 2)).toBe("1.18 MB");
  });
});

describe("cn", () => {
  it("merges class names cleanly", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("resolves tailwind conflicts", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("handles conditional classes", () => {
    const isHidden = false;
    const isActive = true;
    expect(cn("base-class", isHidden && "hidden", isActive && "active")).toBe("base-class active");
  });
});
