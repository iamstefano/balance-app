'use strict';

import { qS, qSA, cE } from '../utils/fn.js';

const modal = qS('.modal');
const overlay = qS('.overlay');
const btnCloseModal = qS('.btn--close-modal');
const btnsOpenModal = qSA('.btn--show-modal');
const header = qS('header');
const btnScroolTo = qS('.btn--scroll-to');
const section1 = qS('#section--1');

//Create cookie message
const message = cE('div');
const messageBtn = cE('button');
message.classList.add('cookie-message');
message.textContent =
  'We use cookies for improved functionality and analytics.';
messageBtn.className = 'btn  btn--close-cookie';
messageBtn.textContent = 'Got it!';
message.appendChild(messageBtn);
header.append(message);
//Cookies style
message.style.backgroundColor = '#37383d';

//Close cookie msg
qS('.btn--close-cookie').addEventListener('click', function () {
  message.remove();
});

//Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Implementing smooth scrolling

btnScroolTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  //Scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

//Smooth page navigation

// qSA('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     qS(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

////////////!!!Event delegation!!!////////////

qS('.nav__links').addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    qS(id).scrollIntoView({ behavior: 'smooth' });
  }
});
