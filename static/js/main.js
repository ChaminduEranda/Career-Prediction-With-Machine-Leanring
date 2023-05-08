/**
* Template Name: Regna - v4.10.0
* Template URL: https://bootstrapmade.com/regna-bootstrap-onepage-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()
/*
  SignIn modal
*/
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/*
  questions.html
*/
// Get the personality from user
function userPersonality() {
  var userInputPersonality = document.getElementById("userInputPersonality");
  assign_var = userInputPersonality.options[userInputPersonality.selectedIndex].text;

  if (assign_var == 'ENFP') {
    document.getElementById("personality").value = 0
    p = 0
  } else if (assign_var == 'ENTJ') {
    document.getElementById("personality").value = 1
    p = 1
  } else if (assign_var == 'ENTP') {
    document.getElementById("personality").value = 2
    p = 2
  } else if (assign_var == 'ESTJ') {
    document.getElementById("personality").value = 3
    p = 3
  } else if (assign_var == 'INFP') {
    document.getElementById("personality").value = 4
    p = 4
  } else if (assign_var == 'INTJ') {
    document.getElementById("personality").value = 5
    p = 5
  } else if (assign_var == 'INTP') {
    document.getElementById("personality").value = 6
    p = 6
  } else if (assign_var == 'ISTJ') {
    document.getElementById("personality").value = 7
    p = 7
  } else {
    document.getElementById("personality").value = 8
    p = 8
  }

  return p
  //document.getElementById("personality").value = userInputPersonality.options[userInputPersonality.selectedIndex].text;  
}

// Get the skill from user
function userSkill() {
  var userInputSkill = document.getElementById("userInputSkill");
  assign_var2 = userInputSkill.options[userInputSkill.selectedIndex].text;

  if (assign_var2 == 'Analytical Thinking') {
    document.getElementById("skill").value = 0
    s = 0
  } else if (assign_var2 == 'Attention to Detail') {
    document.getElementById("skill").value = 1
    s = 1
  } else if (assign_var2 == 'Creativity') {
    document.getElementById("skill").value = 2
    s = 2
  } else if (assign_var2 == 'Innovation') {
    document.getElementById("skill").value = 3
    s = 3
  } else if (assign_var2 == 'Problem Solving') {
    document.getElementById("skill").value = 4
    s = 4
  } else if (assign_var2 == 'Statistical Analysis') {
    document.getElementById("skill").value = 5
    s = 5
  } else if (assign_var2 == 'Strategic Planning') {
    document.getElementById("skill").value = 6
    s = 6
  } else if (assign_var2 == 'Technical Knowledge') {
    document.getElementById("skill").value = 7
    s = 7
  } else if (assign_var2 == 'Time Management') {
    document.getElementById("skill").value = 8
    s = 8
  } else {
    document.getElementById("skill").value = 9
    s = 9
  }

  return s
}    

function myfunction() {
  s = userSkill()
  p = userPersonality()
  sp = [p,s]
  sp = JSON.stringify(sp);
  console.log(sp)
  $.ajax({
    url: "/predict",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(sp)
  });
}
