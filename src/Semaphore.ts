import { Notifier } from "./Notifier";

/**
 * A Semaphore is a synchronization primitive that allows a limited number of concurrent accesses.
 */
export class Semaphore {
  private available: number;
  private notifier = new Notifier();

  constructor(capacity: number) {
    if (capacity <= 0 || !Number.isInteger(capacity)) throw new RangeError("Capacity must be a positive integer");
    this.available = capacity;
  }

  async acquire() {
    while (this.available <= 0) await this.notifier.wait();
    return this.acquireInternal();
  }

  tryAcquire() {
    if (this.available <= 0) return;
    return this.acquireInternal();
  }

  private acquireInternal() {
    this.available--;
    let released = false;
    return () => {
      if (released) return;
      released = true;

      this.available++;
      this.notifier.notify();
    };
  }

  async guard<T>(task: () => Promise<T>) {
    const release = await this.acquire();
    try {
      return await task();
    } finally {
      release();
    }
  }
}
