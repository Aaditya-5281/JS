/*
function sum(a,b){
    return a+b;
}

let ans = sum(3,4)

console.log(ans);
*/

/*
function sum(n) {
    let total = 0;
    let index = 0;

    for (; total < n; index++) {
        total += index;
    }

    return index; // or total, depending on what you want
}

let add = sum(5);
console.log(add);

*/

/*
const fs = require("fs")

let content= fs.readFileSync("buy.txt","UTF-8");

console.log(content);
*/

/*
Functional Arguments

function sum(a,b){
    return a+b
}

function mul(a,b){
    return a*b
}
function div(a,b){
    return a/b
}
function sub(a,b){
    return a-b
}

function operation(a,b,op){
    return op(a,b)
}

let ans = operation(3,7,sum)

console.log(ans);
*/

/*
const fs = require("fs")

function print(err,data){
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
}

fs.readFile("content.txt","UTF-8",print);
fs.readFile("buy.txt","UTF-8",print);
fs.readFile("hi.txt","UTF-8",print);

console.log("Done");

*/


/*
console.log("Hi");


setTimeout(() => {
    console.log("Complex function");
}, 1000);

console.log("Welcome to Loop");

let c = 0;
for (let i = 0; i < 10000; i++) {
    c= c + i;
    
}

console.log("Expensive Operations");

*/

/*
class Circle{
    constructor(radius){
        this.radius= radius
    }

    area(){
        let area= 2 * 3.14 * this.radius * this.radius;
        return area
    }
}

let circle = new Circle(2)
let area= circle.area()
console.log(area);

*/
/*
function callback(){
    console.log("This is callback!");
}

setTimeout(callback)
*/


/*
function daddy(ms){
    let dad= new Promise(resolve => setTimeout(resolve,ms));
    return dad;
}


function saale(){
    console.log("This is a function saale");
}

daddy(5000).then(saale);
*/
/*
function promiseCallback(resolve){
    console.log(resolve);
    setTimeout(resolve , 3000);
}

function main(){
    console.log("This is a main function after 3s");
}

promiseCallback(main);

*/

/*
function fuck(){

}

let p = new Promise(fuck);
console.log(p);
*/

/*
function setTimeoutPromisified(ms){
    return new Promise(resolve => setTimeout(resolve,ms))
}


Promise Chaining

setTimeoutPromisified(1000).then(function hi(){
    console.log("hi after 1s");
    return setTimeoutPromisified(3000)
}).then(function hello(){
    console.log("Hello after 3s");
    return setTimeoutPromisified(5000)
}).then(function hello_there(){
    console.log("Hello there after 5s");
})

*/


// Async Await 

/*
function setTimeoutPromisified(ms) {
    return new Promise(resolve => setTimeout(resolve,ms))
}


async function solve(params) {
    await setTimeoutPromisified(1000)
    console.log("Hi after 1s");
    await setTimeoutPromisified(3000)
    console.log("Hello after 3s");
    await setTimeoutPromisified(5000)
    console.log("Hello there after 5s");
}

solve()

*/

const fs= require ("fs")

function readFileAsync(){
    return new Promise(function(resolve,reject){
        fs.readFile("buy.txt","UTF-8",function print(err, data){
            if(err){
                reject(data) 
            }else{
                resolve(data);
            }
        })
    })
}

async function solve() {
    data= await readFileAsync()
    console.log(data);
    
}

solve()














