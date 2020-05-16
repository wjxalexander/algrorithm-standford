// n:length i position 
// maxheapfy
// 建立堆: 从爸爸开始看 比爸爸大 交换 以后一直交换到比他小位置
function maxheapfy(arr, length, i) {
    let tempLargestPosition = i
    const leftChild = 2 * i + 1;
    const rightChild = 2 * i + 2;
    if (leftChild < length && arr[leftChild] > arr[tempLargestPosition]) {
        tempLargestPosition = leftChild
    }
    if (rightChild < length && arr[rightChild] > arr[tempLargestPosition]) {
        tempLargestPosition = rightChild
    }
    if (tempLargestPosition !== i) {
        const temp = arr[tempLargestPosition]
        arr[tempLargestPosition] = arr[i]
        arr[i] = temp
        maxheapfy(arr, length, tempLargestPosition)
    }
}


//o(n) 平均 最差 o(nlogn)
function buildArrToMaxHeap(arr) {
    const copyArr = Array.from(arr)
    const length = copyArr.length
    const startIndex = parseInt(length / 2 - 1) // 从一半开始向下 就能堆化
    for (let i = startIndex; i > -1; i--) {
        maxheapfy(copyArr, length, i)
    }

    return copyArr
}

function maxHeapInsertion(heap, target) {
    const copyArr = [...heap]
    copyArr.push(target)
    const _help = (heap, trackIndex) => {
        const parentIdx = parseInt((trackIndex - 1) / 2)
        if (heap[parentIdx] < heap[trackIndex]) {
            const temp = heap[parentIdx]
            heap[parentIdx] = heap[trackIndex]
            heap[trackIndex] = temp
            _help(heap, parentIdx)
        }
    }
    _help(copyArr, copyArr.length - 1)
    return copyArr
}

function extractMax(heap) {
    const copyHeap = [...heap]
    const max = copyHeap[0]
    const newHeap = [copyHeap[copyHeap.length - 1], ...copyHeap.slice(1, copyHeap.length - 1)]
    const _help = (heap, length, i) => {
        let tempIndex = i;
        const leftChild = 2 * i + 1;
        const rightChild = 2 * i + 2;
        if (leftChild < length && heap[leftChild] > heap[tempIndex]) {
            tempIndex = leftChild
        }
        if (rightChild < length && heap[rightChild] > heap[tempIndex]) {
            tempIndex = rightChild
        }
        if ((leftChild < length && rightChild < length) && (heap[leftChild] > heap[tempIndex] && heap[rightChild] > heap[tempIndex])) {
            tempIndex = heap[leftChild] > heap[rightChild] ? leftChild : rightChild;
        }
        if (tempIndex !== i) {
            const temp = heap[tempIndex]
            heap[tempIndex] = heap[i]
            heap[i] = temp
            _help(heap, length, tempIndex)
        }
    }
    _help(newHeap, newHeap.length, 0)
    return { max, newHeap }
}
const test = "35 33 42 10 14 19 27 44 26 31".split(" ").map((item) => parseInt(item))
const maxHeap = buildArrToMaxHeap(test)
// const maxHeapInsert = maxHeapInsertion(maxHeap, 24)

// const extractMaxHeap = extractMax(maxHeap)

console.log("done")

module.exports = {
    buildArrToMaxHeap, maxheapfy, maxHeapInsertion, extractMax
}
