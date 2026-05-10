document.addEventListener('DOMContentLoaded', () => {
    
    // Feature 1: Dark/Light Theme Toggle (Persistence handled in <head> script)
    const themeBtn = document.getElementById('theme-toggle');
    
    if (themeBtn) {
        if (document.documentElement.classList.contains('dark-mode')) {
            themeBtn.textContent = '☀️ Light Mode';
        }

        themeBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');
            
            if (document.documentElement.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeBtn.textContent = '☀️ Light Mode';
            } else {
                localStorage.setItem('theme', 'light');
                themeBtn.textContent = '🌙 Dark Mode';
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
            if (!email.includes('@') || !email.includes('.')) {
                e.preventDefault(); 
                alert('Please enter a valid email address.');
            } else {
                e.preventDefault(); 
                alert('Thank you for reaching out! Your message has been validated and "sent".');
            }
        });
    }

    // Feature 4: Scroll-Spy Navigation
    const sections = document.querySelectorAll('section[id]');
    const scrollLinks = document.querySelectorAll('nav[style*="margin-top"] ul li a[href^="#"]');

    if (sections.length > 0 && scrollLinks.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    scrollLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${entry.target.id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.4 }); 

        sections.forEach(section => observer.observe(section));
    }

    // Feature 5: Gallery Lightbox
    const galleryImages = document.querySelectorAll('.gallery-container img');
    if (galleryImages.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img src="" alt="Expanded Image">
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox-close');

        galleryImages.forEach(img => {
            img.style.cursor = 'pointer'; 
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });

        closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) lightbox.classList.remove('active');
        });
    }

    // Feature 6: GitHub API Fetch
    const githubContainer = document.getElementById('github-repos');
    if (githubContainer) {
        const username = 'ryansapp1206'; 
        
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                githubContainer.innerHTML = ''; 
                
                if (data.length === 0) {
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
                        </a>
                    `;
                    githubContainer.appendChild(card);
                });
            })
            .catch(err => {
                githubContainer.innerHTML = '<p>Unable to load GitHub repositories at this time.</p>';
                console.error('GitHub API error:', err);
            });
    }
});