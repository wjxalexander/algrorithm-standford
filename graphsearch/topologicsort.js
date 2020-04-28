class Graph{
    constructor(vertices){
        this.vertices = vertices // 顶点数
        this.adjectList = new Map()
        for(let i = 0; i<vertices;i++){
            this.addVerTex(i)
        }
    }
    addVerTex = (v)=>{
        this.adjectList.set(v, [])
    }
    addEdge = (vetx1, vetx2) =>{
        if(!this.adjectList.get(vetx1)){
            this.addVerTex(vetx1)
        }
        if(!this.adjectList.get(vetx2)){
            this.addVerTex(vetx2)
        }
        this.adjectList.get(vetx1).push(vetx2)
        // this.adjectList.get(vetx2).push(vetx1)
    }
}
const size = 6
const g = new Graph(size)
g.addEdge(5, 2);  
g.addEdge(5, 0);  
g.addEdge(4, 0);  
g.addEdge(4, 1);  
g.addEdge(2, 3);  
g.addEdge(3, 1); 

console.log(g)
/*
T = []
visited = []

topological_sort( cur_vert, N, adj[][] ){
    visited[cur_vert] = true
    for i = 0 to N
        if adj[cur_vert][i] is true and visited[i] is false
        topological_sort(i)
    T.insert_in_beginning(cur_vert)
    o(m+n)
}
*/
function topologicalSort(graph,size){
    const reviewed = Array.from({length:size},(v,i)=>false)
    const stack = []
    const _help = (node,reviewed,stack)=>{
       if(!reviewed[node]){
           reviewed[node] = true
           const tempList = graph.adjectList.get(node)
           tempList.forEach(item=>!reviewed[item]&&_help(item,reviewed,stack))//o(m)
           stack.unshift(node)
       }
    }
    for(let i = 0;i<size;i++){ // nodes numbero o(n)
        _help(i, reviewed,stack)
    }
    return stack
}
console.log(topologicalSort(g,size))
