
// function greet(name){
//     console.log('Hello ' + name);
// }
// greet('John');
//
// function greet(name){
//     return 'Hello ' + name
// }
// greet('John');

// function greet(name){
//     return 'Hello ' + name
// }
// console.log(greet('JohnLee'));

// let score = [10, 20, 10, 30, 12 ]
// function scoreGrade(score: number): number {
//     let sum = 0
//     for (let i = 0; i < score.length; i++) {
//         sum += score[i]
//     }
//     return sum
// }
// console.log(scoreGrade(score));

// const greet = function greet(name){
//     return 'Hello ' + name
// }
//
// console.log(greet('John'))


// const greet = (name) => 'Hello ' + name
//
// console.log(greet('John'))


// const multiply = (x,y) => { return x * y }
//
// console.log(multiply(5, 10))


// const multiply = (x,y) => {
//         if (x>y){
//             return x;
//         }else {
//             return y;
//         }
// }
// console.log(multiply(13, 10))

// const add = (a,b) => {
//     return a+b;
// }
// console.log(add(1,2));

// const add = (a:number,b:number) => {
//     return a+b;
// }
// const result = add(1,2) + 0;
// console.log(result, 'type of result:', typeof result);

// const add = (a:number,b:number):string => {
//     return a+b;
// }
// const result = add(1,2) + 0;
// console.log(result, 'type of result:', typeof result);

// const add = (a:number,b:number):string => {
//     const result =  a+b;
//     return result.toString();
// }

// let numList=[10,20,30,40,50,77,5,3,99,23];
// const findMax = (numList):number => {
//     let max = numList[0];
//     for (let i = 1; i < numList.length; i++) {
//         if (numList[i] > max) {
//             max = numList[i];
//         }
//     }
//     return max;
// }
// console.log('Max number is:', findMax(numList));

export const  subtract = (a:number,b:number):string => {
    const result =  a-b;
    return result.toString();
}

const  add = (a:number,b:number):string => {
    const result =  a+b;
    return result.toString();
}




export default add;