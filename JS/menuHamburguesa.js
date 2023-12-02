// document.addEventListener('DOMContentLoaded', () => {
//     const hamburgerMenu = document.querySelector('.hamburger-menu');
//     const menu = document.querySelector('.menu');

//     hamburgerMenu.addEventListener('click', () => {
//         hamburgerMenu.classList.toggle('active');
//         menu.classList.toggle('active');
//     });
// });

const hamburgerWrapper = document.querySelector('.hamburger-wrapper');
const hamburgerLines = document.querySelectorAll('.hamburger-line');

hamburgerWrapper.addEventListener('click', () => {
  hamburgerWrapper.classList.toggle('is-active');

  hamburgerLines.forEach(line => {
    line.classList.toggle('hamburger-line--rotated');
  });
});
