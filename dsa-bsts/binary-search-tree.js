class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);
    if (this.root === null){
      this.root = newNode;
      return this;
    }

    let currentNode = this.root;

    while(true){
      if(val < currentNode.val){
        if(currentNode.left === null){
          currentNode.left = newNode;
          break;
        }
        currentNode = currentNode.left
      } else {
        if(currentNode.right === null){
          currentNode.right = newNode;
          break;
        }
        currentNode = currentNode.right;
      }
    }
      return this
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const newNode = new Node(val);
    if(this.root === null){
      this.root = newNode;
      return this;
    }

    const insertNode = (currentNode, newNode) => {
      if(newNode.val < currentNode.val){
        if(currentNode.left === null){
          currentNode.left = newNode;
        } else {
          insertNode(currentNode.left, newNode);
        }
      } else {
        if(currentNode.right === null){
          currentNode.right = newNode;
        } else{
          insertNode(currentNode.right, newNode);
        } 
      }
    }
    insertNode(this.root, newNode);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root;
    while(currentNode !== null){
      if(currentNode.val === val){
        return currentNode;
      } else if(currentNode.left < val){
        currentNode = currentNode.left;
      } else{
        currentNode = currentNode.right;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    const findVal = (currentNode, val) => {
      if(currentNode === null) return undefined;

      if(currentNode.val === val){
        return currentNode;
      } else if(val < currentNode.val){
        return findVal(currentNode.left, val);
      } else{
        return findVal(currentNode.right, val);
      }
    };

    return findVal(this.root, val);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const result = [];

    const dfsPreOrderHelper = (currentNode) => {
      if(currentNode === null) return;
      result.push(currentNode.val);
      dfsPreOrderHelper(currentNode.left);
      dfsPreOrderHelper(currentNode.right);
    }

    dfsPreOrderHelper(this.root);
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const result = [];

    const dfsInOrderHelper = (currentNode) => {
      if(currentNode === null) return;
      dfsInOrderHelper(currentNode.left);
      result.push(currentNode.val);
      dfsInOrderHelper(currentNode.right);
    }

    dfsInOrderHelper(this.root);
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const result = [];

    const dfsPostOrderHelper = (currentNode) => {
      if(currentNode === null) return;
      dfsPostOrderHelper(currentNode.left);
      dfsPostOrderHelper(currentNode.right);
      result.push(currentNode.val);
    }

    dfsPostOrderHelper(this.root);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    if(!this.root) return [];

    const queue = [this.root];
    const result = [];

    while(queue.length > 0){
      const currentNode = queue.shift();
      result.push(currentNode.val);

      if(currentNode.left){
        queue.push(currentNode.left);
      } 

      if(currentNode.right){
        queue.push(currentNode.right);
      }
    }
    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    this.root = this._removeNode(this.root, val);
  }
    _removeNode(currentNode, val){
      if(currentNode === null) return null;
      if(val < currentNode.val){
        currentNode.left = this._removeNode(currentNode.left, val);
        return currentNode;
      } else if(val > currentNode.val){
        currentNode.right = this._removeNode(currentNode.right, val);
        return currentNode;
      } else{
          if(currentNode.left === null && currentNode.right === null){
            return null;
          }

          if(currentNode.left === null){
            return currentNode.right;
          } else if(currentNode.right === null){
            return currentNode.left;
          }

          let tempNode = this._findMin(currentNode.right);
          currentNode.val = tempNode.val;
          currentNode.right = this._removeNode(currentNode.right, tempNode.val);
          return currentNode;
        }
    }
      _findMin(node){
        while(node.left !== null){
          node = node.left;
        }
        return node;
      }


  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    return this._checkBlance(this.root) !== -1;
  }

  _checkBlance(node){
    if(node === null) return 0;

    let leftHeight = this._checkBlance(node.left);
    if(leftHeight === -1) return -1;

    let rightHeight = this._checkBlance(node.right);
    if(rightHeight === -1) return -1;

    if(Math.abs(leftHeight - rightHeight) > 1) return -1;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if(!this.root || (!this.root.left && !this.root.right))  {
      return undefined;
    }
    let max = this.root;
    let parent = null;

    while (max.right !== null){
      parent = max;
      max = max.right;
    }

    if(max.left !== null){
      return this._findMax(max.left);
    }
    return parent ? parent.val : undefined;
  }

  _findMax(node){
    while(node.right !==  null){
      node = node.right;
    }
    return node.val;
  }
}

module.exports = BinarySearchTree;
