// function add (firstNumber : number, secondNumber :number){
//   return firstNumber + secondNumber;
// }

// const sum =  add(5,6)
// console.log(sum);

// const user : number = 20

// function canVote() : boolean {
//   return user > 18
// }

// console.log(canVote());

// function call(fn : Function){
//   setTimeout(fn,5000)
// }

// call(function(){
//   console.log("Hi There");
// })

// function firstName (name : string) :  string{
//   return name;
// }

// function logName (fn : (a:string) => string): void {
//   const naam = fn("Aaditya")
//   console.log(naam);
// }

// logName(firstName)

function user(user: { firstName: string; age: number }): void {
  console.log(`Hello ${user.firstName}`);
}

// Types

let username = {
  firstName: "Aaditya",
  age: 20,
};

// Both are Max Same , Minor Difference

// Interfaces


// interface username {
//   firstName: "Aaditya",
//   age: 20,
// };

// user(username);




// interface People {
//   firstName : string;
//   age : number;
//   greet() : void;
// }

// const people = {
//   firstName : "Aaditya",
//   age : 20,
//   greet(){
//     console.log("This is a People Object");
//   }
// }

// people.greet()






// type User = {
//   firstName : string;
//   goodness : string;
// }


// type Admin = {
//   firstName : string;
//   badness : string
// }


// const a: User = {
//   firstName: "Aaditya",
//   goodness: "Very Good",
// };

// const b: Admin = {
//   firstName: "Harsha",
//   badness: "Very Bad",
// };


// function call(user : User | Admin) : string {
//   return user.firstName
// }
// console.log(call(a));
// console.log(call(b));



