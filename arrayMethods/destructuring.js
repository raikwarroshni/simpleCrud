//array destructuring
function getStore(){
    return [2,3,4,5,6,7,8]
}
let [a,b,...restvalue]= getStore()
console.log(a);
console.log(b);
console.log(restvalue);

// nested array destructuring
function nestedArr(){
    return ['rose','ruchi',['green','blue']]
}

let [name1,name2,[color1,color2]]= nestedArr()
console.log(name1,name2,color1,color2);