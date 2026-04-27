var container = document.getElementById('container');
var prevBtn = document.getElementById('prev');
var nextBtn = document.getElementById('next');

var currentSlide = 0;
var totalSlides = 6;

function updateSlide() {
    container.style.transform = 'translateX(-' + (currentSlide * 100) + 'vw)';
}

function handleNextClick() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlide();
    }
}

function handlePrevClick() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlide();
    }
}

function handleKeyDown(e) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNextClick();
    }
    if (e.key === 'ArrowLeft') {
        handlePrevClick();
    }
}

nextBtn.addEventListener('click', handleNextClick);
prevBtn.addEventListener('click', handlePrevClick);
document.addEventListener('keydown', handleKeyDown);