let array = [1,2,3,5,6,7]
    let sum = 0;
        for(let x in array){
            sum += array[x];
        }
    let n = array[array.length-1]
    expected_sum =(n*(n+1)/2);
    let missingNumb= expected_sum-sum
console.log(missingNumb)