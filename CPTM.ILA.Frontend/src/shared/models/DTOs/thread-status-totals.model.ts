import { ThreadStatus } from "../messaging/thread.model";

export interface ThreadStatusTotals {
  status: ThreadStatus;
  quantityInStatus: number;
}
