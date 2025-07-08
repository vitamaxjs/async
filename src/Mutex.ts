import { Semaphore } from "./Semaphore";

/**
 * A Mutex is a synchronization primitive that allows only one concurrent access at a time.
 * It is a specialized form of Semaphore with a capacity of 1.
 */
export class Mutex extends Semaphore {
  constructor() {
    super(1);
  }
}
