const fs = require("fs");
const R = require("ramda");
const dayjs = require("dayjs");

const fileName = "mwis";
fs.readFile(
    `./greedyAndDynamic/week3/${fileName}.txt`,
    "utf-8",
    (err, data) => {
        const list = data
            .toString()
            .split("\n")
            .map(item => parseInt(item));
        const [size, ...graph] = list
        const ret = mwis(graph, size + 1)
    }
);

function mwis(graph, size) {
    const memo = Array.from({ length: size }, () => 0)

    memo[0] = 0
    memo[1] = graph[0]
    for (let i = 2; i < memo.length; i++) {
        memo[i] = Math.max(memo[i - 1], memo[i - 2] + graph[i - 1])
    }

    const ret = []
    const filter = [1, 2, 3, 4, 17, 117, 517, 997]
    const answer = []
    let j = memo.length - 1
    while (j > 1) {
        if (memo[j] > memo[j - 2] + graph[j - 1]) {
            j--
        } else {
            if (filter.includes(j)) {
                answer.push(j)
                // console.log(j)
            }
            ret.push(graph[j - 1])
            j -= 2
        }
    }

    if (j === 1) {
        ret.push(graph[j - 1])
        answer.push(1)
    }

    let str = ""
    filter.forEach(item => {
        if (answer.includes(item)) {
            str += "1"
        } else {
            str += "0"
        }
    })
    return { ret, str }
}

//0 1 0 1 1  1   0    1
//1 2 3 4 17 117 517  997