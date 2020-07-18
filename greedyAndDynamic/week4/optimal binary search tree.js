function optimalBST(tree, p) {
    const n = tree.length

    const ret = Array.from({ length: n }, () => [])

    const getMin = (i, s, A) => {
        const temp = []
        for (let r = i; r < i + s; r++) {
            const temp1 = A[i][r - 1] ? A[i][r - 1] : 0
            const temp2 = A[r + 1][i + s] ? A[r + 1][i + s] : 0

            temp.push(temp1 + temp2)
        }
        return temp.length > 0 ? Math.min(...temp) : 0
    }
    for (i = 0; i < n; i++) {
        ret[i][i - 1] = 0
    }

    for (let s = 0; s < n; s++) {
        for (let i = 0; i < n - s; i++) {
            const sumP = sum(tree.slice(i, i + s + 1))
            ret[i][i + s] = sumP + getMin(i, s, ret)
        }
    }

    return ret

}

function sum(arr) {
    return arr.reduce((pre, cur) => pre + cur, 0)

}
const p = {
    1: 0.05, 2: 0.4, 3: 0.08, 4: 0.04, 5: 0.1, 6: 0.1, 7: 0.23
}
const test = [.05, .4, .08, .04, .1, .1, .23]
optimalBST(test, p)

