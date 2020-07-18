/*
这个算法好难啊~~~ ref: https://www.geeksforgeeks.org/optimal-binary-search-tree-dp-24/

*/
function optimalBST(tree, p) {
    const n = tree.length
    const ret = Array.from({ length: n + 1 }, () => [])

    for (i = 0; i < n; i++) {
        ret[i][i] = tree[i]
    }

    for (let s = 2; s < n + 1; s++) {
        for (let i = 0; i <= n - s + 1; i++) {
            const j = i + s - 1;
            ret[i][j] = Number.MAX_SAFE_INTEGER
            for (let r = i; r <= j; r++) {
                const left = r > i ? ret[i][r - 1] : 0
                const right = r < j ? ret[r + 1][j] : 0
                const temp = left + right + sum(tree.slice(i, j + 1))
                if (ret[i][j] > temp) ret[i][j] = temp
            }

        }
    }

    return ret

}

function sum(arr) {
    return arr.reduce((pre, cur) => pre + cur, 0)

}

const test = [0.05, 0.4, 0.08, 0.04, 0.1, 0.1, 0.23]//2.18
const test2 = [.2, .05, .17, .1, .2, .03, .25] //2.23
optimalBST(test2)

