import { setupWorker } from "msw/browser";

import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

export async function startMockWorker() {
  if (typeof window === "undefined") {
    return;
  }

  if (import.meta.env.VITE_API_MOCK !== "true") {
    return;
  }

  await worker.start({ onUnhandledRequest: "bypass" });
  // eslint-disable-next-line no-console
  console.info("MSW mock service worker enabled");
}
