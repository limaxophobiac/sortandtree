function fibsRec(n){
    if (n == 1) return [0];
    if (n == 2) return [0, 1];
    let prev = fibsRec(n-1);
    return [...prev, prev[prev.length-1] + prev[prev.length-2]];
}

function mergeSort(sortArray){
    if (sortArray.length <= 1) return sortArray;
    let midpoint= Math.floor(sortArray.length/2);
    let low = mergeSort(sortArray.slice(0, midpoint));
    let high = mergeSort(sortArray.slice(midpoint));
    let merged = [];
    for (let i = 0, highIndex = 0, lowIndex = 0; i < sortArray.length; i++){
        if (highIndex >= sortArray.length - midpoint || low[lowIndex] < high[highIndex])
            merged.push(low[lowIndex++]);
        else merged.push(high[highIndex++]);
    }
    return merged;
}

function linkedListFact(){
    let head = null;
    let tail = null;
    let size = 0;

    function append(value){
        let newNode = nodeFact(value);
        if (this.tail != null){
            this.tail.next = newNode;
            this.tail = newNode;
        }
        else {
            this.head = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    function prepend(value){
        let newNode = nodeFact(value);
        if (this.tail == null) this.tail = newNode;
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }

    function contains(value){
        let cur = this.head;
        while (cur != null){
            if (cur.value == value) return true;
            cur = cur.next;
        }
        return false;

    }

    function find(value){
        let index = 0;
        let cur = this.head;
        while (cur != null){
            if (cur.value == value) return index;
            cur = cur.next;
            index++;
        }
        return false;

    }

    function at(index){
        let cur = this.head;
        for (let i = 0; i < index && cur != null; i++) cur = cur.next;
        return cur;
    } 

    function toString(){}

    function pop(){
        let cur = this.head;
        if (cur == null) return null;
        if (cur.next == null) {
            this.size = 0;
            this.head = null;
            this.tail = null;
            return cur;
        }
        while (cur.next != this.tail) cur = cur.next;
        let temp = this.tail;
        this.size--;
        cur.next = null;
        this.tail = cur;
        return temp;

    }

    return {head, tail, size, append, prepend, contains, find, at, pop, toString};
}

function nodeFact(value){
    let next = null;
    return {value, next}
}

function personFactory(name, age){
    function sayHelly(nap){console.log("Hello " + name + nap + " " + age);}
    function incage(add) {age += add}
    return {sayHelly, incage, name, age};
}


class tNode {

    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }

}
function printNodeValue(node){
    console.log(node.value);
}

function prettyPrint(node, prefix = '', isLeft = true){
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

class BinTree{
    constructor(arr){
        this.root = BinTree.buildTree(arr);
    }

    static buildTree(arr){
        let sortedArray = mergeSort(arr);
        for (let i = 0, oldVal = undefined, newVal = undefined; i < sortedArray.length; i++){
            newVal = sortedArray[i];
            if (oldVal == newVal)
                sortedArray.splice(i--, 1);
            oldVal = newVal;
        }
        return this.buildTreeHelper(sortedArray, 0, sortedArray.length -1);
    }

    static buildTreeHelper(arr, start, end){
        if (start > end) return null;
        let mid = parseInt((start + end)/2);
        let node = new tNode(arr[mid]);
        node.left = this.buildTreeHelper(arr, start, mid-1);
        node.right = this.buildTreeHelper(arr, mid+1, end);
        return node;
    }

    static height(node){
        if (node.left == null && node.right == null) return 0;
        if (node.left == null) return 1 + BinTree.height(node.right);
        if (node.right == null) return 1 + BinTree.height(node.left);
        return 1 + Math.max(BinTree.height(node.right), BinTree.height(node.left));
    }

    isBalanced(){
        return BinTree.isBalancedHelper(this.root);
    }

    static isBalancedHelper(node){
        if (node.left == null && node.right == null) return true;
        if (node.left == null) return BinTree.height(node.right) <= 1;
        if (node.right == null) return BinTree.height(node.left) <= 1;
        if (Math.abs(BinTree.height(node.left) - BinTree.height(node.right)) > 1) return false;
        return BinTree.isBalancedHelper(node.left) && BinTree.isBalancedHelper(node.right);
    }

    depth(node){
        return BinTree.depthHelper(this.root, node.value);
    }

    static depthHelper(node, value){
        if (node == null || node.value == value) return 0;
        if (node.value > value) return 1+ BinTree.depthHelper(node.left, value);
        return 1+ BinTree.depthHelper(node.right, value);
    }

    levelOrder(callback = null){
        let queue = [];
        queue.push(this.root)
        let returnQueue = [];
        while (queue.length > 0) {
            if (queue[0].left != null) queue.push(queue[0].left);
            if (queue[0].right != null) queue.push(queue[0].right);
            if (callback == null) returnQueue.push(queue[0].value);
            else callback(queue[0]);
            queue.shift();
        }
        if (callback == null) return returnQueue;
        return;
    }

    inOrder(callback = null){
        return BinTree.inOrderHelper(callback, this.root);
    }

    static inOrderHelper(callback, node){
        if (callback != null) {
            if (node.left != null) BinTree.inOrderHelper(callback, node.left);
            callback(node);
            if (node.right != null) BinTree.inOrderHelper(callback, node.right);
            return;
        }
        let rArray = [];
        if (node.left != null) rArray = rArray.concat(BinTree.inOrderHelper(null, node.left));
        rArray.push(node.value);
        if (node.right != null) rArray = rArray.concat(BinTree.inOrderHelper(null, node.right));
        return rArray

    }

    preOrder(callback = null){
        return BinTree.preOrderHelper(callback, this.root);
    }

    static preOrderHelper(callback, node){
        if (callback != null) {
            callback(node);
            if (node.left != null) BinTree.preOrderHelper(callback, node.left);
            if (node.right != null) BinTree.preOrderHelper(callback, node.right);
            return;
        }
        let rArray = [];
        rArray.push(node.value);
        if (node.left != null) rArray = rArray.concat(BinTree.preOrderHelper(null, node.left));
        if (node.right != null) rArray = rArray.concat(BinTree.preOrderHelper(null, node.right));
        return rArray
    }

    postOrder(callback = null){
        return BinTree.postOrderHelper(callback, this.root);
    }

    static postOrderHelper(callback, node){
        if (callback != null) {
            if (node.left != null) BinTree.postOrderHelper(callback, node.left);
            if (node.right != null) BinTree.postOrderHelper(callback, node.right);
            callback(node);
            return;
        }
        let rArray = [];
        if (node.left != null) rArray = rArray.concat(BinTree.postOrderHelper(null, node.left));
        if (node.right != null) rArray = rArray.concat(BinTree.postOrderHelper(null, node.right));
        rArray.push(node.value);
        return rArray
    }


    search(value){
        return BinTree.searchHelper(this.root, value);
    }

    static searchHelper(node, value){
        if (node == null || node.value == value) return node;
        if (node.value > value) return this.searchHelper(node.left, value);
        return this.searchHelper(node.right, value);
    }

    insert(value){
        this.root = this.insertHelper(this.root, value);
    }

    insertHelper(node, value){
        if (node == null) return new tNode(value);
        if (value < node.value) node.left = this.insertHelper(node.left, value);
        else if (value > node.value) node.right = this.insertHelper(node.right, value);
        return node;
    }

    delete(value){
        this.root = this.deleteHelper(this.root, value);
    }

    rebalance(){
        this.root = BinTree.buildTree(this.inOrder());
    }

    deleteHelper(node, value){
        if (node == null) return node;
        if (node.value > value) node.left = this.deleteHelper(node.left, value);
        else if (node.value < value) node.right = this.deleteHelper(node.right, value);
        else {
            if (node.left == null) return node.right;
            else if (node.right == null) return node.left;

            node.value = this.minValue(node.right);
            node.right = this.deleteHelper(node.right, node.value);
        }
        return node;
    }

    minValue(node){
        let minv = node.value;
        while (node.left != null){
            minv = node.left.value;
            node = node.left;
        }
        return minv;
    }
}

let k = new BinTree([2,4,5,7,1,1,36,6,54,2,24,5]);

console.log(k);