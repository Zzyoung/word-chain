function RedBlackBST () {
    //红黑二叉查找树
    this.root = null;
}

var RED = true;
var BLACK = false;

function Node (key, val, N, color) {
    this.key = key;
    this.val = val;
    this.N = N;
    this.color = color;
    this.left = null;
    this.right = null;
}

function size (node) {
    if (node === null) {return 0}
        else {return node.N}
}

function isRed (node) {
    if (node == null) return false;
    return node.color === RED;
}

function rotateLeft (h) {
    var temp = h.right;  
    h.right = temp.left; 
    temp.left = h;       
    temp.color = h.color;    // 保存根节点的颜色
    h.color = RED;           // 经过旋转h成了红色左链接
    temp.N = h.N;
    h.N = 1 + size(h.left) + size(h.right);
    return temp;
}

function rotateRight (h) {
    var temp = h.left;
    h.left = temp.right;
    temp.right = h;
    temp.color = h.color;
    h.color = RED;
    temp.N = h.N;
    h.N = 1 + size(h.left) + size(h.right);
    return temp;
}

function flipColors (h) {
    h.color = RED;
    h.left.color = BLACK;
    h.right.color = BLACK;
}

function put (node, key, val) {
    if (node == null) {
        return new Node(key, val, 1, RED);
    }
    var cmp = compareTo(key, node.key);
    if (cmp < 0) {
        node.left = put(node.left, key, val);
    } else if (cmp > 0) {
        node.right = put(node.right, key, val);
    } else {
        node.val = val;
    }

    if (isRed(node.right) && !isRed(node.left)) {
        node = rotateLeft(node);
    }

    if (isRed(node.left) && isRed(node.left.left)) {
        node = rotateRight(node);
    }

    if (isRed(node.left) && isRed(node.right)) {
        flipColors(node);
    }

    node.N = size(node.left) + size(node.right) + 1;
    return node;
}

function compareTo (val1, val2) {
    if (val1 < val2) {
        return -1;
    } else if(val1 > val2) {
        return 1;
    } else {
        return 0;
    }
}

RedBlackBST.prototype.put = function (key, val) {
    this.root = put(this.root, key, val)
    this.root.color = BLACK;
}

