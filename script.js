'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header')
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

const massage = document.createElement('div')
massage.classList.add('cookie-message')
massage.innerHTML = `we can use it in dom  <button class='btn btn--close-cookie'>got it ;</button>`
console.log(massage.childNodes);
header.before(massage)
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  massage.remove()
})