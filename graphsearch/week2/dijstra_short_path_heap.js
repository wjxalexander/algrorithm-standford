const fs = require("fs");
const R = require("ramda");
const dayjs = require("dayjs");
const minHeapMethods = require("../week3/minHeap")
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

fs.readFile("./graphsearch/week2/dijkstraData.txt", "utf-8", (err, data) => {
    const adjListArray = data
        .toString()
        .split("\n")
        .map(item => {
            const splittedItem = item.trim().split(/\s/)
            return { vertex: splittedItem[0], edges: splittedItem.slice(1) }
        });

    const graph = new Graph()
    adjListArray.forEach(({ vertex, edges }) => {
        edges.forEach(item => {
            const [node, score] = item.split(",")
            graph.addEdge(parseInt(vertex - 1), parseInt(node - 1), parseInt(score))
        })
    })
    // console.log(graph)
    dijkStra_with_heap(graph, 0)
    // excute(adjListArray);
});

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
        // if (!this.adjList.has(target)) {
        //     this.addVertex(target);
        // }
        this.adjList.get(source).push({ target, score }); // direct graph
    };
}

function dijkStra_with_heap(graph, source) {
    const graphMap = graph.adjList
    const X = new Set() // computed
    let Heap = []
    let distance = []
    for (let [key, value] of graphMap) {
        if (key === source) {
            distance[key] = 0
        } else {
            distance[key] = Number.MAX_SAFE_INTEGER
        }
    }

    Heap.push({ key: source, value: 0 })

    while (Heap.length > 0) {
        const [min, newHeap] = extractMin(Heap)
        Heap = newHeap
        const minWeight = distance[min.key]
        X.add(min.key)
        const adjList = graphMap.get(min.key)
        if (R.isNil(adjList) || R.all(({ target }) => X.has(target), adjList)) {
            continue
        }
        adjList.forEach(({ target, score }) => {
            const oldValue = distance[target]
            if (oldValue > minWeight + score) {
                Heap = R.reject(({ key }) => key === target, Heap)
                distance[target] = minWeight + score
                Heap = insert(Heap, { key: target, value: minWeight + score })

            }
        })

    }
    const toAnswer = [7, 37, 59, 82, 99, 115, 133, 165, 188, 197]
    const ret = []
    for (let item of toAnswer) {
        ret.push(distance[item - 1])
    }

    const sortRet = R.sort((a, b) => a.key - b.key, ret)
    //2599,2610,2947,2052,2367,2399,2029,2442,2505,3068

    console.log(sortRet)
}
function extractMin(heap) {
    if (heap.length === 0) {
        return null;
    }
    if (heap.length === 1) {
        return [heap[0], []]

    }
    const min = heap[0]
    const newHeap = [heap[heap.length - 1], ...heap.slice(1, heap.length - 1)] // tail to head 
    const length = newHeap.length
    const _help = (heap, i) => {
        let tempIdx = i
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        if (left < length && heap[left].value < heap[tempIdx].value) {
            tempIdx = left
        }
        if (right < length && heap[right].value < heap[tempIdx].value) {
            tempIdx = right
        }
        if ((left < length && right < length)
            && (heap[left].value < heap[tempIdx].value && heap[right].value < heap[tempIdx].value)) {
            tempIdx = heap[left].value < heap[right].value ? left : right; // smaller than both sides? swap with the small side
        }
        if (tempIdx !== i) {
            const temp = heap[tempIdx]
            heap[tempIdx] = heap[i]
            heap[i] = temp
            _help(heap, tempIdx)
        }
    }
    _help(newHeap, 0)
    return [min, newHeap]
}

function insert(heap, target) {
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