// n:length i position 
// maxheapfy
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

function minheapfy(arr, length, i) {
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
        minheapfy(arr, length, tempLargestPosition)
    }
}

function buildArrToMaxHeap(arr) {
    const copyArr = Array.from(arr)
    const length = copyArr.length
    const startIndex = parseInt(length / 2 - 1)
    for (let i = startIndex; i > -1; i--) {
        maxheapfy(copyArr, length, i)
    }

    return copyArr
}

function buildArrToMineap(arr) {
    const copyArr = Array.from(arr)
    const length = copyArr.length
    const startIndex = parseInt(length / 2 - 1)
    for (let i = startIndex; i > -1; i--) {
        minheapfy(copyArr, length, i)
    }

    return copyArr
}

function minHeapInsertion(heap, target) {
    const copyArr = [...heap]
    copyArr.push(target)
    const _help = (heap, trackIndex) => {
        const parentIdx =parseInt((trackIndex - 1) / 2)
        if(heap[parentIdx] > heap[trackIndex] ){
            const temp = heap[parentIdx]
            heap[parentIdx] = heap[trackIndex]
            heap[trackIndex] = temp
            _help(heap, parentIdx)
        }
    }
    _help(copyArr,copyArr.length-1)
    return copyArr
}
const test = [1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17]
const Heap = buildArrToMineap(test)
const insert = minHeapInsertion(Heap,11)
