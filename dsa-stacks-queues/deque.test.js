const Deque = require("./deque");

let deque;

beforeEach(function() {
  deque = new Deque();
});

describe("test add functions", function() {
  it("places the value at the beginning or the end of the deque and returns undefined", function() {
    expect(deque.addFirst(10)).toBe(undefined);
    expect(deque.peekFirst()).toBe(10);
    expect(deque.peekLast()).toBe(10);
    expect(deque.list.size).toBe(1);
    expect(deque.addFirst(20)).toBe(undefined);
    expect(deque.peekFirst()).toBe(20);
    expect(deque.peekLast()).toBe(10);
    expect(deque.addLast(30)).toBe(undefined);
    expect(deque.peekFirst()).toBe(20);
    expect(deque.peekLast()).toBe(30);
  });
});

describe("test the remove functions and returns the removed value", function() {
  it("returns the value of the node removed", function() {
    deque.addFirst(10);
    deque.addFirst(20);
    deque.addFirst(30);
    const first = deque.removeFirst();
    expect(first).toBe(30);
    expect(deque.list.size).toBe(2);
    const last = deque.removeLast();
    expect(last).toBe(10);
    expect(deque.list.size).toBe(1);
    deque.removeFirst()
    expect(deque.list.size).toBe(0);
  });

  it("throws an error if the stack is empty", function() {
    expect(() => deque.removeFirst()).toThrow(Error);
  });
});

describe("test peek functions", function() {
  it("returns the value at the start or the end of the deque", function() {
    deque.addFirst(3);
    expect(deque.peekFirst()).toBe(3);
    deque.addLast(5);
    expect(deque.peekLast()).toBe(5);
  });
});

describe("isEmpty", function() {
  it("returns true for empty stacks", function() {
    expect(deque.isEmpty()).toBe(true);
  });

  it("returns false for nonempty stacks", function() {
    deque.addFirst(3);
    expect(deque.isEmpty()).toBe(false);
  });
});
