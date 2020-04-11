// merge sort
let count = 0
function mergSort(arr) {
    const length = arr.length;
    if (length === 1) {
        return arr;
    }
    const left = arr.slice(0, length / 2);
    const right = arr.slice(length / 2);
    return mergeAndCountInversion(mergSort(left), mergSort(right));
}

function mergeAndCountInversion(arr1, arr2) {
    let ret = []
    const length1 = arr1.length;
    const length2 = arr2.length
    let i = 0;
    let j = 0;
    while (i < length1 && j < length2) {
        if (arr1[i] < arr2[j]) {
            ret.push(arr1[i])
            i++
        } else {
            ret.push(arr2[j])
            j++
            count += length1 - i;
        }
    }
    if (i < length1) {
        ret = ret.concat(arr1.slice(i));
    }
    if (j < length2) {
        ret = ret.concat(arr2.slice(j));
    }
    return ret
}
const test = [6,5,4,3,2,1]

// mergSort(testcase)
// console.log(count)
// console.log(Array.isArray(testcase))

