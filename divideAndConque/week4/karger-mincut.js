const fs = require("fs")
const R = require("ramda")
const adjListArray = fs.readFileSync("./divideAndConque/week4/cut2.txt",'utf-8').toString().split("\n");

const convertToObj = ([vertex, ...edges]) => ({
    vertex,
    edges
}) // 找到顶点边界 =>[{vertex:number,edges:[]}]
const splitToNumberArr = (item) => R.compose(
    convertToObj,
    R.map(parseInt),
    R.split(/\s/),
    R.trim,
)(item)

const numerArray = R.map(splitToNumberArr, adjListArray) // 转为顶点+边界的大数组
// shuffle 算法
// function getRandomArbitrary(arr, n) {
//     if (R.isEmpty(arr) || arr.length <= n) {
//         return arr
//     }
//     const copyArr = R.clone(arr)
//     const length = copyArr.length
//     for (let i = length - 1; i >= 0; i--) {
//         //随机选择一个剩余的元素(从数组的前面)，然后放在新的位置(数组的后面)，还未被打乱的元素交换到数组前面，
//         //min + Math.floor(Math.random() * (max - min + 1));
//         const randomPosition = Math.floor(Math.random() * (i + 1));
//         const temp = copyArr[randomPosition]
//         copyArr[randomPosition] = copyArr[i]
//         copyArr[i] = temp
//     }
//     return copyArr.slice(0, n) //注意是
// }
function getRandomArbitrary(arr) {
    if (R.isEmpty(arr) || arr.length === 1) {
        return arr
    }
    const copyArr = R.clone(arr)
    const length = copyArr.length
    const randomArr = arr[Math.floor(Math.random() * length)]
    const node1_vertex = randomArr.vertex
    const edges = randomArr.edges
    const node2_vertex = edges[Math.floor(Math.random() * edges.length)] //node2 conntect with node1
    return [node1_vertex, node2_vertex]
}



function merge(vertex1, vertex2) {
    let largeVertex;
    let removeVertex;
    if (vertex1.edges.length > vertex2.edges.length) {
        largeVertex = vertex1;
        removeVertex = vertex2
    } else {
        largeVertex = vertex2;
        removeVertex = vertex1
    }
    const newVertex = largeVertex.vertex;
    const toRemove = removeVertex.vertex
    const removeDupli = n => n === vertex1.vertex || n === vertex2.vertex
    const newEdges = R.reject(removeDupli, [...vertex1.edges, ...vertex2.edges]);
    return [newEdges, toRemove, newVertex]
}

// 随意悬着两个相连接的的vertex(不连接的不能选择)
// 合并连各个顶点， 允许平行edge 不允许自循环
function kargerMinCut(arr) {
    if (arr.length < 3) {
        return arr[0].edges.length
    }

    const [node1_vertex, node2_vertex] = getRandomArbitrary(arr)
    const select1 =R.find(R.propEq('vertex', node1_vertex))(arr); 
    const select2 =R.find(R.propEq('vertex', node2_vertex))(arr); 
    const [newEdges, removeVertex, newVertex] = merge(select1, select2) // merge two vertex
    const removeDupli = (item) => item.vertex === removeVertex || item.vertex===newVertex;
    const updatedArr = R.compose(
        R.map((item)=>({...item,edges: item.edges.map(el=>el===removeVertex?newVertex:el)})), // replace removed edge to new vertex
        R.append({vertex:newVertex, edges:newEdges }), // append merged vertex
        R.reject(removeDupli), //delete two previous nodes
    )(arr)

    return kargerMinCut(updatedArr)
}

let min_cuts = Infinity

for (let i = 0; i < 200; i++) {
    let min_cuts_this_round = kargerMinCut(R.clone(numerArray))
    // min_cuts_this_round < 50 && 
    console.log(`min_cuts_this_round${i}: `, min_cuts_this_round)
    min_cuts = Math.min(min_cuts, min_cuts_this_round)
}

console.log(min_cuts)