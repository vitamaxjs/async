/**
 * A Notifier is a synchronization primitive that allows tasks to wait for a notification.
 * It maintains a queue of callbacks that are called when `notify` is invoked.
 */
export class Notifier {
  private queue: VoidFunction[] = [];

  async wait() {
    return new Promise<void>((resolve) => this.queue.push(resolve));
  }

  notify() {
    this.queue.shift()?.();
  }
}
