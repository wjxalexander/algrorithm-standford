const fs = require("fs");
const R = require("ramda");
const dayjs = require("dayjs");
const minHeapMethods = require("../../graphsearch/week3/minHeap")

const fileName = "edges"
fs.readFile(`./greedyAndDynamic/week1/${fileName}.txt`, "utf-8", (err, data) => {
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
    primMST(graph, source)
    // dijkStra_with_heap(graph, 0)
    // excute(adjListArray);
});

function primMST(graph, source) {

    const adjList = graph.adjList
    let T = []
    const x = new Set()
    x.add(parseInt(source))
    while (x.size < adjList.size) {
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