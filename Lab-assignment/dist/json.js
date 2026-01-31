"use strict";
// const object = {
//     name: "John",
//     age: 30,
//     city: "New York"
// }
//
// console.log(object)
// const object = {
//     name: "John",
//     age: 30,
//     city: "New York"
// }
//
// console.log(object.name)
//
// const object = {
//     name: "John",
//     age: 30,
//     city: "New York"
// }
//
// console.log(object.name)
// const jsonStr = JSON.stringify(object);
// console.log("Object: ", object)
// console.log("json String: ", jsonStr)
const objectStudent = {
    firstName: "Somchai",
    lastName: "Sukjai",
    age: 20,
    gpa: 1.5
};
function checkStudentStatus(student) {
    if (student.gpa > 2) {
        return JSON.stringify(student);
    }
    else {
        return `คุณ ${student.firstName} พ้นสภาพ`;
    }
}
console.log(checkStudentStatus(objectStudent));
