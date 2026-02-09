class ThemeToggleElement extends HTMLElement {
	connectedCallback() {
		this.__$html = document.documentElement;
    this.__$body = document.body;
    this.__$toggle = document.createElement("button");
    
    this.__initialize();
	}

  __saveTheme() {
    let theme = "light";
    if ( this.__$html.classList.contains("dark") ) {
      theme = "dark";
    }
    window.localStorage.setItem( "saved_theme", theme );
  }
  
  __toggleTheme() {
    this.__$html.classList.toggle( "dark" );
    this.__updateButton();
    this.__saveTheme();
  }

  __updateButton() {
    let dark = this.__$html.classList.contains("dark");
    let other_theme;
    if ( dark ) {
      this.__$toggle.ariaPressed = "true";
      other_theme = "light"; 
    } else {
      this.__$toggle.ariaPressed = "false";
      other_theme = "dark";
    }
    let label = "Change theme to " + other_theme;
    this.__$toggle.ariaLabel = label;
    this.__$toggle.title = label;
  }

	__initialize() {
		let preferred = localStorage.getItem("saved_theme");
    if ( preferred === "dark" ) {
      this.__$html.classList.add("dark");
    }

    this.__$toggle.type = "button";
    this.__$toggle.classList.add( "theme-toggle" );
    this.__$toggle.innerText = "Theme Toggle";
    this.__$toggle.onclick = this.__toggleTheme.bind(this);
    this.__updateButton();
    this.__$body.appendChild( this.__$toggle );
	}
}

if ( !!customElements ) {
	customElements.define("theme-toggle", ThemeToggleElement);
}