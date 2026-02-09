let $ul = document.createElement("ul");

let $li_1 = document.createElement("li");
$li_1.innerText = "Hi!";
$ul.appendChild( $li_1 );

let $li_2 = document.createElement("li");
$li_2.innerText = "Bye!";
$ul.appendChild( $li_2 );

document.body.appendChild( $ul );