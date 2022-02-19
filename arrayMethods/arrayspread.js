//spread operator

let val = [1,2,3]
let val1 = [4,5,6,...val]
console.log(val1);

//rest operator
function f(a,b,...val){
    console.log(a,b,val,"rest operator");
}

f(1,2,3,4,5,6,7)