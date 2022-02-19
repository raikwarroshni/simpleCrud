//splice mthod
//deleting value
let score = [1,2,3,4,5,6,7,8]
score.splice(0,5)
console.log(score,"splice delete");
//inserting elements
let score1 = ["java","c++","c",".net"]
score1.splice(2,0,"rose")
//0 argument for not deleting any value
console.log(score1,"inserting");
//replacing elements
let score2 = ["apple","mango","orange"]
score2.splice(1,1,"rose")
console.log(score2,"replacing");

// // output//
// [ 6, 7, 8 ] splice delete
// [ 'java', 'c++', 'rose', 'c', '.net' ] inserting
// [ 'apple', 'rose', 'orange' ] replacing