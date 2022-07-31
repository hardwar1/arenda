"use strict";

document.addEventListener("DOMContentLoaded", function () {
  function qOne(selector) {
    return document.querySelector(selector);
  }

  function qAll(selector) {
    return document.querySelectorAll(selector);
  }

  const burger = qOne(".burger"),
    menu = qOne(".menu"),
    headerOverlay = qOne(".header__overlay"),
    overlays = qAll(".overlay");

  burger.addEventListener("click", function () {
    this.classList.toggle("burger--close");
    menu.classList.toggle("header__menu--show");
    headerOverlay.classList.toggle("overlay--active");
  });

  function closePopap() {
    const popap = qAll(".popup");
    menu.classList.remove("header__menu--show");
    burger.classList.remove("burger--close");
    let count = 0;
    while (count < popap.length || count < overlays.length) {
      overlays[count].classList.remove("overlay--active");
      // popap[count].classList.remove("popap--active");
      count++;
    }
  }

  menu.addEventListener("click", () => closePopap());
  window.addEventListener("keydown", (e) => {
    if (e.key == "Escape") closePopap();
  });

  for (const overlay of overlays) {
    overlay.addEventListener("click", () => closePopap());
  }

  // скроллы хеадера
  const header = qOne(".header");
  let scrollTop,
    top = 0;

  window.addEventListener("scroll", function () {
    scrollTop = window.scrollY;

    if (scrollTop > 100) {
      header.classList.add("header--scroll");
    } else {
      header.classList.remove("header--scroll");
    }

    if (top < scrollTop && top > 500 && !qOne(".header__menu--show")) {
      header.classList.add("header--hide");
      top = scrollTop;
    } else {
      header.classList.remove("header--hide");
      top = scrollTop;
    }
  });

  // слайдеры
  function swiperCountSlide() {
    const body = qOne("body")[0],
      x =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        body.clientWidth;

    if (x < 760) return 1;
    else return 2;
  }

  const swiper1 = new Swiper(".reviews .swiper", {
    speed: 400,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    slidesPerView: swiperCountSlide(),
    breakpoints: {
      320: {
        slidesPerView: 1,
      },

      760: {
        slidesPerView: 2,
      },
    },
  });

  const swiper2 = new Swiper(".flat-details__thumb", {
    spaceBetween: 3,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
      clickable: true,
    },
    allowTouchMove: false,
  });

  const swiper3 = new Swiper(".flat-details__swiper ", {
    speed: 400,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper2,
    },
  });

  // скроллы якорных ссылок
  const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    animationTime = 1000,
    framesCount = 200;

  anchors.forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      let coordY =
        document
          .querySelector(item.getAttribute("href"))
          .getBoundingClientRect().top + window.pageYOffset;

      let scroller = setInterval(function () {
        // скорость прокрутки
        let scrollBy = 6;
        if (Math.abs(window.pageYOffset - coordY) < scrollBy) {
          window.scrollTo(0, coordY);
          clearInterval(scroller);
        } else if (scrollBy < window.pageYOffset - coordY) {
          window.scrollBy(0, -scrollBy);
        } else if (scrollBy > window.pageYOffset - coordY) {
          window.scrollBy(0, scrollBy);
        }
      }, animationTime / framesCount);
    });
  });
});
