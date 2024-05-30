/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    const findMinDepth = (node) => {
      if(node === null) return 0;

      if(node.left === null && node.right === null) return 1;

      if(node.left === null) return findMinDepth(node.right) + 1;
      if(node.right === null) return findMinDepth(node.left) + 1;

      return Math.min(findMinDepth(node.left), findMinDepth(node.right)) + 1;
    };
    return findMinDepth(this.root)
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    const findMaxDepth = (node) => {
      if(node === null) return 0;

      if(node.left === null && node.right === null) return 1;

      if(node.left === null) return findMaxDepth(node.right) + 1;
      if(node.right === null) return findMaxDepth(node.left) + 1;

      return Math.max(findMaxDepth(node.left), findMaxDepth(node.right)) + 1;
    };
    return findMaxDepth(this.root)
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if(this.root === null) return 0;

    let maxSum = -Infinity;
    const findMaxSum = (node) => {
      if(node === null) return 0;

      let leftMax = Math.max(findMaxSum(node.left), 0);
      let rightMax = Math.max(findMaxSum(node.right), 0);

      let currSum = node.val  + leftMax + rightMax;
      maxSum = Math.max(maxSum, currSum);
      return node.val + Math.max(leftMax, rightMax);
    };
    findMaxSum(this.root);
    return maxSum;
  }

  /** nextLarger(x): Find and return the value of the node with next larger element in the tree i.e. find a node with value just greater than x. Return null if no node is present with value greater than x. */

  nextLarger(x) {
    let closestGreater = null;
    const inOrderTraversal = (node) => {
      if(node === null) return;
      inOrderTraversal(node.left);
      if(node.val > x){
        if(closestGreater === null || node.val < closestGreater){
          closestGreater = node.val
        }
      }
      inOrderTraversal(node.right);
    }
    inOrderTraversal(this.root);

    return closestGreater;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    const findDepthandParent = (node, target, depth = 0, parent=null) => {
      if(node === null) return null;

      if(node===target) return { depth, parent };

      let leftResult = findDepthandParent(node.left, target, depth + 1, node);
      if(leftResult !== null) return leftResult;

      let rightResult = findDepthandParent(node.right, target, depth + 1, node);
      if(rightResult !== null) return rightResult;

      return null;
    }
    const node1Info = findDepthandParent(this.root, node1);
    const node2Info = findDepthandParent(this.root, node2);

    return(
      node1Info !== null && node2Info !== null && node1Info.depth === node2Info.depth && node1Info.parent !== node2Info.parent
    )
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const traverseNode = (node) => {
      if(node===null) {
        serializedString.push('#');
        return;
      }
      serializedString.push(node.val.toString());
      traverseNode(node.left);
      traverseNode(node.right);
    }
    const serializedString = [];
    traverseNode(tree.root);
    return serializedString.join(',');
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(dataArray) {
    const buildTree = (data) => {
      const val = data.shift();
      if(val === '#' || val === undefined){
        return null;
      }
      const node = new BinaryTreeNode(parseInt(val));
      node.left = buildTree(data);
      node.right = buildTree(data);
      return node;
    };
    const data = dataArray.split(',');
    return new BinaryTree(buildTree(data));
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    const findLCA = (root, p, q) => {
      if(root === null || root === p || root === q) return root;

      const leftLCA = findLCA(root.left, p, q);
      const rightLCA = findLCA(root.right, p, q);

      if(leftLCA !== null && rightLCA !== null) return root;

      return leftLCA !== null ? leftLCA : rightLCA;
    }
    return findLCA(this.root, node1, node2);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
