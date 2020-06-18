const fs = require("fs");
const R = require("ramda");
const dayjs = require("dayjs");
// const minHeapMethods = require("../../graphsearch/week3/minHeap")

const fileName = "40"
fs.readFile(`./${fileName}.txt`, "utf-8", (err, data) => {
    const adjListArray = data
        .toString()
        .split("\n")
        .slice(1)
        .map(item => {
            const splittedItem = item.trim().split(/\s/)
            return {
                vertex: splittedItem[0],
                target: splittedItem[1],
                cost: splittedItem[2]
            }
        });

    const graph = new Graph()
    adjListArray.forEach(({
        vertex,
        target,
        cost
    }) => {
        graph.addEdge(parseInt(vertex), parseInt(target), parseInt(cost))
    })
    const source = adjListArray[0].vertex

    console.log(graph)
    primMSTWithHeap(graph, parseInt(source))
    // dijkStra_with_heap(graph, 0)
    // excute(adjListArray);
});

function primMSTWithHeap(graph, source) {
    const adjList = graph.adjList
    let T = []
    const x = new Set()
    let heap = []
    x.add(source)
    for (const [key, value] of adjList) {

        if (key !== source) {
            const item = { key: key, value: Number.MAX_SAFE_INTEGER }
            const edgeSV = R.find(R.propEq("target",source), value)
            if(edgeSV){
                item.value = edgeSV.score
            }
            heap = heapInsert(heap, item)
        }
    }

    while (heap.length > 0) {
        const {min, newHeap} = extractMin(heap);
        heap = newHeap
        const {key, value} = min
        x.add(key)
        T.push(value)

        const tempRet = []
        for (let key of x) {
            const vertexAdjList = adjList.get(key).filter(item => !x.has(item.target))
            if (vertexAdjList.length > 0) {
                const min = vertexAdjList.reduce((pre, cur) => {
                    if (cur.score < pre.score) {
                        return cur
                    }
                    return pre
                })
                tempRet.push(min)
            }

        }
        if (tempRet.length > 0) {
            console.log(x.size)
            const min = tempRet.reduce((pre, cur) => {
                if (cur.score < pre.score) {
                    return cur
                }
                return pre
            })
            const {
                target,
                score
            } = min
            x.add(target)
            T.push(score)
        }
    }
    const ret = T.reduce((pre, cur) => pre + cur, 0)

    return ret
    //-3612829
}
class Graph {
    constructor(props) {
        this.adjList = new Map();
        // this.maxVertex = 0
    }
    addVertex = v => {
        this.adjList.set(v, []);
    };
    addEdge = (source, target, score) => {
        if (!this.adjList.has(source)) {
            this.addVertex(source);
        }
        if (!this.adjList.has(target)) {
            this.addVertex(target);
        }
        this.adjList.get(source).push({
            target,
            score
        }); // un-direct graph
        this.adjList.get(target).push({
            target: source,
            score
        })
    };
}

function minHeapfy(arr, length, i) {
    let tempLargestPosition = i
    const leftChild = 2 * i + 1;
    const rightChild = 2 * i + 2;
    if (leftChild < length && arr[leftChild].value < arr[tempLargestPosition].value) {
        tempLargestPosition = leftChild
    }
    if (rightChild < length && arr[rightChild].value < arr[tempLargestPosition].value) {
        tempLargestPosition = rightChild
    }
    if (tempLargestPosition !== i) {
        const temp = arr[tempLargestPosition]
        arr[tempLargestPosition] = arr[i]
        arr[i] = temp
        minHeapfy(arr, length, tempLargestPosition)
    }
}

function buildArrToMinHeap(arr) {
    const copyArr = Array.from(arr)
    const length = copyArr.length
    const startIndex = parseInt(length / 2 - 1)
    for (let i = startIndex; i > -1; i--) {
        minHeapfy(copyArr, length, i)
    }

    return copyArr
}
function heapInsert(heap, target) {
    const copyArr = [...heap]
    copyArr.push(target)
    const _help = (heap, trackIndex) => {
        const parentIdx = parseInt((trackIndex - 1) / 2)
        if (heap[parentIdx].value > heap[trackIndex].value) {
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
    if (heap.length <= 1) {
        return heap
    }
    const copyHeap = [...heap]
    const min = copyHeap[0]
    const newHeap = [copyHeap[copyHeap.length - 1], ...copyHeap.slice(1, copyHeap.length - 1)] // tail to head 
    const _help = (heap, length, i) => {
        let tempIndex = i;
        const leftChild = 2 * i + 1;
        const rightChild = 2 * i + 2;
        if (leftChild < length && heap[leftChild].value < heap[tempIndex].value) {
            tempIndex = leftChild
        }
        if (rightChild < length && heap[rightChild].value < heap[tempIndex].value) {
            tempIndex = rightChild
        }
        if ((leftChild < length && rightChild < length) && (heap[leftChild].value < heap[tempIndex].value && heap[rightChild].value < heap[tempIndex].value)) {
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

function deleteNode(heap, node) {
    if (!heap.find(({ key }) => node.key === key)) {
        return heap
    }
    const index = heap.findIndex(ele => ele.key === node.key)
    const swapEle = heap[heap.length - 1]
    heap[index] = swapEle
    heap.pop()
    return buildArrToMinHeap(heap)
}
