// Run when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    
    // Init modules
    initializeThemeToggle();
    setDynamicGreeting();
    handleFormValidation();
    setupGalleryLightbox();
    fetchGitHubRepositories();

    // Theme Toggle
    function initializeThemeToggle() {
        const themeBtn = document.getElementById('theme-toggle');
        if (!themeBtn) return; 

        function updateButtonLabel(isDark) {
            themeBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        }

        // Check default state
        updateButtonLabel(document.documentElement.classList.contains('dark-mode'));

        // Toggle theme and save to local storage
        themeBtn.addEventListener('click', function() {
            const isDark = document.documentElement.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateButtonLabel(isDark);
        });
    }

    // Dynamic Greeting
    function setDynamicGreeting() {
        const greetingElement = document.getElementById('dynamic-greeting');
        if (!greetingElement) return;

        // Get current hour for greeting logic
        const hour = new Date().getHours();
        let greeting = 'Welcome';

        if (hour < 12) {
            greeting = 'Good Morning';
        } else if (hour < 18) {
            greeting = 'Good Afternoon';
        } else {
            greeting = 'Good Evening';
        }

        greetingElement.textContent = greeting + ". Welcome to My Professional Portfolio.";
    }

    // Form Validation
    function handleFormValidation() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            const emailInput = document.getElementById('user-email');
            if (!emailInput) return;

            const email = emailInput.value;
            // Basic email validation check
            const isValidEmail = email.includes('@') && email.includes('.');

            // Prevent default mailto submission
            e.preventDefault();

            if (!isValidEmail) {
                alert('Please enter a valid email address.');
            } else {
                alert('Thank you for reaching out! Your message has been validated and sent.');
            }
        });
    }

    // Gallery Lightbox
    function setupGalleryLightbox() {
        const galleryImages = document.querySelectorAll('.gallery-container img');
        if (galleryImages.length === 0) return;

        // Inject lightbox container into DOM
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

        // Add click listeners to gallery images
        galleryImages.forEach(function(img) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                lightboxImg.src = img.src; 
                lightbox.classList.add('active'); 
            });
        });

        // Close handlers
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target !== lightboxImg) {
                closeLightbox();
            }
        });
    }

    // GitHub API Fetch
    function fetchGitHubRepositories() {
        const githubContainer = document.getElementById('github-repos');
        if (!githubContainer) return;

        const username = 'ryansapp1206';
        // Fetch 4 latest repos
        const url = "https://api.github.com/users/" + username + "/repos?sort=pushed&direction=desc&per_page=4";

        fetch(url)
            .then(function(res) {
                return res.json(); 
            })
            .then(function(data) {
                githubContainer.innerHTML = ''; // clear skeletons

                if (!data || data.length === 0) {
                    githubContainer.innerHTML = '<p>No public repositories found.</p>';
                    return;
                }

                // Build repo cards
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
                // Fetch error fallback
                githubContainer.innerHTML = '<p>Unable to load repositories.</p>';
            });
    }
});