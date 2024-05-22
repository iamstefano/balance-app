'use strict';

import { qS, qSA, cE } from '../utils/fn.js';

const allSections = qSA('.section');
const allButtons = qSA('button');
const header = qS('header');

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

// Modal window

const modal = qS('.modal');
const overlay = qS('.overlay');
const btnCloseModal = qS('.btn--close-modal');
const btnsOpenModal = qSA('.btn--show-modal');

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
