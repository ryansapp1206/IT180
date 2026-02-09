let $html = document.documentElement;

let $toggle = document.createElement("button");
$toggle.type = "button";
$toggle.classList.add( "theme-toggle" );
$toggle.innerText = "Theme Toggle";

function toggleTheme() {
  $html.classList.toggle( "dark" );
}
$toggle.onclick = toggleTheme;

document.body.appendChild( $toggle );