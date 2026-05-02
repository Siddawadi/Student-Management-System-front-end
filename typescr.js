"use strict";
// as we know js is not a static typed to language 
// and in js there is no fixed data type of the variables or functions
// so in our project to solve the problem that may arise my user providing the ivalid type 
// we use type script where we write js code but ensures type safety 
//code completetion : 
//it also has interfaces
//we can use enum in js we cant use
// tyo things in ts
// 1. type inference :suru ma variable ma j value assign gareko xa tei tesko type hunxa 
let x = "hello";
// x=20  this is not assignable it's type is string only string can be assigned 
let y;
y = "hello";
y = 10; // this can be done because let var or const garda deko value le matrai type define 
//  garxa
// data types in type script
// string
// number(int ,float)
// null 
// undefined
// boolean
let x =30
x=40
let y:string = "hello"
let t = 23;
let ab = "hello";
let tr = true;
let un = undefined;
let nu = null;
// special data types
// any-> it turns off type checking 
let c;
c = 23;
c = "sid";
c = true;
// unknown-> safer alternatives of any . it does type checking . used when we dont know 
// k data type aauxa vanera 
let unk = 23;
let unk2 = "siddharth";
// arrays 
let numbers = [123, 12, 43];
numbers.push(21);
// numbers.push("hello") this cant be done as this array only takes numbers 
const string = ['a', 'b']; // this is another way of defining type of array
// yo garnu ra mathi ko garnu same ho 
// tuples
const users = ['string', true, 23];
//  it can only take 3 ani order matter garxa
// const user2s:[string,boolean,number]=[true,23,'string'] // this is invalid order matters
// enum-> it is a named constant 
var Role;
(function (Role) {
    Role[Role["USER"] = 0] = "USER";
    Role[Role["ADMIN"] = 1] = "ADMIN";
    Role[Role["SUPER_ADMIN"] = 2] = "SUPER_ADMIN"; // yesko value 2 same as array
})(Role || (Role = {}));
var Role1;
(function (Role1) {
    Role1[Role1["USER"] = 10] = "USER";
    Role1[Role1["ADMIN"] = 11] = "ADMIN";
    Role1[Role1["SUPER_ADMIN"] = 12] = "SUPER_ADMIN"; // YESKO 12 
})(Role1 || (Role1 = {}));
console.log(Role.ADMIN);
var Role2;
(function (Role2) {
    Role2["USER"] = "USER";
    Role2["ADMIN"] = "ADMIN";
    Role2["SUPER_ADMIN"] = "SUPER_ADMIN"; // YESKO 12 
})(Role2 || (Role2 = {}));
console.log(Role.ADMIN);
const user = {
    name: "sid",
    email: "sid@gmail.com",
    role: Role2.USER
};
const add = (a, b) => {
    let sum = a + b;
    return sum;
};
add(2, 3);
//                      advance types
// union and intersection 
// union -> (|) yo or ho 
// intersection ->(&) yo and ho
let id = "sid"; // id ma string aauna ni payo string aauna ni payo 
const a_or_b = {
    a: "sid",
    b: 23
};
const a_and_b = {
    a: "sid",
    b: 23
};
// literal type 
let direction;
// direction = "abc"// invalid yo dina mildaina as direction chai left ra right ma matrai fix xa
direction = "left"; // yo chai valid 
let Direction = "left";
Direction = "right";
const product = {
    id: 1,
    name: "bag",
    price: 1000
};
const product1 = {
    id: 2,
    name: "shoe",
    price: 2999,
    description: "made in italy "
};
const iuser = {
    name: "sid",
    email: "sidd@gmail.com"
};
console.log(iuser);
