export {}; // makes this a module

declare global {
  interface Window {
    gtag: (
      command: "config" | "event",
      targetId: string,
      params?: Record<string, unknown>
    ) => void;
  }
}
