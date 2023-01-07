
// let s = ["azbde", "abcher", "acegk"]
// let m = 50
// let sum = 0
// for (let i = 0; i < s.length; i++) {
//     let temp = 1
//     let word = s[i]
//     for (let j = 0; j < word.length; j++) {
//         let d = word[j].charCodeAt(0)
       
//         BigInt(temp *= Math.pow(d, 2))
//     }
//    BigInt(sum+= temp)  
    
// }
// console.log(sum);
// if (BigInt(sum % 2) == 0) console.log("EVEN")
// else console.log("ODD")
// function x() {

//     return "hello"

// }

// const sentence = x`hi`

// console.log(sentence)
// function y() {

//     console.log(this.length)

// }

// var x = {

//     length: 5,

//     method: function (y) {

//         arguments[0]()

//     }

// }

// x.method(y, 1)
// const clothes = ['jacket', 't-shirt'];

// clothes.length = 0;

// console.log(clothes[0]) // => ???
setTimeout(()=>{
console.log("timeout");
},0)

const object = { x: 10, y: (a) => { return a + object.x } }

console.log(object.y(5))
console.log(object.y(5))
setTimeout(()=>{
console.log("timeout 2");
},0)
console.log(object.y(5))
console.log(object.y(5))