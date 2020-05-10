const fs = require("fs");
const R = require("ramda");
const dayjs = require("dayjs");
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
            graph.addEdge(parseInt(vertex), parseInt(node), parseInt(score))
        })
    })
    // console.log(graph)
    dijkStraAlgorithm(graph, 1)
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

function dijkStraAlgorithm(graph, source) {
    const graphMap = graph.adjList
    const size = graph.adjList.size
    const X = new Set()
    const shortPath = new Map()
    X.add(source)
    shortPath.set(source, 0)

    while (X.size < size) {
        const localMap = new Map()
        // (v=>w) v belongs to X and w not belongs
        for (let key of X) {
            const adjList = graphMap.get(key)
            if (R.isNil(adjList) || R.all(({ target }) => X.has(target), adjList)) {
                continue
            }
            adjList.forEach(({ target, score }) => {
                if (!X.has(target)) {
                    const greedyScore = !R.isNil(shortPath.get(key)) ? shortPath.get(key) + score : Number.MAX_SAFE_INTEGER
                    if (!localMap.has(target)) {
                        localMap.set(target, greedyScore)
                    } else {
                        const minVal = R.min(localMap.get(target), greedyScore)
                        localMap.set(target, minVal)
                    }
                }
            });
        }
        // find the miminum greedy score
        if (localMap.size > 0) {
            const { greedyKey, minVal } = getMinValue(localMap)
            X.add(greedyKey)
            shortPath.set(greedyKey, minVal)
        }
    }
    const toAnswer = [7, 37, 59, 82, 99, 115, 133, 165, 188, 197]
    const ret = []
    for (let [key, value] of shortPath) {
        if (toAnswer.includes(key)) {
            ret.push({ key, value })
        }
    }
    const sortRet = R.sort((a, b) => a.key - b.key, ret).map(item => item.value)
    console.log(sortRet)

    return sortRet.values()
}
function getMinValue(map) {
    let greedyKey = undefined
    let minVal = Number.MAX_SAFE_INTEGER
    for (let [key, value] of map) {
        if (value < minVal) {
            minVal = value
            greedyKey = key
        }
    }
    return { greedyKey, minVal }
}
