function countWords( the_text ) {
  return the_text.split(" ").length;
}
function wordsToMinutes( words ) {
  return words/250;
}
function insertReadingTime(){
  let $p = document.querySelector('p'); 
  let words = countWords( $p.innerText ); 
  let duration = wordsToMinutes( words );
  $p.innerText += " (Reading time: " + duration + " minutes)"; 
}

insertReadingTime();
