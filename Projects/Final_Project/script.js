document.addEventListener('DOMContentLoaded', () => {
    
    initializeThemeToggle();
    setDynamicGreeting();
    handleFormValidation();
    setupGalleryLightbox();
    fetchGitHubRepositories();

    function initializeThemeToggle() {
        const themeBtn = document.getElementById('theme-toggle');
        if (!themeBtn) return;

        const updateButtonLabel = (isDark) => {
            themeBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        };

        updateButtonLabel(document.documentElement.classList.contains('dark-mode'));

        themeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateButtonLabel(isDark);
        });
    }

    function setDynamicGreeting() {
        const greetingElement = document.getElementById('dynamic-greeting');
        if (!greetingElement) return;

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

    function handleFormValidation() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            const emailInput = document.getElementById('user-email');
            if (!emailInput) return;

            const email = emailInput.value;
            const isValidEmail = email.includes('@') && email.includes('.');

            e.preventDefault();

            if (!isValidEmail) {
                alert('Please enter a valid email address.');
            } else {
                alert('Thank you for reaching out! Your message has been validated and "sent".');
            }
        });
    }

    function setupGalleryLightbox() {
        const galleryImages = document.querySelectorAll('.gallery-container img');
        if (galleryImages.length === 0) return;

        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img src="" alt="Expanded Image">
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox-close');

        const closeLightbox = () => lightbox.classList.remove('active');

        galleryImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) closeLightbox();
        });
    }

    function fetchGitHubRepositories() {
        const githubContainer = document.getElementById('github-repos');
        if (!githubContainer) return;

        const username = 'ryansapp1206';
        const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=4`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                githubContainer.innerHTML = '';

                if (!data || data.length === 0) {
                    githubContainer.innerHTML = '<p>No public repositories found.</p>';
                    return;
                }

                data.forEach(repo => {
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
            .catch(() => {
                githubContainer.innerHTML = '<p>Unable to load repositories.</p>';
            });
    }
});