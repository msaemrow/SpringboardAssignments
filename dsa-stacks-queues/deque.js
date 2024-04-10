const {Node, DoublyLinkedList} = require('./doubly-linked-list');

class Deque{
    constructor(){
        this.list = new DoublyLinkedList();
    }

    addFirst(val){
        this.list.prepend(val);
    }

    addLast(val){
        this.list.append(val);
    }

    removeFirst(){
        if(this.list.size === 0){
            throw new Error("Can't remove from an empty stack")
        }
        return this.list.removeFirst();
    }

    removeLast(){
        if(this.list.size === 0){
            throw new Error("Can't remove from an empty stack")
        }
        return this.list.removeLast();
    }

    peekFirst(){
        return this.list.head ? this.list.head.val : null;
    }

    peekLast(){
        return this.list.tail ? this.list.tail.val : null;
    }

    isEmpty(){
        return this.list.size === 0;
    }
}

module.exports = Deque;