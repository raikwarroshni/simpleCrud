//slice method
let arr =[1,2,3,4,5]
arr.splice(0,2)
console.log(arr,"splice");

//indexOf method

console.log(arr.indexOf(5));

//lastIndexOf
console.log(arr.lastIndexOf(4));

//every method
let arr1 = [20,30,40,50]
let result = arr1.every(e=>e > 90)
console.log(result,"result");

//some method
let result1 = arr1.some(e=> e > 10 )
console.log(result1,"result1");