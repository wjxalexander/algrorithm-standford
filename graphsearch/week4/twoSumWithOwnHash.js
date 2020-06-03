const fs = require("fs");
const R = require("ramda");
const dayjs = require("dayjs");
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
const source = "twoSum"
fs.readFile(`./${source}.txt`, "utf-8", (err, data) => {
    const list = data
        .toString()
        .trim()
        .split("\n")
        .map(item => parseInt(item));
    console.log(dayjs().format("L LT"));

    // const hashTable = new Hash(list,1000003)
    const hashTable = new Hash(10000003) // prime number Length

    for (let item of list) {
        hashTable.insert(item)
    }

    console.log(dayjs().format("L LT"));

    const ret = countRange(hashTable, list, -10000, 10000)

    console.log(ret)
    console.log(dayjs().format("L LT"));
});
class Hash {
    constructor(size) {
        this.hashTable = []
        this.size = size
    }
    hashFunction(key) {
        let hash = 0;
        const toStringKey = key.toString()
        if (toStringKey.length === 0) {
            return hash
        }
        for (let i = 0; i < toStringKey.length; i++) {
            hash = (hash << 5) - hash
            hash += hash + toStringKey.charCodeAt(i)
            hash &= hash //convert 32bit int
        }
        return Math.abs(hash)
    }
    compression(key) {
        return this.hashFunction(key) % this.size
    }
    getBucketPosition(key) {
        return this.compression(key)
    }
    insert(value) {
        const position = this.getBucketPosition(value)
        if (!this.hashTable[position]) {
            this.hashTable[position] = [value]
        } else {
            this.hashTable[position].push(value)
        }
    }
    lookUp(value) {
        const position = this.getBucketPosition(value)
        if (!this.hashTable[position]) {
            return undefined
        } else {
            return R.find(R.equals(value), this.hashTable[position])
        }
    }
}
function twoSum(hash, list, target) {
    let ret = false
    for (let value of list) {
        const y = target - value
        if (hash.lookUp(y)) {
            ret = true
            break;
        }
    }
    return ret;
}

function countRange(hash, list, left, right) {
    const retHashMap = new Set()
    for (let i = left; i < right + 1; i++) {
        // console.log(i)
        if (twoSum(hash, list, i)) {
            retHashMap.add(i)
        }
    }
    console.log(retHashMap.size)
    return retHashMap.size
}
