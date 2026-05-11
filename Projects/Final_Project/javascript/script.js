// Wait for the HTML to fully load before running anything
document.addEventListener('DOMContentLoaded', function() {
    
    // Call all modules
    initializeThemeToggle();
    setDynamicGreeting();
    handleFormValidation();
    setupGalleryLightbox();
    fetchGitHubRepositories();

    // Theme Toggle Logic
    function initializeThemeToggle() {
        const themeBtn = document.getElementById('theme-toggle');
        if (!themeBtn) {
            return; // Exit if button isn't on page
        }

        // Helper function to change button text
        function updateButtonLabel(isDark) {
            if (isDark) {
                themeBtn.textContent = 'Light Mode';
            } else {
                themeBtn.textContent = 'Dark Mode';
            }
        }

        // Set initial label based on current class
        updateButtonLabel(document.documentElement.classList.contains('dark-mode'));

        // Listen for clicks, toggle class, and save choice to local storage
        themeBtn.addEventListener('click', function() {
            const isDark = document.documentElement.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateButtonLabel(isDark);
        });
    }

    // Dynamic Greeting Logic
    function setDynamicGreeting() {
        const greetingElement = document.getElementById('dynamic-greeting');
        if (!greetingElement) {
            return;
        }

        // Grab the current hour (0-23) and figure out what to say
        const hour = new Date().getHours();
        let greeting = 'Welcome';

        if (hour < 12) {
            greeting = 'Good Morning';
        } else if (hour < 18) {
            greeting = 'Good Afternoon';
        } else {
            greeting = 'Good Evening';
        }

        greetingElement.textContent = `${greeting}. Welcome to My Professional Portfolio.`;
    }

    // --- Form Validation Logic ---
    function handleFormValidation() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) {
            return;
        }

        contactForm.addEventListener('submit', function(e) {
            const emailInput = document.getElementById('user-email');
            if (!emailInput) {
                return;
            }

            const email = emailInput.value;
            // Basic check to ensure it looks like an email
            const isValidEmail = email.includes('@') && email.includes('.');

            // Stop the form from submitting immediately
            e.preventDefault();

            if (!isValidEmail) {
                alert('Please enter a valid email address.');
            } else {
                alert('Thank you for reaching out! Your message has been validated and "sent".');
                // You'd normally let the form submit here in a real backend setup
            }
        });
    }

    // --- Lightbox Image Gallery ---
    function setupGalleryLightbox() {
        const galleryImages = document.querySelectorAll('.gallery-container img');
        if (galleryImages.length === 0) {
            return;
        }

        // Build the modal HTML completely in JS and drop it into the body
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img src="" alt="Expanded Image">
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox-close');

        function closeLightbox() {
            lightbox.classList.remove('active');
        }

        // Loop through all gallery images and add click events to them
        galleryImages.forEach(function(img) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                lightboxImg.src = img.src; // Copy the clicked image source to the lightbox
                lightbox.classList.add('active'); // Show it
            });
        });

        // Close when clicking the X or anywhere outside the image
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target !== lightboxImg) {
                closeLightbox();
            }
        });
    }

    // --- GitHub API Integration ---
    function fetchGitHubRepositories() {
        const githubContainer = document.getElementById('github-repos');
        if (!githubContainer) {
            return;
        }

        const username = 'ryansapp1206';
        // Grab the 4 most recently updated repos
        const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=4`;

        fetch(url)
            .then(function(res) {
                return res.json(); // Parse the raw response into JSON
            })
            .then(function(data) {
                githubContainer.innerHTML = ''; // Wipe out the skeleton loaders

                if (!data || data.length === 0) {
                    githubContainer.innerHTML = '<p>No public repositories found.</p>';
                    return;
                }

                // Loop through the data and build HTML cards for each repo
                data.forEach(function(repo) {
                    const card = document.createElement('div');
                    card.classList.add('repo-card');
                    card.innerHTML = `
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                            <h4>${repo.name}</h4>
                            <p>${repo.description || 'No description provided.'}</p>
                        </a>`;
                    githubContainer.appendChild(card);
                });
            })
            .catch(function() {
                // Failsafe in case the API is down or rate-limited
                githubContainer.innerHTML = '<p>Unable to load repositories.</p>';
            });
    }
});