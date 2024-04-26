import "@testing-library/jest-dom"; // For additional matchers
import { ResizeObserver } from "@juggle/resize-observer"; // Polyfill for ResizeObserver
import { vi } from "vitest";

/* @ts-ignore */
HTMLCanvasElement.prototype.getContext = () => {
  return {
    fillStyle: "",
    fillRect: vi.fn(),
  };
};
process.env.BASE_URL = "/";
