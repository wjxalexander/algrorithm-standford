const fs = require("fs")
const R = require("ramda")

fs.readFile("./graphsearch/week1/scc.txt",'utf-8',(error,data)=>{
    const adjList = data.toString().split("\n").map(item=>item && item.trim())
    excution(adjList)
})

// console.log(adjListArray)
class Graph{
    constructor(){
        this.adjectList = new Map()
    }
    addVerTex = (v)=>{
        this.adjectList.set(v, [])
    }
    addEdge = (source, target) =>{
        if(!this.adjectList.has(source)){
            this.addVerTex(source)
        }
        if(!this.adjectList.has(target)){
            this.addVerTex(target)
        }
        this.adjectList.get(source).push(target)
    }
}

function excution(list){
    const originGraph = new Graph()
    const reverseGraph = new Graph()
    // build graph
    list.forEach(item=>{
        const [source,target] = item.split(" ")
        originGraph.addEdge(source,target)
        reverseGraph.addEdge(target,source)
    })

    // topoSort Grev
    const explored = new Set()
    const finishTimeArray = []
    // const topoSortRet = []
    let globalTime = 0
    reverseGraph.adjectList.forEach((val,key,map)=>{
        if(!explored.has(key)){
            explored.add(key)
            const tempStack = [key]
            while(!R.isEmpty(tempStack)){
                const topEle = tempStack.pop()
                const values = reverseGraph.adjectList.get(topEle)
                values.forEach(item=>{
                    if(!explored.has(item)){
                        explored.add(item)
                        tempStack.push(item)
                    }
                })
                finishTimeArray.unshift(top)
                globalTime++
                // topoSortRet.push([top,globalTime])
            }
        }
    })
    //SCC-DFS LOOP begin with the sink group from toposort
    let numScc = 0;
    const sccCnt = []
    // const sccs =[]
    // const ret = []
    let explored_1 = new Set()
    finishTimeArray.forEach(item=>{
        if(!explored_1.has(item)){
            const tempStack = [item]
            explored_1.add(item)
            numScc++
            sccCnt[numScc] = 1
            // const tempRet = [item]
            while(!R.isEmpty(temStack)){
                const top = tempStack.pop()
                const values = originGraph.adjectList.get(top)
                values.forEach(key=>{
                    if(!explored_1.has(key)){
                        explored_1.add(key);
                        sccCnt[numScc]++;
                        tempStack.push(key)
                        // sccs[key] = numScc
                        // tempRet.push(key)
                    }
                })
            }
            // ret.push(tempRet)
        }
    })
    const sortedScc = R.sort(((a,b)=>b-a), sccCnt).slice(0,10);
    
    console.log(sortedScc)
    return sortedScc
}




