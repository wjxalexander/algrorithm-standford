const fs = require("fs");
const R = require("ramda");
const dayjs = require("dayjs");
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

let adjListArray = [];

// 这道题用递归容易爆栈 只能用迭代的方式来模拟递归

fs.readFile("./graphsearch/week1/scc.txt", "utf-8", (err, data) => {
  adjListArray = data
    .toString()
    .split("\n")
    .map(item => item.trim());

  excute(adjListArray);
});

class Graph {
  constructor(pros) {
    this.adjList = new Map();
    // this.maxVertex = 0
  }
  addVertex = v => {
    this.adjList.set(v, []);
  };
  addEdge = (source, target) => {
    if (!this.adjList.has(source)) {
      this.addVertex(source);
    }
    if (!this.adjList.has(target)) {
      this.addVertex(target);
    }
    this.adjList.get(source).push(target); // direct graph
  };
}

function excute(adjListArray) {
  // 创建图 反向图
  const originGraph = new Graph();
  const reverseGraph = new Graph();
  console.log(dayjs().format("L LT"));
  adjListArray.forEach(item => {
    const [source, target] = item.split(" ");
    const intSource = parseInt(source);
    const intTarget = parseInt(target);
    originGraph.addEdge(intSource, intTarget);
    reverseGraph.addEdge(intTarget, intSource);
  });
  console.log(dayjs().format("L LT"));
  const largestKey = reverseGraph.adjList.size;

  const magicExplored = new Set();
  const finishTime = new Map();
  let count = 1; //finishtime
  const keyStack = [];

  // topo sort in arbitary order
  for (let [key] of reverseGraph.adjList) {
    if (!magicExplored.has(key)) {
      dfs_magic_help(reverseGraph.adjList, key);
    }
  }
  function dfs_magic_help(graph, vertex) {
    magicExplored.add(vertex);
    const tempStack = [vertex];
    while (tempStack.length > 0) {
      const key = tempStack.pop();
      const verticesTodo = graph.get(key);
      // magicExplored.add(key)
      if (
        R.isEmpty(verticesTodo) ||
        R.all(item => magicExplored.has(item), verticesTodo)
      ) {
        finishTime.set(count, key);
        keyStack.push(key);
        count++;
        continue;
      }
      for (let i = 0; i < verticesTodo.length; i++) {
        const item = verticesTodo[i];
        if (!magicExplored.has(item)) {
          magicExplored.add(item);
          tempStack.push(item);
        }
      }
    }
  }
  // not work stack overflow
  async function dfs_magic_recursive_help(graph, vertex) {
    magicExplored.add(vertex);
    const verticesToDFS = graph.get(vertex);
    for (let i = 0; i < verticesToDFS.length; i++) {
      if (magicExplored.has(verticesToDFS[i])) {
        await dfs_magic_recursive_help(graph, verticesToDFS[i]);
      }
    }
    finishTime.set(count, vertex);
    count++;
  }
  console.log(dayjs().format("L LT"));

  // const maxFinishTimeKey = finishiTime.size
  const sccExplored = new Set();
  const ids = [];
  let sccOrder = 0;
  // const MagicOrder = R.sort((a,b)=>b-a,finishTime.keys())

  // decrease Order
  for (let i = keyStack.length - 1; i > -1; i--) {
    let tempVertex = keyStack[i];
    if (!sccExplored.has(tempVertex)) {
      dfs_scc_help(originGraph.adjList, tempVertex, sccOrder);
      sccOrder++;
    }
  }

  function dfs_scc_help(graph, vertex, order) {
    sccExplored.add(vertex);
    const tempStack = [vertex];
    if (!ids[order]) {
      ids[order] = 1;
    }
    while (tempStack.length > 0) {
      const key = tempStack.pop();
      const verticesTodo = graph.get(key);
      for (let i = 0; i < verticesTodo.length; i++) {
        const item = verticesTodo[i];
        if (!sccExplored.has(item)) {
          sccExplored.add(item);
          tempStack.push(item);
          ids[order]++;
        }
      }
    }
  }

  const ret = ids.sort((a, b) => b - a).slice(0, 10);

  console.log(ret);
  return ret;
}
