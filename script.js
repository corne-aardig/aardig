function createTextFrame(title = "Developed by aardig", footer = "www.aardig.amsterdam", width = 40) {
  width = Math.max(width, title.length + 4, footer.length + 4);
  
  const topLeft = '╔';
  const topRight = '╗';
  const bottomLeft = '╚';
  const bottomRight = '╝';
  const horizontal = '═';
  const vertical = '║';
  
  let result = topLeft + horizontal.repeat(width - 2) + topRight + '\n';
  
  result += vertical + ' '.repeat(width - 2) + vertical + '\n';
  
  const titlePaddingLeft = Math.floor((width - 2 - title.length) / 2);
  const titlePaddingRight = width - 2 - title.length - titlePaddingLeft;
  result += vertical + ' '.repeat(titlePaddingLeft) + title + ' '.repeat(titlePaddingRight) + vertical + '\n';
  
  const footerPaddingLeft = Math.floor((width - 2 - footer.length) / 2);
  const footerPaddingRight = width - 2 - footer.length - footerPaddingLeft;
  result += vertical + ' '.repeat(footerPaddingLeft) + footer + ' '.repeat(footerPaddingRight) + vertical + '\n';
  
  result += vertical + ' '.repeat(width - 2) + vertical + '\n';
  
  result += bottomLeft + horizontal.repeat(width - 2) + bottomRight;
  
  return result;
}

console.log("%c" + createTextFrame(), "font-family: monospace; white-space: pre;");
// PAGE LOAD TRANSITION ANIMATION
// Controls the smooth page entrance animation
// We'll use a global flag to track when transition is complete
window.pageTransitionComplete = false;

window.addEventListener('load', function () {
  setTimeout(function () {
    const overlay = document.getElementById('page-transition-overlay');
    document.documentElement.classList.remove('js-loading');
    document.body.style.overflow = 'hidden';

    gsap.set('.heading-style-h1', { opacity: 0, y: 50 });
    gsap.set('.flicker-letter', { opacity: 0 });

    // Start logo animation immediately with page transition
    setupInitialStates();
    startAnimation();

    const tl = gsap.timeline({
      onComplete: function () {
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
        document.body.style.overflow = '';

        // Set flag that transition is complete
        window.pageTransitionComplete = true;

        // Trigger custom event that other animations can listen for
        document.dispatchEvent(new CustomEvent('pageTransitionComplete'));

        // Start other animations now (except logo which already started)
        initTextFlicker();
        initMarqueeSlider();
      }
    });

    tl
      .to(overlay, {
        duration: 1.5,
        opacity: 0,
        ease: 'power2.inOut'
      })
      .to('.heading-style-h1', {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'back.out(1.2)'
      }, '-=0.8')
      .to('.flicker-letter', {
        opacity: 1,
        duration: 0.05,
        stagger: 0.04,
        ease: 'none',
        onComplete: function () {
          const flickerLetters = document.querySelectorAll('.flicker-letter');
          flickerLetters.forEach(letter => {
            gsap.to(letter, {
              opacity: 0.7,
              duration: 0.1,
              repeat: 3,
              yoyo: true,
              ease: 'none',
              delay: Math.random() * 1
            });
          });
        }
      }, '-=0.7')
  }, 100);
});

// PAGE EXIT TRANSITIONS
// Manages smooth transitions between pages
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a').forEach(link => {
    if (link.hasAttribute('data-modal-toggle') || link.getAttribute('href') === '#') {
      return;
    }

    link.addEventListener('click', function (e) {
      if (this.hostname === window.location.hostname && !this.hasAttribute(
          'data-modal-toggle')) {
        e.preventDefault();
        const href = this.getAttribute('href');

        if (href === '#' || href === '') {
          return;
        }

        const overlay = document.createElement('div');
        overlay.id = 'page-transition-overlay';
        overlay.style.opacity = 0;
        document.body.appendChild(overlay);

        const exitTl = gsap.timeline({
          onComplete: function () {
            window.location = href;
          }
        });

        exitTl
          .to('.heading-style-h1', { duration: 0.5, opacity: 0, y: -50 })
          .to('.led-wrapper', { duration: 0.5, opacity: 0 }, '-=0.4')
          .to(overlay, { duration: 0.7, opacity: 1, ease: 'power2.inOut' }, '-=0.5');
      }
    });
  });
});

// ANCHOR LINK HANDLING AND MOBILE NAVIGATION
// Handles smooth scrolling and responsive menu
document.addEventListener('DOMContentLoaded', function () {
  function handleUrlHash() {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(function () {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }

  handleUrlHash();
  window.addEventListener('hashchange', handleUrlHash);

  const menuToggle = document.querySelector('.menu-toggle');
  const menuToggleText = document.querySelector('.menu-toggle .text-block');
  const logoEmbed = document.querySelector('.logo-embed');
  const navbarLinkWrapper = document.querySelector('.navbar_link-wrapper');
  const navLinks = document.querySelectorAll('.navbar_link');

  function initNavbar() {
    if (window.innerWidth <= 991) {
      gsap.set(navbarLinkWrapper, { left: '-100%' });
      gsap.set(navLinks, { opacity: 0, y: 20 });
      gsap.set(menuToggleText, { color: 'black' });
      gsap.set(logoEmbed, { color: 'black' });
    } else {
      gsap.set(navbarLinkWrapper, { left: '0' });
      gsap.set(navLinks, { opacity: 1, y: 0 });
    }
  }

  initNavbar();

  function closeMenuAndScroll(targetId) {
    gsap.to(navbarLinkWrapper, { left: '-100%', duration: 0.5, ease: 'power2.in' });
    gsap.to(menuToggleText, { color: 'black', duration: 0.3 });
    gsap.to(logoEmbed, { color: 'black', duration: 0.3 });
    gsap.to(navLinks, { opacity: 0, y: 20, duration: 0.2, stagger: 0.05, ease: "power1.in" });
    menuOpen = false;
    document.body.style.overflow = '';

    setTimeout(function () {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600);
  }

  let menuOpen = false;
  menuToggle.addEventListener('click', function (e) {
    e.preventDefault();
    if (window.innerWidth <= 991) {
      if (!menuOpen) {
        gsap.to(navbarLinkWrapper, { left: '0%', duration: 0.5, ease: 'power2.out' });
        gsap.to(menuToggleText, { color: 'white', duration: 0.3 });
        gsap.to(logoEmbed, { color: 'white', duration: 0.3 });
        gsap.to(navLinks, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: "back.out(1.7)",
          delay: 0.2
        });
        menuOpen = true;
        document.body.style.overflow = 'hidden';
      } else {
        gsap.to(navbarLinkWrapper, { left: '-100%', duration: 0.5, ease: 'power2.in' });
        gsap.to(menuToggleText, { color: 'black', duration: 0.3 });
        gsap.to(logoEmbed, { color: 'black', duration: 0.3 });
        gsap.to(navLinks, {
          opacity: 0,
          y: 20,
          duration: 0.2,
          stagger: 0.05,
          ease: "power1.in"
        });
        menuOpen = false;
        document.body.style.overflow = '';
      }
    }
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 991) {
        const href = this.getAttribute('href');

        if (href && href.includes('#')) {
          if (href.startsWith('/') && href.includes('#')) {
            if (menuOpen) {
              gsap.to(navbarLinkWrapper, {
                left: '-100%',
                duration: 0.5,
                ease: 'power2.in'
              });
              gsap.to(menuToggleText, { color: 'black', duration: 0.3 });
              gsap.to(logoEmbed, { color: 'black', duration: 0.3 });
              gsap.to(navLinks, {
                opacity: 0,
                y: 20,
                duration: 0.2,
                stagger: 0.05,
                ease: "power1.in"
              });
              menuOpen = false;
              document.body.style.overflow = '';
            }
            return;
          }

          e.preventDefault();

          let targetId;
          if (href.startsWith('#')) {
            targetId = href;
          } else if (href.includes('#')) {
            targetId = '#' + href.split('#')[1];
          }

          if (targetId) {
            if (menuOpen) {
              closeMenuAndScroll(targetId);
            } else {
              const targetElement = document.querySelector(targetId);
              if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }
        }
      }
    });
  });

  window.addEventListener('resize', function () {
    const wasMobile = window.innerWidth <= 991;
    initNavbar();
    if (window.innerWidth > 991 && menuOpen) {
      menuOpen = false;
      gsap.to(menuToggleText, { color: 'black', duration: 0.3 });
      gsap.to(logoEmbed, { color: 'black', duration: 0.3 });
      if (wasMobile) {
        gsap.to(navLinks, { opacity: 1, y: 0, duration: 0.3 });
      }
      document.body.style.overflow = '';
    }
  });
});

// LOGO ANIMATION
window.addEventListener('load', function () {
  // Vertraging voor page transition
  setTimeout(function () {
    console.log("Logo animatie starten");
    initLogoAnimation();
  }, 500);
});

function initLogoAnimation() {
  // Eerst alles instellen
  setupInitialStates();

  // Vertraging toevoegen voor betere zichtbaarheid van de I's die naar buiten staan
  setTimeout(function () {
    // Dan de animatie starten
    startAnimation();
  }, 100); // Korte vertraging zodat de I's zichtbaar zijn voordat ze terugglijden
}

function setupInitialStates() {
  console.log("Setup initial states");

  // Verberg eerst alle niet-I letters
  gsap.set('.logo-embed path:not(.strip-i)', { opacity: 0 });

  // Loop door alle logo's
  const logoElements = document.querySelectorAll('.logo-embed');

  logoElements.forEach(logo => {
    const stripIPaths = logo.querySelectorAll('.strip-i');

    if (stripIPaths.length >= 2) {
      const leftI = stripIPaths[1]; // Meestal de tweede I in het SVG
      const rightI = stripIPaths[0]; // Meestal de eerste I in het SVG

      // Stel de I's in op de buiten-positie
      gsap.set(leftI, { opacity: 1, x: 75, transformOrigin: "center center" });
      gsap.set(rightI, { opacity: 1, x: -75, transformOrigin: "center center" });
    }
  });
}

function startAnimation() {
  console.log("Start animation");
  const master = gsap.timeline();

  // Loop door elk logo afzonderlijk
  const logoElements = document.querySelectorAll('.logo-embed');

  logoElements.forEach(logo => {
    const isDesktop = logo.closest('.desktop') !== null;
    console.log(`Animatie starten voor ${isDesktop ? 'desktop' : 'mobiel'} logo`);

    const stripIPaths = logo.querySelectorAll('.strip-i');
    const otherPaths = logo.querySelectorAll('path:not(.strip-i)');

    // Alleen doorgaan als we beide I's hebben
    if (stripIPaths.length >= 2) {
      const leftI = stripIPaths[1]; // Tweede I in svg is de linker I
      const rightI = stripIPaths[0]; // Eerste I in svg is de rechter I

      // Stap 1: De I's terug naar het midden animeren
      const moveIsTl = gsap.timeline();
      moveIsTl.to(leftI, { x: 0, duration: 1, ease: "power2.inOut" });
      moveIsTl.to(rightI, { x: 0, duration: 1, ease: "power2.inOut" }, "<");
      master.add(moveIsTl);

      // Stap 2: Pas daarna de andere letters animeren
      // (dus niet al in de setupInitialStates zoals in de oude code)

      // Verdeel paden in inner en outer
      const innerPaths = [];
      const outerPaths = [];

      otherPaths.forEach(path => {
        try {
          const box = path.getBBox();
          const midX = box.x + box.width / 2;
          if (midX > 140 && midX < 260) {
            innerPaths.push(path);
          } else {
            outerPaths.push(path);
          }
        } catch (e) {
          console.warn("Kon BBox niet berekenen voor pad");
        }
      });

      // Animatie voor inner paden - start alleen nadat de I's terug zijn
      const innerTl = gsap.timeline();
      innerPaths.forEach((path, index) => {
        innerTl.to(path, { opacity: 0.4, duration: 0.05 }, index * 0.1);
        innerTl.to(path, { opacity: 0.1, duration: 0.05 }, ">");
        innerTl.to(path, { opacity: 0.7, duration: 0.05 }, ">");
        innerTl.to(path, { opacity: 0.2, duration: 0.03 }, ">");
        innerTl.to(path, { opacity: 1, duration: 0.07 }, ">");
      });

      // Animatie voor outer paden - start alleen nadat de I's terug zijn
      const outerTl = gsap.timeline();
      outerPaths.forEach(path => {
        const box = path.getBBox();
        const midX = box.x + box.width / 2;
        if (midX < 140) {
          gsap.set(path, { opacity: 0, x: -30 });
        } else {
          gsap.set(path, { opacity: 0, x: 30 });
        }
      });

      outerPaths.forEach((path, index) => {
        outerTl.to(path, { opacity: 0.3, x: 0, duration: 0.05 }, index * 0.08);
        outerTl.to(path, { opacity: 0.1, duration: 0.03 }, ">");
        outerTl.to(path, { opacity: 0.6, duration: 0.05 }, ">");
        outerTl.to(path, { opacity: 0.3, duration: 0.04 }, ">");
        outerTl.to(path, { opacity: 0.8, duration: 0.05 }, ">");
        outerTl.to(path, { opacity: 1, duration: 0.07 }, ">");
      });

      // Voeg de inner en outer animaties toe aan de master tijdlijn,
      // maar pas nadat de I's zijn geanimeerd
      master.add(innerTl, "-=0.3");
      master.add(outerTl, "-=0.7");

      // Laatste flikkering effect
      master.to(logo.querySelectorAll('path'), {
        opacity: 0.6,
        duration: 0.05,
        stagger: { each: 0.01, from: "center" }
      }, "+=0.1");

      master.to(logo.querySelectorAll('path'), {
        opacity: 1,
        duration: 0.1,
        stagger: { each: 0.005, from: "center" }
      }, ">");
    }
  });

  return master;
}

// SCROLL CONTROL UTILITY
// Helper functions to control page scrolling
const scroll = {
  stop: function () {
    scroll.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    $('body').css({
      'overflow': 'hidden',
      'position': 'fixed',
      'top': -scroll.scrollPosition + 'px',
      'width': '100%'
    });
    $('.modal-scroll').css('overflow-y', 'auto');
  },
  start: function () {
    $('body').css({
      'overflow': '',
      'position': '',
      'top': '',
      'width': ''
    });
    window.scrollTo(0, scroll.scrollPosition);
  },
  scrollPosition: 0
};

// MODAL SYSTEM
// Handles modal dialogs with animations
function initModals() {
  $('.modal').each(function () {
    const $modal = $(this);
    const $modalContent = $modal.find('.modal-scroll');
    $modal.css('display', 'block');
    gsap.set($modalContent, { y: '100%', opacity: 0, force3D: true });
    gsap.set($modal.find('.modal__dark, .modal__blur'), { opacity: 0 });
    $modal.css('display', 'none');
  });
}

function openModal($modal) {
  const $modalContent = $modal.find('.modal-scroll');
  const $backdrop = $modal.find('.modal__dark, .modal__blur');
  $modal.attr('data-modal-status', 'active');
  $modal.css('display', 'block');
  scroll.stop();
  gsap.to($backdrop, { opacity: 1, duration: 0.25, ease: 'power1.out' });
  gsap.to($modalContent, { y: '0%', opacity: 1, duration: 0.25, ease: 'sine.out', delay: 0.05 });
  $modal.find('.modal-scroll').removeAttr('data-lenis-prevent');
  console.log('Modal opened with animation');
}

function closeModal($modal) {
  if ($modal.attr('data-modal-status') != 'active') return;

  gsap.killTweensOf($modal.find('.modal-scroll'));
  gsap.killTweensOf($modal.find('.modal__dark, .modal__blur'));

  const $modalContent = $modal.find('.modal-scroll');
  const $backdrop = $modal.find('.modal__dark, .modal__blur');

  gsap.to($modalContent, { y: '100%', opacity: 0, duration: 0.25, ease: 'sine.in' });
  gsap.to($backdrop, { opacity: 0, duration: 0.25, ease: 'power1.in', delay: 0.05 });

  setTimeout(function () {
    $modal.attr('data-modal-status', 'not-active');
    $modal.css('display', 'none');
    scroll.start();
  }, 300);

  console.log('Modal closed with animation');
}

$(document).ready(function () {
  console.log('Initializing modals...');
  initModals();

  $('[data-modal-toggle="toggle"]').click(function (e) {
    e.preventDefault();
    const $item = $(this).closest('.agenda_item');
    const $modal = $item.find('.modal');

    console.log('Toggle clicked, modal found:', $modal.length > 0);

    if ($modal.attr('data-modal-status') == 'not-active' || !$modal.attr(
        'data-modal-status')) {
      openModal($modal);
    } else {
      closeModal($modal);
    }
  });

  $('[data-modal-toggle="close"]').click(function (e) {
    e.preventDefault();
    const $modal = $(this).closest('.modal');
    closeModal($modal);
  });

  $(document).keydown(function (e) {
    if (e.keyCode == 27) {
      const $activeModal = $('.modal[data-modal-status="active"]');
      if ($activeModal.length) {
        closeModal($activeModal);
      }
    }
  });
});

// SMOOTH SCROLLING WITH LENIS
// Smooth scrolling implementation
let lenis;

// Initialize Lenis after page transition or immediately if already completed
function initLenis() {
  lenis = new Lenis({
    duration: 1,
    lerp: 0.17,
    wheelMultiplier: 1.25,
    normalizeWheel: false,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// Start Lenis immediately but with minimal settings
document.addEventListener('DOMContentLoaded', function () {
  // Always initialize Lenis, but we'll enable smooth scrolling later
  initLenis();

  // Listen for page transition completion
  document.addEventListener('pageTransitionComplete', function () {
    // Re-init with full settings if needed or just ensure it's running
    if (!lenis) {
      initLenis();
    }
  });
});

$("[data-lenis-start]").on("click", function () {
  lenis.start();
});
$("[data-lenis-stop]").on("click", function () {
  lenis.stop();
});
$("[data-lenis-toggle]").on("click", function () {
  $(this).toggleClass("stop-scroll");
  if ($(this).hasClass("stop-scroll")) {
    lenis.stop();
  } else {
    lenis.start();
  }
});

// TEXT FLICKERING EFFECT
// Creates a subtle flickering effect on text elements
function initTextFlicker() {
  addFlickerStyles();

  const flickerElements = document.querySelectorAll('[data-flicker]');

  flickerElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';

    [...text].forEach(letter => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.classList.add('flicker-letter');
      if (letter !== ' ') {
        span.dataset.flickerLetter = 'true';
      }
      element.appendChild(span);
    });

    startRandomFlicker(element);
  });
}

function startRandomFlicker(element) {
  const letters = element.querySelectorAll('[data-flicker-letter]');
  letters.forEach(letter => {
    scheduleNextFlicker(letter);
  });
}

function scheduleNextFlicker(letter) {
  const randomDelay = 20000 + Math.random() * 100000;
  setTimeout(() => {
    flickerLetter(letter);
    scheduleNextFlicker(letter);
  }, randomDelay);
}

function flickerLetter(letter) {
  const flickerCount = 1 + Math.floor(Math.random() * 3);
  const timeline = gsap.timeline();

  for (let i = 0; i < flickerCount; i++) {
    const opacity = 0.1 + Math.random() * 0.6;
    const duration = 0.05 + Math.random() * 0.1;

    timeline.to(letter, { opacity: opacity, duration: duration });
    timeline.to(letter, { opacity: 1, duration: duration * 1.5 });

    if (i < flickerCount - 1) {
      timeline.to(letter, { opacity: 1, duration: 0.1 + Math.random() * 0.2 });
    }
  }

  return timeline;
}

function addFlickerStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .flicker-letter {
      display: inline-block;
      transition: opacity 0.05s ease;
    }
  `;
  document.head.appendChild(style);
}

// Initialize on DOM load for structure setup, but don't start flicker effect yet
document.addEventListener('DOMContentLoaded', () => {
  addFlickerStyles();
  // Text flickering will be initialized after page transition completes
});

// MARQUEE SLIDER
// Infinite horizontal scrolling slider
function initMarqueeSlider() {
  const sliderTrack = document.querySelector('[data-slider="list"]');
  if (!sliderTrack) return;

  let originalSlides = [];
  let totalSlideWidth = 0;
  let slideWidth = 0;
  let lastScrollPos = 0;
  let scrollDirection = 'none';
  let autoScrolling = true;
  let isScrolling = false;
  let scrollVelocity = 0;

  function setupInfiniteLoop() {
    originalSlides = Array.from(sliderTrack.querySelectorAll('[data-slider="slide"]'));
    if (originalSlides.length === 0) return;

    slideWidth = originalSlides[0].offsetWidth +
      parseInt(getComputedStyle(originalSlides[0]).marginLeft || 0) +
      parseInt(getComputedStyle(originalSlides[0]).marginRight || 0);

    if (isNaN(slideWidth)) {
      slideWidth = originalSlides[0].offsetWidth;
    }

    totalSlideWidth = slideWidth * originalSlides.length;

    const slidesClones = originalSlides.map(slide => slide.cloneNode(true));

    slidesClones.forEach(clone => {
      sliderTrack.appendChild(clone);
    });

    const secondSetClones = originalSlides.map(slide => slide.cloneNode(true));
    secondSetClones.forEach(clone => {
      sliderTrack.appendChild(clone);
    });

    gsap.set(sliderTrack, { x: -totalSlideWidth });
  }

  function handleLenisScroll(e) {
    const currentScrollPos = e.scroll;
    const velocity = e.velocity;
    scrollVelocity = velocity;

    if (currentScrollPos > lastScrollPos) {
      scrollDirection = 'down';
    } else if (currentScrollPos < lastScrollPos) {
      scrollDirection = 'up';
    }

    lastScrollPos = currentScrollPos;
    isScrolling = true;
    autoScrolling = false;

    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
      autoScrolling = true;
    }, 1);
  }

  function updateAnimation() {
    if (totalSlideWidth === 0) return;

    if (isScrolling) {
      let xPos = gsap.getProperty(sliderTrack, 'x');
      const baseSpeed = 2;
      const moveAmount = baseSpeed + (Math.abs(scrollVelocity) * 3);

      if (scrollDirection === 'down') {
        xPos -= moveAmount;
      } else if (scrollDirection === 'up') {
        xPos += moveAmount;
      }

      if (xPos <= -totalSlideWidth * 2) {
        xPos = -totalSlideWidth;
      } else if (xPos >= 0) {
        xPos = -totalSlideWidth;
      }

      gsap.set(sliderTrack, { x: xPos });
      isScrolling = false;
    }
    else if (autoScrolling) {
      let xPos = gsap.getProperty(sliderTrack, 'x');
      xPos -= 0.5;

      if (xPos <= -totalSlideWidth * 2) {
        xPos = -totalSlideWidth;
      }

      gsap.set(sliderTrack, { x: xPos });
    }

    requestAnimationFrame(updateAnimation);
  }

  function addSlide(slideContent, date, title) {
    if (originalSlides.length < 10) {
      const newSlide = document.createElement('div');
      newSlide.setAttribute('data-slider', 'slide');
      newSlide.className = 'slider-slide is-image-slider';

      newSlide.innerHTML = `
            <div class="image-slider_item-wrapper">
              <div class="image-slider_image-wraper">
                <img src="${slideContent}" loading="lazy" sizes="100vw" alt="" class="image-slider_image">
              </div>
              <div class="content-wrapper">
                <div class="heading-style-h4">${date}</div>
                <div class="heading-style-h4">${title}</div>
              </div>
            </div>
          `;

      sliderTrack.appendChild(newSlide);
      const allSlides = Array.from(sliderTrack.querySelectorAll('[data-slider="slide"]'));
      const originalCount = originalSlides.length;

      for (let i = originalCount; i < allSlides.length; i++) {
        allSlides[i].remove();
      }

      originalSlides = Array.from(sliderTrack.querySelectorAll('[data-slider="slide"]'));
      setupInfiniteLoop();
    }
  }

  window.addMarqueeSlide = addSlide;
  setupInfiniteLoop();

  setTimeout(() => {
    if (window.lenis) {
      window.lenis.on('scroll', handleLenisScroll);
      console.log('Marquee slider connected to Lenis');
    } else {
      console.log('Lenis not found, using standard scroll events');
      window.addEventListener('scroll', function () {
        const currentScrollPos = window.scrollY;

        if (currentScrollPos > lastScrollPos) {
          scrollDirection = 'down';
        } else if (currentScrollPos < lastScrollPos) {
          scrollDirection = 'up';
        }

        lastScrollPos = currentScrollPos;
        isScrolling = true;
        scrollVelocity = 1;
        autoScrolling = false;

        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
          autoScrolling = true;
        }, 1);
      });
    }
  }, 1);

  window.addEventListener('resize', () => {
    const firstSlide = sliderTrack.querySelector('[data-slider="slide"]');
    if (firstSlide) {
      slideWidth = firstSlide.offsetWidth +
        parseInt(getComputedStyle(firstSlide).marginLeft || 0) +
        parseInt(getComputedStyle(firstSlide).marginRight || 0);

      if (isNaN(slideWidth)) {
        slideWidth = firstSlide.offsetWidth;
      }

      totalSlideWidth = slideWidth * originalSlides.length;
    }
  });

  updateAnimation();
}

// Setup marquee on DOMContentLoaded but wait to initialize until page transition is complete
document.addEventListener('DOMContentLoaded', function () {
  // We'll initialize marquee slider after page transition completes
  // This will just check if page transition is already complete (direct page load)
  if (window.pageTransitionComplete) {
    initMarqueeSlider();
  }
});
