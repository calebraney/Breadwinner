import { attr } from './utilities';
import SplitType from 'split-type';
import { runSplit } from './utilities';

document.addEventListener('DOMContentLoaded', function () {
  // Comment out for production
  console.log('Local Script Loaded');

  //register gsap plugins
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Flip);

  //////////////////////////////
  //Global Selectors
  const HEADER_SECTION = '[data-header-el="section"]';
  const HEADER_WRAP = '[data-header-el="wrap"]';
  const HEADER_H1 = '[data-header-el="h1"]';
  const HEADER_P = '[data-header-el="p"]';
  const HEADER_LOGOS_WRAP = '[data-header-el="logos"]';
  const HEADER_FORM = '[data-header-el="form"]';
  const HEADER_ANGLE = '[data-header-el="angle"]';
  const HEADER_ANGLE_WRAP = '[data-header-el="angle-wrap"]';
  const HEADER_IMAGE_WRAP = '[data-header-el="image-wrap"]';
  const HEADER_IMAGE = '[data-header-el="image"]';
  const HEADER_CIRCLE_TEXT = '[data-header-el="circle-text"]';

  //////////////////////////////
  //Animations

  const homeHeaderLoad = function () {
    //get elements
    const section = document.querySelector(HEADER_SECTION);
    const wrap = document.querySelector(HEADER_WRAP);
    const h1 = document.querySelector(HEADER_H1);
    const p = document.querySelector(HEADER_P);
    const logosWrap = document.querySelector(HEADER_LOGOS_WRAP);
    const form = document.querySelector(HEADER_FORM);

    const angles = gsap.utils.toArray(HEADER_ANGLE);
    const imageWraps = gsap.utils.toArray(HEADER_IMAGE_WRAP);
    const images = gsap.utils.toArray(HEADER_IMAGE);
    const circleTexts = gsap.utils.toArray(HEADER_CIRCLE_TEXT);

    let includeCircleText = attr(false, wrap.getAttribute('data-circle-text'));

    if (!section) return;
    // split h1 and paragraph
    const h1Text = runSplit(h1);
    const pText = runSplit(p);
    //timeline
    const tl = gsap.timeline({
      delay: 0.1,
      defaults: {
        duration: 0.8,
        ease: 'power1.out',
      },
      onComplete: () => {
        h1Text.revert();
        pText.revert();
      },
    });
    tl.set(section, { opacity: 1 });
    //if window is less than 300px scrolled animate the angles
    if (window.scrollY <= '200') {
      tl.fromTo(
        angles,
        {
          y: '50%',
        },
        {
          y: '0%',
          stagger: { each: 0.1, from: 'start' },
        }
      );
    }
    tl.fromTo(
      logosWrap,
      {
        y: '110%',
        opacity: 0,
      },
      {
        y: '0%',
        opacity: 1,
      },
      '<'
    );
    tl.fromTo(
      h1Text.words,
      {
        opacity: 0,
        rotateZ: -3,
        y: '2rem',
      },
      {
        opacity: 1,
        rotateZ: 0,
        y: '0rem',
        stagger: { each: 0.1, from: 'start' },
      },
      '<.4'
    );
    tl.fromTo(
      pText.lines,
      {
        opacity: 0,
        rotateZ: -3,
        y: '2rem',
      },
      {
        opacity: 1,
        y: '0rem',
        rotateZ: 0,
        stagger: { each: 0.1, from: 'start' },
      },
      '<.4'
    );
    tl.fromTo(
      form,
      {
        opacity: 0,
        rotateZ: -3,
        y: '2rem',
      },
      {
        opacity: 1,
        rotateZ: 0,
        y: '0rem',
      },
      '<.4'
    );
    tl.fromTo(
      imageWraps,
      {
        scale: 0.5,
        opacity: 0,
        rotateZ: gsap.utils.random(-15, 15, 5),
      },
      {
        scale: 1,
        opacity: 1,
        rotateZ: 0,
        duration: 1,
        stagger: { each: 0.1, from: 'start' },
      },
      '<'
    );
    if (includeCircleText === true) {
      tl.fromTo(
        circleTexts,
        {
          scale: 0.75,
          opacity: 0,
          rotateZ: gsap.utils.random(-20, 20, 20),
        },
        {
          scale: 1,
          opacity: 1,
          rotateZ: 0,
          duration: 1,
          stagger: { each: 0.1, from: 'start' },
        },
        '<'
      );
    }
  };

  const homeHeaderScroll = function () {
    //get elements
    const wrap = document.querySelector(HEADER_WRAP);
    const angles = gsap.utils.toArray(HEADER_ANGLE_WRAP);
    const images = gsap.utils.toArray(HEADER_IMAGE);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: 'center 90%',
        end: 'bottom top',
        ease: 'none',
        scrub: 0.5,
      },
      defaults: {
        duration: 1,
        ease: 'none',
      },
    });
    tl.fromTo(
      angles[0],
      {
        y: '0%',
      },
      {
        y: '-10%',
      },
      '<'
    );
    tl.fromTo(
      angles[1],
      {
        y: '0%',
      },
      {
        y: '5%',
      },
      '<'
    );
    tl.fromTo(
      angles[2],
      {
        y: '0%',
      },
      {
        y: '10%',
      },
      '<'
    );
    images.forEach((image) => {
      tl.fromTo(
        image,
        {
          y: '0%',
          rotateZ: 0,
        },
        {
          rotateZ: gsap.utils.random(-20, 20, 10),
          y: `${gsap.utils.random(-20, 20, 10)}%`,
          // stagger: { each: 0.1, from: 'start' },
        },
        '<'
      );
    });
  };

  //////////////////////////////
  //Control Functions on page load
  const gsapInit = function () {
    let mm = gsap.matchMedia();
    mm.add(
      {
        //This is the conditions object
        isMobile: '(max-width: 767px)',
        isTablet: '(min-width: 768px)  and (max-width: 991px)',
        isDesktop: '(min-width: 992px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        let { isMobile, isTablet, isDesktop, reduceMotion } = context.conditions;
        // run animation functions
        homeHeaderLoad();
        homeHeaderScroll();
      }
    );
  };
  gsapInit();
});
