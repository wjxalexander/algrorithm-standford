const fs = require("fs");
const R = require("ramda");
const dayjs = require("dayjs");
// const minHeapMethods = require("../../graphsearch/week3/minHeap")

const fileName = "clustering1";
fs.readFile(
    `./greedyAndDynamic/week2/${fileName}.txt`,
    "utf-8",
    (err, data) => {

        const parseData = data
            .toString()
            .split("\n")
        const total = parseInt(parseData[0])

        const adjListArray = parseData.slice(1)
            .map((item) => {
                const [vertex, target, cost] = item.trim().split(/\s+/).map(item => parseInt(item));
                return { vertex, target, cost, };
            });
        const graph = new Graph();
        adjListArray.forEach(({ vertex, target, cost }) => {
            graph.addEdge(vertex, target, cost);
        });

        console.log(dayjs().format("YYYY-MM-DD HH:mm:ss:ms"));

        graph.sortedList();
        console.log(dayjs().format("YYYY-MM-DD HH:mm:ss:ms"));
        const ret = maxSpaceKClustering(graph, 4, total)
        console.log(ret)

    }
);

function maxSpaceKClustering(graph, k, total) {
    const list = graph.adjList
    const clusters = new Map()
    const fatherPoints = Array.from({ length: total })
    let max = 0
    list.forEach(({ source, target }) => {
        if (!clusters.has(source)) {
            clusters.set(source, [source])
        }
        if (!clusters.has(target)) {
            clusters.set(target, [target])
        }
        fatherPoints[source] = source
        fatherPoints[target] = target
    })




    const _help = () => {
        const { source, target, cost } = list.pop();

        const oldFatherSource = fatherPoints[source]
        let newHeader = oldFatherSource

        const oldFatherTarget = fatherPoints[target]
        if (oldFatherSource === oldFatherTarget) {
            return
        }
        max = cost
        const cluster1 = clusters.get(oldFatherSource)
        const cluster2 = clusters.get(oldFatherTarget)
        if (cluster1.length > cluster2.length) {
            cluster2.forEach(item => fatherPoints[item] = newHeader)
        } else {
            newHeader = oldFatherTarget
            cluster1.forEach(item => fatherPoints[item] = newHeader)

        }
        const newList = cluster1.concat(cluster2)
        clusters.delete(oldFatherSource)
        clusters.delete(oldFatherTarget)
        clusters.set(newHeader, newList)
    }

    while (clusters.size >= k) {
        _help()
    }

    // console.log(clusters, list)
    return max
}

class Graph {
    constructor(props) {
        this.adjList = [];
        // this.maxVertex = 0
    }

    addEdge = (source, target, cost) => {
        this.adjList.push({ source, target, cost });
    };

    sortedList() {
        this.adjList.sort((a, b) => b.cost - a.cost);
    }
}
