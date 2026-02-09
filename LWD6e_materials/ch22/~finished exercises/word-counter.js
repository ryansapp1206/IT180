// 1. Find the first paragraph 
// 2. Count the number of words in it 
// 3. Calculate how long it would take to read 
//    Avg reading speed in US: ~250 words per minute 
// 4. update the paragraph to include the reading time 
           
let $p = document.querySelector('p'); 

let text = $p.innerText; 
let list = text.split(" "); 
let words = list.length; 

let duration = words / 250;

$p.innerText += " (Reading time: " + duration + " minutes)"; 

