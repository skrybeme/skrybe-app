import { Maybe } from '@/common/types';

class Queue<T> {
  constructor(private _elements: Array<T> = []) {}

  dequeue(): Maybe<T> {
    if (!this._elements.length) {
      return undefined;
    }

    return this._elements.shift();
  }

  enqueue(element: T): void {
    this._elements.push(element);
  }

  getElements(): Array<T> {
    return this._elements;
  }

  isEmpty(): boolean {
    return this._elements.length === 0;
  }
}

export default Queue;
