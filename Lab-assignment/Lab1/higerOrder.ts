// const n = [1, 2, 3, 4, 5];
// const square = n.map((num) => num * num);
// console.log(square);


// const n = [1, 2, 3, 4, 5];
// const even = n.filter((num) => num % 2 === 0);
// console.log(even);



const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const result = numbers
    .filter((num) => num % 3 === 0)
    .map((num) => Math.pow(num, 3));
console.log(result);