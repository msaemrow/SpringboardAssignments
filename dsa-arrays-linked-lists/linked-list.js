/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
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
      this.tail = newNode;
    }

    this.length += 1;
  }
  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if(this.length === 0){
      this.head = newNode;
      this.tail = this.head;
    } else{
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length += 1
  }

  /** pop(): return & remove last item. */

  pop() {
    if(this.length===0){
      throw new Error("List is empty");
    }

    if(this.head.next===null){
      const poppedVal = this.head.val;
      this.head = null;
      this.tail = null;
      this.length -= 1;
      return poppedVal;
    }

    let curr = this.head;
    let prev = null;

    while(curr.next){
      prev = curr;
      curr = curr.next;
    }
    let poppedVal = curr.val;
    prev.next = null;
    this.tail = prev;
    this.length -= 1;
    return poppedVal;
  }

  /** shift(): return & remove first item. */

  shift() {
    if(this.length === 0){
      throw new Error("List is empty");
    }

    if(this.length === 1){
      let shiftHead = this.head;
      this.head = null;
      this.tail = null;
      this.length -= 1;
      return shiftHead.val;
    }

    if(this.length > 1){
      let oldHead = this.head;
      this.head = this.head.next;
      this.length -= 1;

      if(this.length === 1){
        this.tail = this.head;
      }

      return oldHead.val;
    }


  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if(idx < 0 || idx >= this.length){
      throw new Error("Invalid list index")
    }

    let count = 0;
    let curr = this.head;

    while(curr !== null && count < idx){
      curr = curr.next;
      count += 1;
    }

    return curr.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if(idx < 0 || idx >= this.length){
      throw new Error("Invalid list index")
    }

    let count = 0;
    let curr = this.head;

    while(curr !== null && count !== idx){
      curr = curr.next;
      count += 1;
    }
    curr.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if(idx < 0 || idx > this.length){
      throw new Error("Invalid list index")
    }

    if(idx === 0) return this.unshift(val);
    if(idx === this.length) return this.push(val);

    let count = 0;
    let curr = this.head;

    while(curr !== null && count !== idx-1){
      curr = curr.next;
      count += 1;
    }

    const newNode = new Node(val);
    newNode.next = curr.next;
    curr.next = newNode;
    
    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if(idx < 0 || idx >= this.length){
      throw new Error("Invalid list index")
    }
    
    if(this.length === 0) return null;

    if(idx === 0){
      this.length -= 1;
      let removedNode = this.head.val;
      this.head = this.head.next.val;
      if(this.length < 2) this.tail = this.head
      return removedNode;
    } 
    
    let count = 0;
    let curr = this.head;

    while(count < idx - 1){
      if(curr===null){
        throw new Error("Invalid list index")
      }
        curr = curr.next;
        count += 1;
    }

    if(idx === this.length - 1){
      let removedNode = curr.next.val;
      curr.next = null;
      this.tail = curr;
      this.length -= 1;
      return removedNode;
    }

    let removedNode = curr.next.val;
    curr.next = curr.next.next;
    this.length -= 1;
    return removedNode;

  }
  /** average(): return an average of all values in the list */

  average() {
    if(this.length === 0) return 0;

    let curr = this.head;
    let total = 0;

    while(curr !== null){
      total += curr.val;
      curr = curr.next;
    }

    return total / this.length;
  }
}

module.exports = LinkedList;
