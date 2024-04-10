class Node{
 constructor(val){
    this.val = val;
    this.prev = null;
    this.next = null;
 }   
}

class DoublyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    prepend(val){
        const newNode = new Node(val);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
    }

    append(val){
        const newNode = new Node(val);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        } else{
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    removeFirst(){
        if(!this.head) return null;
        const removedData = this.head.val;
        if(this.head === this.tail){
            this.head = null;
            this.tail = null;
        } else{
            this.head = this.head.next;
            if(this.head){
                this.head.prev = null;
            }
        }
        this.size--;
        return removedData;
    }

    removeLast(val){
        if(!this.head) return null;
        const removedData = this.tail.val;
        if(this.head === this.tail){
            this.head = null;
            this.tail = null;
        }else{
            this.tail = this.tail.prev;
            if(this.tail){
                this.tail.next = null;
            }
        }
        this.size--;
        return removedData;
    }
}

module.exports = { Node, DoublyLinkedList };