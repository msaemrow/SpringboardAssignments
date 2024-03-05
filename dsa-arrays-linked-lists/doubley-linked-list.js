/** Node: node for a doubly linked list. */

class Node {
    constructor(val) {
      this.val = val;
      this.next = null;
      this.prev = null;
    }
  }
  
  /** LinkedList: chained together nodes. */
  
  class DoublyLinkedList {
    constructor(vals = []) {
      this.head = null;
      this.tail = null;
      this.length = 0;
  
      for (let val of vals) this.push(val);
    }

      /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if(this.head == null){
      this.head = newNode;
      this.tail = this.head;
    } else{
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length += 1;
  }

  unshift(val) {
    let newNode = new Node(val);

    if(this.length === 0){
      this.head = newNode;
      this.tail = this.head;
    } else{
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.length += 1
  }

  
}  

module.exports = DoublyLinkedList;