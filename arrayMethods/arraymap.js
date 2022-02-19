//array map functions
let numbers = [16, 25, 36];
let results = numbers.map(Math.sqrt);
console.log(results);

//array filter functions
let values = [20,30,40,50,2]
let filtervalue = values.filter(value=>{return value<10})
console.log(filtervalue,"filtervalue");

//findindex method
let arr = [11, 52, 77, 83, 32, 7];
let index = arr.findIndex(arr => arr === 7);
console.log(index);