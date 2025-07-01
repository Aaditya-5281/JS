function ramu_kaka(amount){
    return amount + " Rupees Worth Products are Bought by ramu_kaka";
}
/*
let product= ramu_kaka(50);
console.log(product);
*/


function sum(a,b){
    let total= a+b;
    return total;
}
/*
let add= sum(1,"aaditya");
console.log(add);
*/

function canVote(age){
    if (age>=18) {
        return true;
    }else{
        return false;
    }
}
/*
let vote= canVote(15)

console.log(vote);
*/


let user= {
    user_1:{
        first_name : "Aaditya",
        age : 20
    },
    user_2:{
        first_name : "Harsha",
        age : 30
    }
}

function greet(user){
    console.log("Hi "+ user.user_2.first_name + " Your age is " + user.user_2.age);
}

greet(user);

