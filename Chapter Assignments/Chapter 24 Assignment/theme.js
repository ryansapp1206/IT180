const $btn = document.querySelector('#theme-btn');
const $body = document.querySelector("#page-body");

$btn.addEventListener('click', function() {
    $body.classList.toggle('dark');

    if($body.classList.contains('dark')) {
        $btn.textContent = 'Switch to Light Theme';
        $btn.setAttribute('aria-pressed', 'true');
    } else {
        $btn.textContent = 'Switch to Dark Theme';
        $btn.setAttribute('aria-pressed', 'false');
    }
});

