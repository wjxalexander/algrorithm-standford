
// 最小堆化
function minHeapfy(arr, length, i) {
    let tempLargestPosition = i
    const leftChild = 2 * i + 1;
    const rightChild = 2 * i + 2;
    if (leftChild < length && arr[leftChild] < arr[tempLargestPosition]) {
        tempLargestPosition = leftChild
    }
    if (rightChild < length && arr[rightChild] < arr[tempLargestPosition]) {
        tempLargestPosition = rightChild
    }
    if (tempLargestPosition !== i) {
        const temp = arr[tempLargestPosition]
        arr[tempLargestPosition] = arr[i]
        arr[i] = temp
        minHeapfy(arr, length, tempLargestPosition)
    }
}
// an arry to a MinHeap o(n)ence, Heapify takes different time for each node, which is O(h). h=height of tree

function buildArrToMinHeap(arr) {
    const copyArr = Array.from(arr)
    const length = copyArr.length
    const startIndex = parseInt(length / 2 - 1)
    for (let i = startIndex; i > -1; i--) {
        minHeapfy(copyArr, length, i)
    }

    return copyArr
}

function minHeapInsertion(heap, target) {
    const copyArr = [...heap]
    copyArr.push(target)
    const _help = (heap, trackIndex) => {
        const parentIdx = parseInt((trackIndex - 1) / 2)
        if (heap[parentIdx] > heap[trackIndex]) {
            const temp = heap[parentIdx]
            heap[parentIdx] = heap[trackIndex]
            heap[trackIndex] = temp
            _help(heap, parentIdx)
        }
    }
    _help(copyArr, copyArr.length - 1)
    return copyArr
}

function extractMin(heap) {
    if(heap.length<=1){
        return heap
    }
    const copyHeap = [...heap]
    const min = copyHeap[0]
    const newHeap = [copyHeap[copyHeap.length - 1], ...copyHeap.slice(1, copyHeap.length - 1)] // tail to head 
    const _help = (heap, length, i) => {
        let tempIndex = i;
        const leftChild = 2 * i + 1;
        const rightChild = 2 * i + 2;
        if (leftChild < length && heap[leftChild] < heap[tempIndex]) {
            tempIndex = leftChild
        }
        if (rightChild < length && heap[rightChild] < heap[tempIndex]) {
            tempIndex = rightChild
        }
        if ((leftChild < length && rightChild < length) && (heap[leftChild] < heap[tempIndex] && heap[rightChild] < heap[tempIndex])) {
            tempIndex = heap[leftChild] < heap[rightChild] ? leftChild : rightChild; // smaller than both sides? swap with the small side
        }
        if (tempIndex !== i) {
            const temp = heap[tempIndex]
            heap[tempIndex] = heap[i]
            heap[i] = temp
            _help(heap, length, tempIndex)
        }
    }
    _help(newHeap, newHeap.length, 0)
    return { min, newHeap }
}

function deleteNode(heap,node){
    if(!heap.includes(node)){
        return heap
    }
    const index = heap.indexOf(node)
        const swapEle = heap[heap.length-1]
    heap[index] = swapEle
    heap.pop()
    return buildArrToMinHeap(heap)
}
const test = [1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17]
const Heap = buildArrToMinHeap(test)
const insert = minHeapInsertion(Heap, 11)
const minHeap = extractMin(Heap)
const test2 = []
const heap2 = buildArrToMinHeap(test2)
const deleteHeap = deleteNode(Heap, 6)


module.exports = {
    minHeapfy,
    minHeapInsertion,
    extractMin,
    buildArrToMinHeap,
    deleteNode
}