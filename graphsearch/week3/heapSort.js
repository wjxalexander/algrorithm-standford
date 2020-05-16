const maxHeapMethod = require("./maxHeap")


function heapSort(arr) {

    let constructMaxHeap = maxHeapMethod.buildArrToMaxHeap(arr)
    const length = arr.length
    const ret = []

    while (length > ret.length) {
        const { max, newHeap } = maxHeapMethod.extractMax(constructMaxHeap)
        constructMaxHeap = newHeap
        ret.push(max)

    }
    return ret
}

const ret = heapSort([1, 4, 3, 6, 7, 8, 2, 5, 9, 12, 15, 13, 14])

console.log(ret)