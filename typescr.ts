// as we know js is not a static typed to language 
// and in js there is no fixed data type of the variables or functions
// so in our project to solve the problem that may arise my user providing the ivalid type 
// we use type script where we write js code but ensures type safety 

//code completetion : 
//it also has interfaces
//we can use enum in js we cant use


 
// tyo things in ts
// 1. type inference :suru ma variable ma j value assign gareko xa tei tesko type hunxa 
let x ="hello"
// x=20  this is not assignable it's type is string only string can be assigned 
 
let y ;
 y = "hello"
 y = 10 // this can be done because let var or const garda deko value le matrai type define 
                                                                                //  garxa


                                                                            
                        // data types in type script
// string
// number(int ,float)
// null 
// undefined
// boolean


let t:number = 23
let ab:string="hello"
let tr:boolean = true
let un:undefined = undefined
let nu:null = null
                                // special data types
// any-> it turns off type checking 


let c:any ;
c= 23
c="sid"
c=true

// unknown-> safer alternatives of any . it does type checking . used when we dont know 
                            // k data type aauxa vanera 

let unk:unknown = 23
let unk2:unknown="siddharth"
    
// arrays 
let numbers:number[] = [123,12,43]
numbers.push(21)
// numbers.push("hello") this cant be done as this array only takes numbers 

const string:Array<string>=['a','b'] // this is another way of defining type of array
// yo garnu ra mathi ko garnu same ho 

// tuples
const users:[string,boolean,number]=['string',true,23] 
//  it can only take 3 ani order matter garxa
// const user2s:[string,boolean,number]=[true,23,'string'] // this is invalid order matters




// enum-> it is a named constant 
enum Role {
    USER, // yesko value 0 by default 0 bata start ani +1 hudai janxa 
    ADMIN,// yesko value 1
    SUPER_ADMIN // yesko value 2 same as array
}
enum Role1 {
    USER=10, // yesko value chai 10 bata start hunxa  
    ADMIN,// yesko value 11 
    SUPER_ADMIN // YESKO 12 
}
console.log(Role.ADMIN)

enum Role2 {
    USER="USER", // yesko value chai 10 bata start hunxa  
    ADMIN="ADMIN",// yesko value 11 
    SUPER_ADMIN="SUPER_ADMIN" // YESKO 12 
}
console.log(Role.ADMIN)
// object types 
type User={
    name:string,
    email:string,
    gender?:string, // yo chai optional vayeni na vayeni hunxa 
    role:Role2
}

const user:User ={ // by default sabai required hunxa tyo User ma define gareko 
    name:"sid",
    email:"sid@gmail.com",
    role:Role2.USER
}

const add=(a:number,b:number):number=>{
   let sum = a+b
   return sum


}
add(2,3)

//                      advance types
// union and intersection 
// union -> (|) yo or ho 
// intersection ->(&) yo and ho
let id:number | string = "sid" // id ma string aauna ni payo string aauna ni payo 
type A ={
   a:string, 
}
type B={
    b:number
}
type AORB = A | B  // yo naya type banako that can take eitther string or number

const a_or_b:AORB={
    a:"sid",
    b:23

}
type AB= A & B

const a_and_b:AB={
    a:"sid",
    b:23
}

// literal type 
let direction :"left" |"right"
// direction = "abc"// invalid yo dina mildaina as direction chai left ra right ma matrai fix xa
direction ="left" // yo chai valid 

//  or it can be done like this also 
type direction1 ="left" |"right"

let Direction:direction1 = "left" 
Direction="right"

// interface -> similar to type to shape the object 

interface Iproduct1 {
    id:number
    name:string,
    price:number   
}
// const product:Iproduct={
//     id:1,
//     name:"bag",
//     price:1000
// }

// difference between type and interface 
// 1. syntax
// 2. type ma inherit and entend garna paryo vane we use (&) mathi ko example ma xa 
// but in interface we can inherit using extends keyword 
interface Iproduct1 {
    id:number
    name:string,
    price:number   
}
const product:Iproduct1={
    id:1,
    name:"bag",
    price:1000
}
interface Iproduct2 extends Iproduct1 {// product1 ko ma hamle nata description add gareko 
    // it uses the key and value used in Iproduct tara naya key ra value pani add vayo 
    
    description:string 

}

const product1:Iproduct2 ={
    id:2,
    name:"shoe",
    price:2999,
    description:"made in italy "
}

interface IUser {
    name:string ,
    email:string
}

const iuser:IUser ={
    name:"sid",
    email:"sidd@gmail.com"
}

console.log(iuser)

class Person{
    public name1:string
     public email1:string
  public  password1:string
    constructor(name1:string,email1:string,password1:string){
        this.name1=name1,
        this.email1=email1,
        this.password1=password1
    }
}
const person = new Person('ram','ram@gmail.com',"12345667")

// generic type 
// yesma chai j type diyo tei nai yesko type hunxa /yesma chai type ni pass garna parxa 

const identity = <t>(value:t):t=>{

    return value
}
identity<string>("hello")// yesma string matrai pass garna milxa 
identity<number>(123)

// generic interface
interface Ibox<t> {
    value:t,
}
const box:Ibox<t>={
    value:"12"
}