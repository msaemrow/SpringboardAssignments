const {Node, LinkedList} = require('./linkedList');

class Stack{
    constructor(){
        this.size = 0;
        this.list = new LinkedList();
    }

    push(val){
        this.list.insertFirst(val);
        this.size++;
    }

    pop(){
        if(this.size === 0){
            throw new Error("Can't pop from an empty stack")
        }

        const removed = this.list.removeAt(0);
        this.size--;
        return removed;
    }

    peek(){
        if(this.size === 0){
            throw new Error("Can't peek in on an empty stack")
        }
        return this.list.head ? this.list.head.data : null;
    }

    isEmpty(){
        return this.size === 0;
    }
}

module.exports = Stack;