// Greetings Generator that creates a personalized 
// greeting for each name within a names array. 
// Greetings alternate between "Hello" and "Hey" for each name.

// Initialize an array of names
let names = ["Bob", "Bobbert", "Bobberton", "Bobbington", "John"];

// Get container element where greetings will be appended
const container = document.getElementById("greeting-container");

// Function to generate greetings for each name in the array
function greetingsGenerator(names){
    // Loop through each name in the array
    for (let i = 0; i < names.length; i++) {
    // Create a new paragraph element for each greeting 
    const paragraph = document.createElement("p");
    // Alternate greetings based on the index of the name
    if(i % 2 === 0) {
        paragraph.textContent = "Hello, " + names[i] + "!";
    } else {
        paragraph.textContent = "Hey, " + names[i] + "!";
    }
    container.appendChild(paragraph);
    }
}

// call the greetings generator function with the names array
greetingsGenerator(names);

function divBy3and5(num) {
    if(num % 3 === 0 && num % 5 === 0){
        console.log("FizzBuzz");
    }
    else if(num % 5 === 0){
        console.log("Buzz");
    }
    else if(num % 3 === 0){
        console.log("Fizz");
    }
    else {
        console.log(num);
    }    
}

for(i = 1; i <= 100; i++){
    console.log(divBy3and5(i));
}