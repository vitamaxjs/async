# @vitamax/async

`@vitamax/async` is a utility library about asynchronous programming in JavaScript.

## Usage

### Delay

Delays the execution for a specified number of milliseconds, with an optional AbortSignal to cancel the delay.

```typescript
import { delay } from "@vitamax/async";

await delay(1000);
console.log("Delayed!");
```

### Mutex

A Mutex is a synchronization primitive that allows only one concurrent access at a time.
It is a specialized form of Semaphore with a capacity of 1.

```typescript
import { Mutex } from "@vitamax/async";

const mutex = new Mutex();
```

### Notifier

A Notifier is a synchronization primitive that allows tasks to wait for a notification.
It maintains a queue of callbacks that are called when `notify` is invoked.

```typescript
import { Notifier } from "@vitamax/async";

const notifier = new Notifier();
const callback = () => console.log("Notified!");

notifier.wait().then(callback);
notifier.notify();
```

### Semaphore

A Semaphore is a synchronization primitive that allows a limited number of concurrent accesses.

```typescript
import { Semaphore } from "@vitamax/async";

const semaphore = new Semaphore(3);

const release = await semaphore.acquire();
// Insert your task here.
// But note that you must guarantee that you release the semaphore
// after the task is done, otherwise it may lead to deadlocks.
release();

const maybeRelease = semaphore.tryAcquire();
if (maybeRelease) {
  // Insert your task here.
  // Don't forget to release the semaphore after the task is done.
  maybeRelease();
}

await semaphore.guard(async () => {
  // Insert your task here.
  // The semaphore will be released automatically after the task is done.
});
```
