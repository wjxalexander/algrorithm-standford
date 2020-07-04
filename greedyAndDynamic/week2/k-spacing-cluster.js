/**
Solution Notes:
For each vertex, generate and store all Hamming distances that are 0, 1 and 2 units apart. There
is only 1 code point that is 0 units apart (which is the same code as the vertex), 24C1 = 24
possible code points that are 1 unit apart and there are 24C2 = 276 possible code points that are
2 units apart for each vertex.
list all hamming distance === 1 || 2 from current vertex all possibilities! t
Now, put all vertexes along with their assigned code into a hash table. Use the code as the hash
table key, with the vertex number as the value - note that some codes are not unique (i.e. more
than one vertex can be associated with the same code), so each key in the hash table will have to
potentially hold more than one vertex - we will use this hash table later to look up the vertex
number(s) given the corresponding Hamming code in O(1) time.
Execute the following:
For each vertex (200K iterations):
  For each code that is 0 units apart from
  this vertex: (1 iteration - there is only one such code
  which is the same code as that of the vertex itself)
    - Use the code to index into the hash table and
      get the corresponding vertexes if they exist.
    - Add these 2 vertexes to a cluster.
For each vertex (200K iterations):
  For each code that is 1 unit apart from
  this vertex: (24 iterations)
    - Use the code to index into the hash table and
      get the corresponding vertexes if they exist.
    - Add these 2 vertexes to a cluster.
For each vertex (200K iterations):
  For each code that is 2 units apart from
  this vertex: (276 iterations)
    - Use the code to index into the hash table and
      get the corresponding vertexes if they exist.
    - Add these 2 vertexes to a cluster.
We are now left with clusters that are at least 3 units apart.
*/


const fs = require("fs");
const R = require("ramda");
const dayjs = require("dayjs");
// const minHeapMethods = require("../../graphsearch/week3/minHeap")

const fileName = "clustering_big";
fs.readFile(
    `./greedyAndDynamic/week2/${fileName}.txt`,
    "utf-8",
    (err, data) => {

        const parseData = data
            .toString()
            .split("\n");
        const [vertices, hammingLength] = parseData[0].split(/\s+/).map(item => parseInt(item, 10))

        const adjListArray = parseData.slice(1).map(item => item.replace(/\s+/g, ""))

        console.log(dayjs().format("YYYY-MM-DD HH:mm:ss:ms"));

        const ret = max_k_clusters_for_three_spacing(adjListArray, vertices, hammingLength)


        console.log(dayjs().format("YYYY-MM-DD HH:mm:ss:ms"));

        console.log(ret)
        // 33769
    }
);
function max_k_clusters_for_three_spacing(arr, vertices, length) {
    const hammingVertexHash = hammingDistanceHash(arr)
    const union = Array.from({ length: vertices })
    arr.forEach((item, index) => {
        if (union[index] === undefined) {
            union[index] = index;
        }
        const allHammingDistanceWithOne = getAllHammingDistanceWithOne(item)
        const allHammingDistanceWithTwo = getAllHammingDistanceWithTwo(item)
        const allHamming = [item, ...allHammingDistanceWithOne, ...allHammingDistanceWithTwo]

        // 只需要union 小于三的部分 only need union distance small than 3
        for (const item of allHamming) {
            if (hammingVertexHash.has(item)) {
                const verts = hammingVertexHash.get(item)
                verts.forEach(item => {
                    if (item !== index) {
                        union[item] = union[index] // union it
                    }
                })
            }
        }
    })

    return new Set(union).size // get union with different 
}

function hammingDistanceHash(arr) {
    const hammingHash = new Map()
    arr.forEach((item, index) => {
        hammingHash.has(item) ? hammingHash.get(item).push(index) : hammingHash.set(item, [index])
    })
    return hammingHash
}

function getAllHammingDistanceWithOne(item) {
    const ret = new Set()
    for (let i = 0; i < item.length; i++) {
        const toModified = item.split("");
        item[i] === "1" ? toModified[i] = "0" : toModified[i] = "1"
        ret.add(toModified.join(""))
    }
    return ret;
}

function getAllHammingDistanceWithTwo(item) {
    const ret = new Set()
    for (let i = 0; i < item.length; i++) {
        const toModified = item.split("");
        item[i] === "1" ? toModified[i] = "0" : toModified[i] = "1"
        for (let j = 0; j < toModified.length; j++) {
            if (j !== i) {
                const toModified_2 = [...toModified];
                toModified[j] === "1" ? toModified_2[j] = "0" : toModified_2[j] = "1"
                ret.add(toModified_2.join(""))
            }
        }
    }
    return ret;
}