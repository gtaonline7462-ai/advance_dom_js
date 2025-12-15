'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header')
const btnScroll = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const tap = document.querySelectorAll('.operations__tab')
const tapcontainer = document.querySelector('.operations__tab-container')

const tapsContent = document.querySelectorAll('.operations__content')

const openModal = function (e) {
  e.preventDefault()
  console.log(e.target);
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//smooth scroll
btnScroll.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: "smooth" })
})
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault()
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})

////////////////////////////////////////////

// const massage = document.createElement('div')
// massage.classList.add('cookie-message')
// massage.innerHTML = `we can use it in dom  <button class='btn btn--close-cookie'>got it ;</button>`
// console.log(massage.childNodes);
// header.before(massage)
// document.querySelector('.btn--close-cookie').addEventListener('click', function () {
//   massage.remove()
// })

// برای دست پیدا کردن به قسمت root css

// document.documentElement.style.setProperty('--color-primary', '#ff585f')

// btnScroll.addEventListener('click', function (e) {
//   const rect = section1.getBoundingClientRect()
//   console.log(rect);
//   // console.log(e.target.getBoundingClientRect());
//   console.log(window.pageXOffset, pageYOffset);
//   window.scrollTo({
//     top: rect.top + window.pageYOffset,
//     left: rect.left + pageXOffset,
//     behavior: "smooth"
//   })
//  section1.scrollIntoView({ behavior: 'smooth' })
// })
// const h1 = document.querySelector('h1')
// const alertevent = function (e) {
//   alert('hi')
// }
// h1.addEventListener('mouseenter', alertevent
// )
// setTimeout(() => h1.removeEventListener('mouseenter', alertevent), 10000)


//////////////////////
//create random color
// const randomint = (min, max) => Math.floor(Math.random() * (max - min) + min)
// const randomColor = () => {
//   return `rgb(${randomint(0, 255)},${randomint(0, 255)},${randomint(0, 255)})`
// };

// document.querySelector('.nav__link').addEventListener('click', function (e) {


//   this.style.backgroundColor = randomColor()
// })
////////////////////////////////////////
// document.querySelectorAll('.nav__link').forEach((el) =>

//   el.addEventListener('click', function (e) {
//     e.preventDefault()
//     const id = el.getAttribute('href')
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
//   })
// )



tapcontainer.addEventListener('click', function (e) {
  e.preventDefault()


  const clicked = e.target.closest('.operations__tab')
  if (!clicked) return;
  tap.forEach(t => t.classList.remove('operations__tab--active'))
  if (clicked) { clicked.classList.add('operations__tab--active') }

  tapsContent.forEach(tp => tp.classList.remove('operations__content--active'))


  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')


})