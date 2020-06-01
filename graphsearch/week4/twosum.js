const fs = require("fs");
const R = require("ramda");
const dayjs = require("dayjs");
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
const source = "twoSum"
fs.readFile(`./graphsearch/week4/${source}.txt`, "utf-8", (err, data) => {
    const list = data
        .toString()
        .split("\n")
        .map(item => parseInt(item));
    console.log(dayjs().format("L LT"));

    const hashTable = createHashFromArray(list)
    console.log(dayjs().format("L LT"));

    const ret = countRange(hashTable, -10000, 10000)
    console.log(dayjs().format("L LT"));

    // var input = createHashFromArray([1, -1, 3, -3, 3]);
    // const test1 = countRange(input, -1, 1) //1
    // const test2 = countRange(input, -3, 3)//3

    // console.log(test1, test2)
});


function createHashFromArray(arr) {
    const hashMap = new Set()

    for (let item of arr) {
        if (!hashMap.has(item)) {
            hashMap.add(item)
        }
    }
    return hashMap
}

function twoSum(hash, target) {
    let ret = false
    for (let value of hash) {
        const y = target - value
        if (hash.has(y)) {
            ret = true
            break;
        }
    }
    return ret;
}

function countRange(hash, left, right) {
    const retHashMap = new Set()
    for (let i = left; i < right + 1; i++) {
        console.log(i)
        if (twoSum(hash, i)) {
            retHashMap.add(i)
        }
    }

    console.log(retHashMap.size)
    return retHashMap.size
}