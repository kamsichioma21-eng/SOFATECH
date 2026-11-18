/* =====================================================
   SOFATECH — Portfolio | Chioma Kamsi Victor
   Interactivity: nav, scroll effects, counters, skills,
   portfolio filter, testimonial slider, form validation
   ===================================================== */

(function () {
  'use strict';

  /* ---------- Preloader ---------- */
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => preloader.classList.add('hidden'), 600);
    }
  });

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');

  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    backTop.classList.toggle('show', y > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  const closeMenu = () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
  };

  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navMenu.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', closeMenu)
  );

  /* ---------- Active link on scroll (scrollspy) ---------- */
  const sections = [...document.querySelectorAll('section[id]')];
  const navLinks = [...document.querySelectorAll('.nav-link')];

  const spy = () => {
    const pos = window.scrollY + 120;
    let current = 'home';
    sections.forEach((sec) => {
      if (sec.offsetTop <= pos) current = sec.id;
    });
    navLinks.forEach((l) =>
      l.classList.toggle('active', l.getAttribute('href') === `#${current}`)
    );
  };
  window.addEventListener('scroll', spy, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => io.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const countIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.count;
        const duration = 1600;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + '+';
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countIO.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => countIO.observe(c));

  /* ---------- Animated skill bars ---------- */
  const bars = document.querySelectorAll('.bar span');
  const barIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const span = entry.target;
        span.style.width = span.dataset.width;
        barIO.unobserve(span);
      });
    },
    { threshold: 0.5 }
  );
  bars.forEach((b) => barIO.observe(b));

  /* ---------- Portfolio filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      workCards.forEach((card) => {
        const show = filter === 'all' || card.dataset.cat === filter;
        if (show) {
          card.classList.remove('hide');
          card.style.display = '';
          // re-trigger fade-in
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity .45s, transform .45s';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.transition = 'opacity .3s, transform .3s';
          card.style.opacity = '0';
          card.style.transform = 'scale(.95)';
          setTimeout(() => { card.classList.add('hide'); }, 280);
        }
      });
    });
  });

  /* ---------- Testimonial slider ---------- */
  const quotes = [
    {
      text: "Chioma transformed our brand from invisible to unforgettable. The new identity and website brought us more leads in a month than the previous year.",
      author: 'Amaka Obiora',
      role: 'Founder, Bloom Studio',
      initial: 'A',
    },
    {
      text: "Working with Sofatech felt effortless. The website is fast, beautiful, and exactly what our startup needed. Highly recommended.",
      author: 'David Eze',
      role: 'CEO, Vertex Tech',
      initial: 'D',
    },
    {
      text: "From logo to social templates, every piece was on brand and on time. Chioma has a rare eye for both design and detail.",
      author: 'Grace Adeyemi',
      role: 'Marketing Lead, Aurora Events',
      initial: 'G',
    },
  ];

  const quoteText = document.getElementById('quoteText');
  const quoteAuthor = document.querySelector('.quote-author strong');
  const quoteRole = document.querySelector('.quote-author span');
  const quoteAvatar = document.querySelector('.quote-avatar');
  const dotBtns = document.querySelectorAll('.dot-btn');
  let qIndex = 0;
  let qTimer = null;

  const showQuote = (i) => {
    qIndex = i;
    const q = quotes[i];
    quoteText.style.opacity = '0';
    quoteText.style.transform = 'translateY(10px)';
    setTimeout(() => {
      quoteText.textContent = q.text;
      quoteAuthor.textContent = q.author;
      quoteRole.textContent = q.role;
      quoteAvatar.textContent = q.initial;
      quoteText.style.opacity = '1';
      quoteText.style.transform = 'translateY(0)';
    }, 200);
    dotBtns.forEach((d, idx) => d.classList.toggle('active', idx === i));
  };

  quoteText.style.transition = 'opacity .35s, transform .35s';

  const startTimer = () => { qTimer = setInterval(() => showQuote((qIndex + 1) % quotes.length), 5500); };
  const resetTimer = () => { clearInterval(qTimer); startTimer(); };

  dotBtns.forEach((d) =>
    d.addEventListener('click', () => {
      showQuote(+d.dataset.quote);
      resetTimer();
    })
  );
  startTimer();

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  const validators = {
    name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter a valid email address.'),
    subject: (v) => (v.trim().length >= 3 ? '' : 'Add a short subject.'),
    message: (v) => (v.trim().length >= 10 ? '' : 'Message must be at least 10 characters.'),
  };

  const validateField = (field) => {
    const input = document.getElementById(field);
    const group = input.closest('.form-group');
    const msg = validators[field](input.value);
    group.classList.toggle('invalid', !!msg);
    group.querySelector('.error-msg').textContent = msg;
    return !msg;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = ['name', 'email', 'subject', 'message'];
    let valid = true;
    fields.forEach((f) => { if (!validateField(f)) valid = false; });

    if (valid) {
      formSuccess.classList.add('show');
      form.reset();
      setTimeout(() => formSuccess.classList.remove('show'), 4000);
    }
  });

  // live clear error on input
  Object.keys(validators).forEach((field) => {
    const input = document.getElementById(field);
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group.classList.contains('invalid')) validateField(field);
    });
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Smooth anchor offset (for fixed navbar) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* =====================================================
   Additions: theme toggle + lightbox
   ===================================================== */
(function () {
  'use strict';

  /* ---------- Theme toggle (persisted) ---------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    try { localStorage.setItem('theme', theme); } catch (e) {}
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'light'
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    }
  }

  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  applyTheme(saved === 'light' ? 'light' : 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var isLight = root.getAttribute('data-theme') === 'light';
      applyTheme(isLight ? 'dark' : 'light');
    });
  }

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src) {
    if (!src) return;
    lightboxImg.src = src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(function () { lightboxImg.src = ''; }, 300);
  }

  document.querySelectorAll('.work-thumb').forEach(function (thumb) {
    thumb.style.cursor = 'pointer';
    thumb.addEventListener('click', function () {
      var full = thumb.getAttribute('data-full');
      var img = thumb.querySelector('.work-img');
      openLightbox(full || (img && img.src) || '');
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
})();

/* ---------- Back to top ---------- */
(function () {
  'use strict';
  var backTop = document.getElementById('backTop');
  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
