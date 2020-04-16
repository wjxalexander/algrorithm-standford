const fs = require("fs")
const R = require("ramda")
const adjListArray = fs.readFileSync("divideAndConque/week4/mincut.txt").toString().split("\n");

const convertToObj = ([vertex,...edges])=>({vertex, edges}) // 找到顶点边界
const splitToNumberArr = (item)=> R.compose(
    convertToObj,
    R.map(parseInt),
    R.split(/\s/),
    R.trim,
)(item)

const numerArray = R.map(splitToNumberArr,adjListArray)// 转为顶点+边界的大数组

function getRandomArbitrary(arr, n) {
    if(R.isEmpty(arr) || arr.length <= n){
        return arr
    }
    const copyArr = R.clone(arr)
    for(let i = 0; i<copyArr.length; i++){
        //min + Math.floor(Math.random() * (max - min + 1));
        const randomPosition = Math.floor(Math.random() * (i + 1));
        const temp = copyArr[randomPosition]
        copyArr[randomPosition] = copyArr[i]
        copyArr[i] = temp
    }
    return copyArr.slice(0,n) //注意是
}

// for(let i = 0;i<100;i++){
//     getRandomArbitrary(numerArray,2)
// }

function kargerMinCut(arr){
    const test1 = arr[0]
    const test2 = arr[3]
     const testRet = merge(test1, test2)
    console.log(test1,test2,testRet)
}
kargerMinCut(numerArray)
function merge(vertex1,vertex2){
    let largeVertex;
    let removeVertex;
    if(vertex1.edges.length > vertex2.edges.length ){
        largeVertex=vertex1;
        removeVertex = vertex2
    }else{
        largeVertex=vertex2;
        removeVertex = vertex1
    }
     largeVertex = vertex1.edges.length > vertex2.edges.length ? vertex1 : vertex2

    const newVertex = largeVertex.vertex;
    const newEdges = [...vertex1.edges,...vertex2.edges].filter(item=>![vertex1.vertex, vertex2.vertex].includes(item))
    return [{vertex:newVertex, edges:newEdges},removeVertex.vertex]
}