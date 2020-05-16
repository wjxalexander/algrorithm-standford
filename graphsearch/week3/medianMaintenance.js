const fs = require("fs");
const R = require("ramda");
const dayjs = require("dayjs");
const minHeapMethods = require("./minHeap")
const maxHeapMethods = require("./maxHeap")
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
const source = "median"
fs.readFile(`./graphsearch/week3/${source}.txt`, "utf-8", (err, data) => {
    const list = data
        .toString()
        .split("\n")
        .map(item => parseInt(item));

    // const ret = maxHeapMethods.buildArrToMaxHeap(list)
    // const ret = minHeapMethods.buildArrToMinHeap(list)
    // const max = maxHeapMethods.extractMax(ret)
    const ret = medianMaintenance(list)
    console.log(ret)
});


const test = "35 33 42 10 14 19 27 44 26 31".split(" ").map((item) => parseInt(item))
// maxHeapMethods.maxheapfy(test, test.length, 0)

function medianMaintenance(test) {

    let leftMaxHeap = []
    let rightMinHeap = []
    const [first, second, ...rest] = R.clone(test)
    const median = [first]
    let ret = first
    // initialize
    if (first > second) {
        leftMaxHeap.push(second)
        rightMinHeap.push(first)
    } else {
        leftMaxHeap.push(first)
        rightMinHeap.push(second)
        // ret += first
    }
    const secondRet = first > second ? second : first
    ret += secondRet // initialize first Two
    median.push(secondRet)
    for (let item of rest) {
        const maxInLeft = leftMaxHeap[0]
        const minInRight = rightMinHeap[0]
        if (item < maxInLeft) {
            leftMaxHeap = maxHeapMethods.maxHeapInsertion(leftMaxHeap, item)
        } else {
            rightMinHeap = minHeapMethods.minHeapInsertion(rightMinHeap, item)
        }
        if (leftMaxHeap.length > rightMinHeap.length + 1) {
            const { max, newHeap } = maxHeapMethods.extractMax(leftMaxHeap)
            leftMaxHeap = newHeap
            rightMinHeap = minHeapMethods.minHeapInsertion(rightMinHeap, max)
        }
        if (rightMinHeap.length > leftMaxHeap.length + 1) {
            const { min, newHeap } = minHeapMethods.extractMin(rightMinHeap)
            rightMinHeap = newHeap
            leftMaxHeap = maxHeapMethods.maxHeapInsertion(leftMaxHeap, min)
        }
        if (leftMaxHeap.length === rightMinHeap.length) {
            ret += leftMaxHeap[0]
            median.push(leftMaxHeap[0])
        }
        if (leftMaxHeap.length > rightMinHeap.length) {
            ret += leftMaxHeap[0]
            median.push(leftMaxHeap[0])

        } if (leftMaxHeap.length < rightMinHeap.length) {
            ret += rightMinHeap[0]
            median.push(rightMinHeap[0])

        }

    }

    return ret % 10000
}


// medianMaintenance(test)