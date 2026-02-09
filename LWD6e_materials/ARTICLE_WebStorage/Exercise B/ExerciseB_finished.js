let rainbow = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
let separator = "|||";

localStorage.setItem( "saved_rainbow", rainbow.join( separator ) );
console.log("Stored:", rainbow);

let saved_rainbow = localStorage.getItem("saved_rainbow").split( separator );
console.log( "Retrieved:", saved_rainbow );