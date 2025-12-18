'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const section = document.querySelectorAll('.section')
const tap = document.querySelectorAll('.operations__tab');
const tapcontainer = document.querySelector('.operations__tab-container');

const tapsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  console.log(e.target);
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//smooth scroll
btnScroll.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

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
  e.preventDefault();

  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tap.forEach(t => t.classList.remove('operations__tab--active'));
  if (clicked) {
    clicked.classList.add('operations__tab--active');
  }

  tapsContent.forEach(tp => tp.classList.remove('operations__content--active'));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Hover_handeler
const hoverhandeler = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('img');
    sibling.forEach(el => {
      if (el !== link) {
        el.style.opacity = opacity;
        logo.style.opacity = opacity;
      }
    });
  }
};
nav.addEventListener('mouseover', function (e) {
  e.preventDefault();
  hoverhandeler(e, 0.3);
});
nav.addEventListener('mouseout', function (e) {
  e.preventDefault();
  hoverhandeler(e, 1);
});



// sticky nav
let visible = null
const obscallback = (entries) => {
  visible = entries[0].isIntersecting;
  if (!visible) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }

}

const observer = new IntersectionObserver(obscallback, {
  threshold: 0, root: null,
  rootMargin: '-90px'
})
observer.observe(document.querySelector('.header'))


//reveal hidden
const sectionhidden = (entries, observer) => {
  entries.forEach((el) => {
    if (!el.isIntersecting) {
      return
    }
    el.target.classList.remove('section--hidden')
    observer.unobserve(el.target)
  })

}
const hiddenobserve = new IntersectionObserver(sectionhidden, { root: null, threshold: 0.3 })
hiddenobserve.observe(section1)
hiddenobserve.observe(section2)
hiddenobserve.observe(section3)

//lazy loading image

const imgtarget = document.querySelectorAll('img[data-src]')
const loadimg = function (entries, observe) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return
    entry.target.src = entry.target.dataset.src
    entry.target.addEventListener('load', function (e) {
      entry.target.classList.remove('lazy-img')
    })
    observe.unobserve(entry.target)
  })
}
const imgobserver = new IntersectionObserver(loadimg, {})
imgtarget.forEach((img) => {
  imgobserver.observe(img)
})

//create slider
// const slider = document.querySelector('.slider');
// const slides = document.querySelectorAll('.slide');

// // اول فقط اسلاید اول رو نگه می‌داریم
// for (let i = 1; i < slides.length; i++) {
//   slider.removeChild(slides[i]);
// }
// let currentIndex = 0;
// slider.addEventListener('click', function (e) {
//   if (e.target.classList.contains('slider__btn--right')) {
//     if (currentIndex <= slides.length - 1) {
//       slider.removeChild(slides[currentIndex]);
//       currentIndex = (currentIndex + 1) % slides.length
//       slider.appendChild(slides[currentIndex]);
//     }
//   }
// });

const slides = document.querySelectorAll('.slide');
const btnright = document.querySelector('.slider__btn--right')
const btnleft = document.querySelector('.slider__btn--left')
let curslide = 0
let maxslid = slides.length

// firstslide
slides.forEach(function (s, i) {
  if (i <= slides.length)
    s.style.transform = `translateX(${100 * (i)}%)`
})

const gotoSlide = function (curslide) {
  slides.forEach(function (s, i) {
    if (i <= slides.length)
      s.style.transform = `translateX(${100 * (i - curslide)}%)`
  })
}

//next slide

//after
btnright.addEventListener('click', function (e) {
  if (curslide == maxslid - 1) {
    curslide = 0
  } else { curslide++ }
  gotoSlide(curslide)
  activedot(curslide)
}
)
//previuse
btnleft.addEventListener('click', function (e) {
  if (curslide == 0) {
    curslide = maxslid - 1
  } else { curslide-- }
  gotoSlide(curslide)
  activedot(curslide)
})
//keyboard
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    if (curslide == maxslid - 1) {
      curslide = 0
    } else { curslide++ }
    gotoSlide(curslide)
    activedot(curslide)
  }
  if (e.key === 'ArrowLeft') {
    if (curslide == 0) {
      curslide = maxslid - 1
    } else { curslide-- }
    gotoSlide(curslide)
    activedot(curslide)
  }
})
// create dot
const dotcontainer = document.querySelector('.dots')
slides.forEach(function (s, i) {
  dotcontainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
})
//activate dot
const activedot = function (slide) {
  // همه‌ی دکمه‌ها رو غیر فعال کن
  document.querySelectorAll('.dots__dot').forEach(function (d) {
    d.classList.remove('dots__dot--active');
  });

  // دکمه‌ی مربوط به اسلاید فعلی رو فعال کن
  document.querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};


activedot(0)
dotcontainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    curslide = Number(e.target.dataset.slide)
    gotoSlide(curslide)
    activedot(curslide)
  }
})