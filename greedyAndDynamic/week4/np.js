const fs = require("fs");
const R = require("ramda");
const dayjs = require("dayjs");

const fileName = "test";
fs.readFile(
    `./greedyAndDynamic/week4/${fileName}.txt`,
    "utf-8",
    (err, data) => {
        const list = data
            .toString()
            .split("\n")
            .map((item) =>
                item
                    .trim()
                    .split(/\s+/)
                    .map((ele) => parseInt(ele))
            );
        const [size, ...items] = list;
        // const ret = mwis(items, size)
        // console.log(knapSack(size[0], items))
        console.log(dayjs().format("YYYY-MM-DD HH:mm:ss:ms"));
        console.log(knapSack2(size[0], items));
        console.log(dayjs().format("YYYY-MM-DD HH:mm:ss:ms"));

    }
);

function knapSack(totalCap, items) {
    const itemLength = items.length;
    const ret = Array.from({ length: itemLength }, () => []);

    for (let i = 0; i < totalCap + 1; i++) {
        ret[0][i] = 0;
    }

    for (let i = 1; i < itemLength; i++) {
        const [value, weight] = items[i];
        for (let j = 0; j < totalCap + 1; j++) {
            const excludeRet = ret[i - 1][j];
            const includeRet =
                weight > j ? ret[i - 1][j] : ret[i - 1][j - weight] + value;
            ret[i][j] = Math.max(excludeRet, includeRet);
        }
    }
    console.log(ret[itemLength - 1][totalCap - 1]); //2493893
    return ret[itemLength - 1][totalCap - 1];
}

function knapSack2(totalCap, items) {
    if (totalCap === 0 || items.length === 0) {
        return 0;
    }

    const memo = Array.from({ length: items.length }, (v, i) => []);

    const end = items.length;

    const _help = (totalCap, n) => {
        if (n === 0 || totalCap === 0) {
            return 0;
        }
        if (memo[n][totalCap] !== undefined) {
            return memo[n][totalCap];
        }
        const [value, weight] = items[n];
        const minusOneRet = _help(totalCap, n - 1);
        if (weight > totalCap) {/*  */
            // weight larger than current cap take last one
            return minusOneRet;
        }

        const includeRet = value + _help(totalCap - weight, n - 1);
        const temp = Math.max(minusOneRet, includeRet);
        memo[n][totalCap] = temp;
        // console.log(temp, totalCap, n)
        return temp;
    };
    const ret = _help(totalCap - 1, end - 1);
    console.log("done")
    return ret;
}
