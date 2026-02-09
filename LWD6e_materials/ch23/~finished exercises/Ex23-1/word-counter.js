function insertReadingTime(){
  let $p = document.querySelector('p'); 
  let text = $p.innerText; 
  let list = text.split(" "); 
  let words = list.length; 
  let duration = words / 250;
  $p.innerText += " (Reading time: " + duration + " minutes)"; 
}

insertReadingTime();
