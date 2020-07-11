const fs = require("fs");
const R = require("ramda");
const dayjs = require("dayjs");

const fileName = "huffman";
fs.readFile(
    `./greedyAndDynamic/week3/${fileName}.txt`,
    "utf-8",
    (err, data) => {
        const list = data
            .toString()
            .split("\n")
            .slice(1)
            .map(item => parseInt(item));

        const start = new Date()
        const sortedList = R.sort((a, b) => a - b, list)
        const sort = new Date()
        const huffmanTree = huffManCodeWithTwoQueue(sortedList)
        const hoff = new Date()
        const min = findMinLevel(huffmanTree) //9
        const max = findMaxLevel(huffmanTree) //19
        const finish = new Date()

        console.log(min, max, sort - start, hoff - sort, finish - sort)
    }
);

function findMinLevel(hufTree) {
    const _help = (tree, lastLevel) => {
        if (tree.sign !== "internalNode") {
            return lastLevel
        }
        const leftRet = tree.left && _help(tree.left, lastLevel + 1)
        const rightRet = tree.right && _help(tree.right, lastLevel + 1)
        return leftRet > rightRet ? rightRet : leftRet;
    }
    return _help(hufTree, 0)
}

function findMaxLevel(hufTree) {
    const _help = (tree, lastLevel) => {
        if (tree.sign !== "internalNode") {
            return lastLevel
        }
        const leftRet = tree.left && _help(tree.left, lastLevel + 1)
        const rightRet = tree.right && _help(tree.right, lastLevel + 1)
        return leftRet < rightRet ? rightRet : leftRet;
    }
    return _help(hufTree, 0)
}


class Queue {
    constructor() {
        this.queue = []
    }
    enqueue(node) {
        this.queue.push(node)
    }
    dequeue() {
        return this.queue.shift()
    }
    getSize() {
        return this.queue.length
    }
    isEmpty() {
        return this.queue.length === 0
    }
}

class Node {
    constructor(frequency, sign) {
        this.frequency = frequency
        this.sign = sign
        this.left = this.right = null;
    }
}

function findMin(queue1, queue2) {
    if (queue1.isEmpty()) {
        return queue2.dequeue()
    }
    if (queue2.isEmpty()) {
        return queue1.dequeue()
    }
    return queue1.queue[0].frequency > queue2.queue[0].frequency ? queue2.dequeue() : queue1.dequeue()
}

function huffManCodeWithTwoQueue(codes) {
    const firstQueue = new Queue();
    const secondQueue = new Queue();

    for (const item of codes) {
        firstQueue.enqueue(new Node(item, item))
    }

    while (!firstQueue.isEmpty() || secondQueue.getSize() !== 1) {
        const firstElement = findMin(firstQueue, secondQueue)
        const secondElement = findMin(firstQueue, secondQueue)
        const newFreq = firstElement.frequency + secondElement.frequency
        const newTop = new Node(newFreq, "internalNode")
        newTop.left = firstElement;
        newTop.right = secondElement
        secondQueue.enqueue(newTop)
    }

    return secondQueue.dequeue()
}