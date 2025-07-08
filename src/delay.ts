/**
 * Delays the execution for a specified number of milliseconds, with an optional AbortSignal to cancel the delay.
 *
 * @param timeout - The number of milliseconds to wait before resolving the promise.
 * @param signal - An optional AbortSignal to cancel the delay.
 * @throws {RangeError} If `timeout` is not a non-negative integer.
 * @returns A promise that resolves after the specified delay.
 */
export function delay(timeout: number, signal?: AbortSignal) {
  if (timeout < 0 || !Number.isInteger(timeout)) throw new RangeError("Timeout must be a non-negative integer");

  return new Promise<void>((resolve, reject) => {
    const timeoutId = setTimeout(resolve, timeout);

    signal?.addEventListener(
      "abort",
      (event) => {
        clearTimeout(timeoutId);
        reject((event.target as AbortSignal).reason);
      },
      { once: true }
    );
  });
}
