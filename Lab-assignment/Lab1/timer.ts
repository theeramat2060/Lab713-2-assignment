// const waitAndPrint = (message, delay) => {
//     setTimeout(() => {
//         console.log(message);
//     }, delay);
// }
//
// // Example usage:
// waitAndPrint("Hello, world!", 2000);


const repeatHelloWorld = () => {
    let count = 1;
    setInterval(() => {
        console.log(`hello ${'world '.repeat(count).trim()}`);
        count++;
    }, 3000);
}

repeatHelloWorld();