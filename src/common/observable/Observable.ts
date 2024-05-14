type Listener<T> = (value: T) => void;

export class Observable<T> {
  private listeners: Listener<T>[] = [];

  constructor(private value: T) {}

  get(): T {
    return this.value;
  }

  set(newValue: T) {
    if (newValue === this.value) return;

    this.value = newValue;
    this.listeners.forEach((listener) => listener(newValue));
  }

  subscribe(listener: Listener<T>): () => void {
    this.listeners.push(listener);

    return () => this.unsubscribe(listener);
  }

  private unsubscribe(listener: Listener<T>) {
    const index = this.listeners.indexOf(listener);

    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
}
