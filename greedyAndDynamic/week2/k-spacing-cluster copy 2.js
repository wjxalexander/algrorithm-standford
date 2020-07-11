/**
 * Since number of points is quite big, we cannot write out the graph with all the distances between all the points explicitly.
 *  It will be 200000∗199999/2=19999900000 edges, which is too much. We will use another approach instead.
 * What we need to do in this task is put two points in one cluster iff the distance between them is 1 or 2. Let’s call such points neighbors. 
 * 找到所有距离为<3 的俩个点
 * How can we find all of the neighbors for a given point u? Let’s think of every point as 24-bit representation of some integer number. 
 * Then neighbors of u are such points that differ from u in no more than 2 bytes. 
 * It means that x is a neighbor of u iff xXORu is a number that has only 1 or 2 ones in the binary representation. 
 * We will call such numbers simple. Total number of simple numbers is (242)+(241)=300.
 * We will use the following property of XOR: if a XOR b=c than a XOR c=b. 
 * It means that if we XOR u by all possible simple numbers we will get all theoretically possible neighbors of u. 
 * If we leave only those numbers that lie in S we will have the neighbors of u in S.
 * To store the data we will use array points of 224 integers. Initially we fill it with zeroes.
 * While reading next line from the file we will compute corresponding integer curindex,
 *  and write into points[curindex] next integer to denote initial division into clusters where each point is its own cluster.
 *  We will also save numbers corresponding to every point in S indo array index for future purposes.
 * How do we compute the whole cluster for u? We compute neighbors, assign them to the u-th cluster, 
 * then compute neighbors for every neighbor of u, leave only points that are not yet assigned to u-th cluster,
 *  assign them to the u-th cluster, then compute neighbors for every neighbor of neighbor of u, leave only new points,
 *  assign them to u-th cluster and so on, until on some step we won’t get any new points for u-th cluster.
 * To perform complete clustering we will go through all of our points and if the next point does not yet belong to some previous 
 * full cluster we will find full cluster for that point. We will save leaders of the clusters into name array and in the end the 
 * length of this array (minus 1 for the initial zero) will give us the answer.
 
https://rstudio-pubs-static.s3.amazonaws.com/72033_dcd43db591574873aac22be4cde29af6.html
*/
const fs = require("fs");
const R = require("ramda");
const dayjs = require("dayjs");


const fileName = "clustering_big"
// "clustering_big";
fs.readFile(
    `./greedyAndDynamic/week2/${fileName}.txt`,
    "utf-8",
    (err, data) => {

        const parseData = data
            .toString()
            .split("\n");
        const [vertices, hammingLength] = parseData[0].split(/\s+/).map(item => parseInt(item, 10))

        const adjListArray = parseData.slice(1).map(item => item.replace(/\s+/g, ""))

        const hamm = Array.from({ length: 300 }, () => 0);
        let k = 0;
        for (let i = 0; i < 24; i++) {
            for (let j = i; j < 24; j++) {
                const mask1 = 1 << i;
                const mask2 = 1 << j;
                hamm[k] = mask1 | mask2
                k++
            }

        }

        function getNeighbor(ele) {
            const ret = []
            for (const i of hamm) {
                if (points[ele ^ i] !== 0) {
                    ret.push(ele ^ i)
                }
            }
            return ret
        }

        let cluster = 1
        const points = Array.from({ length: Math.pow(2, 24) }, () => 0);
        const index = []
        for (const item of adjListArray) {
            const currentIdx = parseInt(item, 2);
            index.push(currentIdx)
            points[currentIdx] = cluster
            cluster++
        }

        names = [0]
        for (const item of index) {
            if (names.includes(points[item])) {
                continue
            }
            let newCluster = [item]
            while (newCluster.length > 0) {
                const newNewCluster = []
                for (const ele of newCluster) {
                    const neighbors = getNeighbor(ele)
                    for (const neighbor of neighbors) {
                        if (points[neighbor] !== points[item]) {
                            newNewCluster.push(neighbor)
                            points[neighbor] = points[item]
                        }
                    }
                }
                newCluster = newNewCluster
            }
            names.push(points[item])
        }

        console.log(names.length - 1)
        return names.length - 1
    }
);
