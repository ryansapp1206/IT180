// Exercise 23-5


// Challenge 1 (replace "22" with your age)

let div_count = document.querySelectorAll( "div" ).length;
let p_count = document.querySelectorAll( "p" ).length;
if ( div_count > p_count ) {
  console.log("More `div` elements than `p` elements");
} else {
  console.log("More `p` elements than `div` elements");
}

// Challenge 2 

let list = [ "item 1", "item 2", "item 3" ];
for ( let i = 0; i < list.length; i++ ){
  list[ i ] = "✓ " + list[ i ];
}
console.log( list );