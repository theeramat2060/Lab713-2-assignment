// console.log("Hello, TypeScript with Node.js!");

// let x:number = 10;
// x = 'hello';

// let x:number | string = 10;
// x = 'hello';
//
// let i = 0
// i = 'hello'
// console.log(i)

let i = 0
i = 'hello' as any
console.log(i)


let x:number | string = 10;
x = 'hello';
if (typeof x === 'string') {
    console.log('x is a string');
}else if (typeof x === 'number') {
    console.log('x is a number');
}else {
    console.log('x is neither a string nor a number');
}
