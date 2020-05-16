const maxHeapMethod = require("./maxHeap")


function heapSort(arr) {
    let constructMaxHeap = maxHeapMethod.buildArrToMaxHeap(arr)
    const ret = []
    while (constructMaxHeap.length > 0) {
        const { max, newHeap } = maxHeapMethod.extractMax(constructMaxHeap)
        constructMaxHeap = newHeap
        ret.push(max)

    }
    return ret
}