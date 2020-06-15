const fs = require("fs");
const R = require("ramda");

const fileName = "job"
fs.readFile(`./greedyAndDynamic/week1/${fileName}.txt`, "utf-8", (err, data) => {
    const adjListArray = data
        .toString()
        .split("\n")
        .slice(1)
        .map(item => {
            const splittedItem = item.trim().split(/\s/)
            return {
                weight: parseInt(splittedItem[0]),
                length: parseInt(splittedItem[1])
            }
        });
    const diffret = minusSchedule(R.clone(adjListArray))
    const ratioret =ratioSchedule(R.clone(adjListArray))
    console.log(diffret,ratioret)
    //69119377652 67311454237
});


const minusSchedule = (arr) => {
    const newArr = R.map((item => ({
        ...item,
        ratio: item.weight - item.length
    })), arr)
    const retArr = newArr.sort((a, b) => {
        if (a.ratio !== b.ratio) {
            return b.ratio - a.ratio
        } else {
            return b.weight - a.weight
        }
    }).reduce((pre, item) => {
        const last = pre[pre.length - 1] || {}
        return [...pre, {
            ...item,
            accLength: item.length + (last.accLength || 0)
        }]
    }, [])
    return retArr.reduce((pre, cur) => pre + (cur.weight * cur.accLength), 0)
}

const ratioSchedule = (arr) => {
    const newArr = R.map((item => ({
        ...item,
        ratio: item.weight / item.length
    })), arr)
    const retArr = newArr.sort((a, b) => {
        if (a.ratio !== b.ratio) {
            return b.ratio - a.ratio
        } else {
            return b.weight - a.weight
        }
    }).reduce((pre, item) => {
        const last = pre[pre.length - 1] || {}
        return [...pre, {
            ...item,
            accLength: item.length + (last.accLength || 0)
        }]
    }, [])
    return retArr.reduce((pre, cur) => pre + (cur.weight * cur.accLength), 0)
}
