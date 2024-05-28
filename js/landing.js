'use strict';

import { qS, qSA, cE } from '../utils/fn.js';

const modal = qS('.modal');
const overlay = qS('.overlay');
const btnCloseModal = qS('.btn--close-modal');
const btnsOpenModal = qSA('.btn--show-modal');
const header = qS('.header');
const btnScroolTo = qS('.btn--scroll-to');
const section1 = qS('#section--1');
const tabs = qSA('.operations__tab');
const tabsContainer = qS('.operations__tab-container');
const tabsContent = qSA('.operations__content');
const nav = qS('.nav');
const allSections = qSA('.section');

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

//Operations component

tabsContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  //Remove active classes
  tabs.forEach((t) => t.classList.remove('operations__tab--active'));
  tabsContent.forEach((c) => c.classList.remove('operations__content--active'));

  //Activate tab
  clicked.classList.add('operations__tab--active');

  //Activate content area
  qS(`.operations__content--${clicked.dataset.tab}`).classList.add(
    'operations__content--active'
  );
});

//Menu fade animation
const handleOver = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
nav.addEventListener('mouseover', (e) => handleOver(e, 0.5));

nav.addEventListener('mouseout', (e) => handleOver(e, 1));

//Sticky navigation with Intersection Observer API
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = (entries) => {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  treshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//Revealing sections on scroll

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  treshold: 0.35,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy loading images

const imgTargets = qSA('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  treshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach((img) => imgObserver.observe(img));

//Slider component
const slides = qSA('.slide');
const btnLeft = qS('.slider__btn--left');
const btnRight = qS('.slider__btn--right');

let currentSlide = 0;
const maxSlide = slides.length;

const goToSlide = (slide) => {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);

//next slide

const nextSlide = () => {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
};

//previous slide
const prevSlide = () => {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
