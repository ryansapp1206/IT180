document.addEventListener('DOMContentLoaded', () => {
    
    // Feature 1: Dark/Light Theme Toggle (Now with LocalStorage Persistence)
    const themeBtn = document.getElementById('theme-toggle');
    
    // 1a. Check for a saved theme in the browser's local storage on page load
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeBtn) {
            themeBtn.textContent = 'Light Mode';
        }
    }

    // 1b. Handle the button click and save the preference
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark'); // Save state
                themeBtn.textContent = 'Light Mode';
            } else {
                localStorage.setItem('theme', 'light'); // Save state
                themeBtn.textContent = 'Dark Mode';
            }
        });
    }

    // Feature 2: Dynamic Greeting based on time of day
    const greetingElement = document.getElementById('dynamic-greeting');
    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting = 'Welcome';
        if (hour < 12) greeting = 'Good Morning';
        else if (hour < 18) greeting = 'Good Afternoon';
        else greeting = 'Good Evening';
        
        greetingElement.textContent = `${greeting}. Welcome to My Professional Portfolio.`;
    }

    // Feature 3: Basic Form Validation Interception
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const email = document.getElementById('user-email').value;
            // Conditional check for a valid-looking email before submitting
            if (!email.includes('@') || !email.includes('.')) {
                e.preventDefault(); 
                alert('Please enter a valid email address.');
            } else {
                e.preventDefault(); // Prevents actual mailto execution for the demo
                alert('Thank you for reaching out! Your message has been validated and "sent".');
            }
        });
    }
});