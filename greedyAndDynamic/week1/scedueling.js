const fs = require("fs");
const R = require("ramda");

const fileName = "40test"
fs.readFile(`./greedyAndDynamic/week1/${fileName}.txt`, "utf-8", (err, data) => {
    const adjListArray = data
        .toString()
        .split("\n")
        .slice(1)
        .map(item => {
            const splittedItem = item.trim().split(/\s/)
            return { weight: splittedItem[0], length: splittedItem[1] }
        });
    ratioSchedule(adjListArray)
});


const ratioSchedule = (arr) => {
    const newArr = R.map((item => ({ ...item, ratio: item.weight - item.length })), arr)
    newArr.sort((a, b) => {
        if (a.ratio !== b.ratio) {
            return a.ratio < b.ratio
        } else {
            return a.weight < b.weight
        }
    })

    return newArr

}
function quickSort3(array, left, right) {
    if (right - left < 2) {
        return [0, array];
    }
    let ret = right - left - 1; // 每次都要比较这么多长度减1
    let pivot = array[left]
    let indicator = left + 1
    const mid = (right - left) % 2 === 0 ? left + (right - left) / 2 - 1 : left + (right - left - 1) / 2;
    // const mid = left + (right - left - 1) / 2;
    if ((array[mid] > array[left] && array[mid] < array[right - 1]) || (array[mid] < array[left] && array[mid] > array[right - 1])) {
        pivot = array[mid]
        array[mid] = array[left]
        array[left] = pivot
    } else if ((array[right - 1] > array[mid] && array[right - 1] < array[left]) || (array[right - 1] < array[mid] && array[right - 1] > array[left])) {
        pivot = array[right - 1];
        array[right - 1] = array[left]
        array[left] = pivot
    }
    for (var i = left + 1; i < right; i++) {
        if (array[i] < pivot) {
            const temp = array[indicator]
            array[indicator] = array[i]
            array[i] = temp;
            indicator++
        }
    }
    // const temp2 = array[left]
    array[left] = array[indicator - 1]
    array[indicator - 1] = pivot;
    ret += quickSort3(array, left, indicator - 1)[0];
    ret += quickSort3(array, indicator, right)[0]
    return array;
}