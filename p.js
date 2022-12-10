
// const swap = (arr, left, right) => {
//     let temp = arr[left];
//     arr[left] = arr[right];
//     arr[right] = temp;
// };

// const partition = (arr, low, high) => {
//     let pivot_element = arr[high];

//     let i = low - 1;
//     for (let j = low; j < high; j++) {
//         if (arr[j] < pivot_element) {
//             i++;
//             swap(arr, i, j);
//         }
//     }
//     swap(arr, i + 1, high);
//     return i + 1;
// };

// const kthsmallestElement = (arr, low, high, k) => {
//     let resultIndex = k - 1;
//     while (low < high) {
//         let pivot_index = partition(arr, low, high);
//         if (resultIndex == pivot_index) return arr[pivot_index];

//         if (resultIndex < pivot_index) high = pivot_index - 1;
//         else low = pivot_index + 1;
//     }
//     return arr[low];
// };

// console.log(kthsmallestElement(arr, 0, arr.length-1, 3))

let arr = [7, 10, 4, 20, 15]
function kthLargest(arr, k, low, high) {
    let pivotPoint = getPivotPoint(arr, low, high)
    if (pivotPoint == arr.length - k) {
        // console.log(arr[pivotPoint])
        return arr[pivotPoint]
    } else if (pivotPoint < arr.length - k) {
        return kthLargest(arr, k, pivotPoint + 1, high);
    } else {
        return kthLargest(arr, k, low, pivotPoint - 1);
    }
}
function getPivotPoint(arr, low, high) {
    let pivotElement = arr[high]
    let pivotPoint = low
    for (let i = low; i <= high; i++) {
        if (arr[i] < pivotElement) {
            let temp = arr[i]
            arr[i] = arr[pivotPoint]
            arr[pivotPoint] = temp
            pivotPoint++
        }
    }
    let temp = arr[pivotPoint]
    arr[pivotPoint] = arr[high]
    arr[high] = temp
    console.log(arr)

    return pivotPoint
}
var findKthLargest = function (arr, k) {
    return kthLargest(arr, k, 0, arr.length - 1)
};
console.log(findKthLargest(arr , 3));