const nightButton = document.querySelector('#night-button');
nightButton.addEventListener('click', toggleTheme);

function toggleTheme(e) {
    document.body.classList.toggle('dark');
}