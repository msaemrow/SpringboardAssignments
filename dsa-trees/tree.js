/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    const sumSubTree = (node) => {
      if(node === null) return 0;

      let sum = node.val;

      for(let child of node.children){
        sum += sumSubTree(child)
      }

      return sum;
    }

    return sumSubTree(this.root);
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    const countEvens = (node) => {
      if(node === null) return 0;

      let count = (node.val % 2 === 0)  ? 1 : 0;

      for(let child of node.children){
        count += countEvens(child);
      }
      return count;
    }
    return countEvens(this.root);
  }

  /** numGreater(lowerBound): Given a n-ary tree and a number x, find and return the number of nodes which are greater than x. */

  numGreater(x) {
    const countIfGreater = (node, x) => {
      if(node === null) return 0;

      let count = (node.val > x) ? 1 : 0;

      for(let child of node.children){
        count += countIfGreater(child, x);
      }
      return count;
    }
    return countIfGreater(this.root, x);
  }
}

module.exports = { Tree, TreeNode };
