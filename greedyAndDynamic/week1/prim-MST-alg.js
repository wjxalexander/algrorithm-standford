const fs = require("fs");
const R = require("ramda");
const dayjs = require("dayjs");
const minHeapMethods = require("../../graphsearch/week3/minHeap")

const fileName = "40mst"
fs.readFile(`./greedyAndDynamic/week1/${fileName}.txt`, "utf-8", (err, data) => {
    const adjListArray = data
        .toString()
        .split("\n")
        .slice(1)
        .map(item => {
            const splittedItem = item.trim().split(/\s/)
            return { vertex: splittedItem[0], target: splittedItem[1], cost:splittedItem[2] }
        });

    const graph = new Graph()
    adjListArray.forEach(({ vertex, target, cost }) => {
        graph.addEdge(parseInt(vertex), parseInt(target), parseInt(cost))
    })

    console.log(graph)
    // dijkStra_with_heap(graph, 0)
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
        if (!this.adjList.has(target)) {
            this.addVertex(target);
        }
        this.adjList.get(source).push({ target, score }); // un-direct graph
        this.adjList.get(target).push({source, score})
    };
}
