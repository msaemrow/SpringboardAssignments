// LinkedList.js
class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    insertFirst(data) {
        this.head = new Node(data, this.head);
        this.size++;
    }

    removeAt(index) {
        if (index === 0) {
            const removedData = this.head.data
            this.head = this.head.next;
            this.size--;
            return removedData;
        }

        let current = this.head;
        let previous;
        let count = 0;

        while (count < index) {
            previous = current;
            current = current.next;
            count++;
        }

        previous.next = current.next;
        this.size--;
        return current.data
    }
}

module.exports = { Node, LinkedList };
