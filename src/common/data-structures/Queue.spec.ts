import Queue from './Queue';

describe(`Queue`, () => {
  describe("getElements", () => {
    it(`returns all enqueued elements in order they were enqueued`, () => {
      const queue = new Queue<number>([1, 2, 3]);

      expect(queue.getElements()).toEqual([1, 2, 3]);
    });
  });

  describe(`enqueue`, () => {
    it(`enqueues an element`, () => {
      const queue = new Queue<number>([1]);

      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.enqueue(5);
      queue.enqueue(8);

      expect(queue.getElements()).toEqual([1, 1, 2, 3, 5, 8]);
    });
  });

  describe(`dequeue`, () => {
    it(`returns undefined if the queue is empty`, () => {
      const queue = new Queue();

      expect(queue.dequeue()).toBeUndefined();
    });

    it(`returns enqueued elements in fifo order`, () => {
      const queue = new Queue([1]);

      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.enqueue(5);
      queue.enqueue(8);

      expect(queue.dequeue()).toEqual(1);
      expect(queue.dequeue()).toEqual(1);
      expect(queue.dequeue()).toEqual(2);
      expect(queue.dequeue()).toEqual(3);
      expect(queue.dequeue()).toEqual(5);
      expect(queue.dequeue()).toEqual(8);
    });

    it(`remove elements from the beggining of the elements array`, () => {
      const queue = new Queue();

      queue.enqueue(1);
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);

      queue.dequeue();

      expect(queue.getElements()).toEqual([1, 2, 3]);

      queue.dequeue();

      expect(queue.getElements()).toEqual([2, 3]);

      queue.dequeue();

      expect(queue.getElements()).toEqual([3]);
    });
  });

  describe(`isEmpty`, () => {
    it(`returns true if the elements array is empty`, () => {
      const queue = new Queue<number>();

      expect(queue.isEmpty()).toBeTruthy();
    });

    it(`returns false if the elements array is not empty`, () => {
      const queue = new Queue<number>([1, 1]);

      expect(queue.isEmpty()).toBeFalsy();
    });
  });
});
