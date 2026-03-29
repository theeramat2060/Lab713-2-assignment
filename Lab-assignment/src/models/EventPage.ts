import type { event } from "@prisma/client";

export interface PageEvent {
  count: number;
  events: event[];
}
