var fs = require("fs")
var array = [];
fs.readFile('divideAndConque/week3/arr.txt', function (err, data) {
    if (err) throw err;
    array = data.toString().split("\n").map(item => parseInt(item));
    const ret1 = quickSort1(array.slice(0), 0, array.length)
    const ret2 = quickSort2(array.slice(0), 0, array.length)
    const ret3 = quickSort3(array.slice(0), 0, array.length)

    // console.log(ret1, ret2, ret3)
    // console.log(ret3)
    //162085 164123 138382
});
// choose first
function quickSort1(array, left, right) {
    if (right - left < 2) {
        return [0, array];
    }
    let ret = right - left - 1;
    var pivot = array[left];
    let indicator = left + 1


    for (var i = left + 1; i < right; i++) {
        if (array[i] < pivot) {
            const temp = array[indicator]
            array[indicator] = array[i]
            array[i] = temp;
            indicator++
        }
    }
    array[left] = array[indicator - 1]
    array[indicator - 1] = pivot;
    ret += quickSort1(array, left, indicator - 1)[0];
    ret += quickSort1(array, indicator, right)[0]
    return [ret, array];
}
// choose last
function quickSort2(arr, left, right) {
    if (right - left < 2) {
        return [0, array];
    }
    let ret = right - left - 1;
    let indicator = left + 1
    var pivot = array[right - 1];
    array[right - 1] = array[left]
    array[left] = pivot
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
    ret += quickSort2(array, left, indicator - 1)[0];
    ret += quickSort2(array, indicator, right)[0]
    return [ret, array];
}
// choose median
function quickSort3(array, left, right) {
    if (right - left < 2) {
        return [0, array];
    }
    let ret = right - left - 1; // 每次都要比较这么多长度减1
    let pivot = array[left]
    let indicator = left + 1
    const mid = (right - left) % 2 === 0 ?left + (right - left) / 2 - 1 : left + (right - left - 1) / 2 ;
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
    return [ret, array];
}
// const test = [2, 10, 4, 1, 0, 9, 5 ,8]
// const ret3 = quickSort3(test,0 ,test.length)
// const ret2= quickSort2(test,0 ,test.length)
// const ret1 = quickSort1(test,0 ,test.length)

// console.log(ret1,ret2,ret3)