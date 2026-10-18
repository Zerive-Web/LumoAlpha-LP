(() => {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const D = (v) => (REDUCED ? Math.min(v, 0.01) : v);

  /* ---------- Progress rail ---------- */
  const progressFill = document.getElementById('progressFill');
  const progressBall = document.getElementById('progressBall');
  ScrollTrigger.create({
    start: 0,
    end: () => document.documentElement.scrollHeight - window.innerHeight,
    onUpdate: (self) => {
      const pct = self.progress * 100;
      progressFill.style.width = pct + '%';
      progressBall.style.left = pct + '%';
    }
  });

  /* ---------- Smooth-scroll for internal links ---------- */
  document.querySelectorAll('a[href^="#"], [data-target]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const targetSel = el.dataset.target || el.getAttribute('href');
      if (!targetSel || targetSel === '#') return;
      const target = document.querySelector(targetSel);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Generic reveal (eyebrow / title / lead) ---------- */
  document.querySelectorAll('.sec:not(.hero):not(.cta) .eyebrow, .sec:not(.hero):not(.cta) .sec-title, .sec:not(.hero):not(.cta) .sec-lead')
    .forEach((el) => {
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: () => el.classList.add('in'),
      });
    });

  /* ---------- Group stagger reveal helper ---------- */
  function revealGroup(containerSel, itemSel, { stagger = 90, start = 'top 78%' } = {}, onDone) {
    const container = document.querySelector(containerSel);
    if (!container) return;
    const items = container.querySelectorAll(itemSel);
    ScrollTrigger.create({
      trigger: container, start, once: true,
      onEnter() {
        items.forEach((el, i) => {
          setTimeout(() => el.classList.add('in'), REDUCED ? 0 : i * stagger);
        });
        if (onDone) setTimeout(onDone, REDUCED ? 0 : items.length * stagger + 300);
      },
    });
  }

  /* ================= HERO ================= */
  (function heroIntro() {
    const path = document.getElementById('heroPath');
    const ball = document.getElementById('heroBall');
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.to(ball, { opacity: 1, duration: D(0.2) })
      .to(path, { strokeDashoffset: 0, duration: D(1.7) }, '<')
      .to(ball, {
        motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true },
        duration: D(1.7),
      }, '<')
      .to(ball, { opacity: 0, duration: D(0.4) }, '-=0.05')
      .fromTo('#heroEyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: D(0.5) }, '-=0.3')
      .fromTo('#heroTagline', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: D(0.45) }, '-=0.35')
      .fromTo('.hero__copy .line', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: D(0.6), stagger: D(0.12) }, '-=0.15')
      .fromTo('#heroSub', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: D(0.5) }, '-=0.2')
      .fromTo('#heroLead', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: D(0.5) }, '-=0.3')
      .fromTo('#heroActions', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: D(0.5) }, '-=0.35')
      .fromTo('#heroVisual', { opacity: 0, y: 20, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: D(0.65) }, '-=0.45');
  })();

  /* ================= PAIN ================= */
  revealGroup('#painBubbles', '.pain__card', { stagger: 120, start: 'top 75%' }, () => {
    document.getElementById('painResolve').classList.add('in');
  });

  /* ================= ABOUT / BUSINESS FLOW ================= */
  const aboutShowcase = document.getElementById('aboutShowcase');
  if (aboutShowcase) {
    ScrollTrigger.create({
      trigger: aboutShowcase, start: 'top 82%', once: true,
      onEnter: () => aboutShowcase.classList.add('is-in'),
    });
  }
  /* ================= Reason tabs ================= */
  (function reasonTabs() {
    const root = document.querySelector('[data-reason-tabs]');
    if (!root) return;
    const navWrap = root.querySelector('.reason-tabs__nav-wrap');
    const nav = root.querySelector('.reason-tabs__nav');
    const tabs = [...root.querySelectorAll('.reason-tabs__tab')];
    const panes = root.querySelectorAll('[data-reason-pane]');

    function updateNavScroll() {
      if (!navWrap || !nav) return;
      const max = nav.scrollWidth - nav.clientWidth;
      const noScroll = max <= 4;
      navWrap.classList.toggle('is-no-scroll', noScroll);
      navWrap.classList.toggle('is-scroll-start', noScroll || nav.scrollLeft <= 4);
      navWrap.classList.toggle('is-scroll-end', noScroll || nav.scrollLeft >= max - 4);
    }

    function activate(id) {
      tabs.forEach((tab) => {
        const on = tab.dataset.tab === id;
        tab.classList.toggle('is-active', on);
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1;
      });
      panes.forEach((pane) => {
        const on = pane.dataset.reasonPane === id;
        pane.classList.toggle('is-active', on);
        pane.setAttribute('aria-hidden', on ? 'false' : 'true');
        pane.inert = !on;
      });
    }

    root.addEventListener('click', (e) => {
      const tab = e.target.closest('.reason-tabs__tab');
      if (!tab || !root.contains(tab)) return;
      activate(tab.dataset.tab);
      tab.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: REDUCED ? 'auto' : 'smooth' });
    });
    tabs.forEach((tab, i) => {
      tab.addEventListener('keydown', (e) => {
        const last = tabs.length - 1;
        const next = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i - 1 + tabs.length) % tabs.length, Home: 0, End: last }[e.key];
        if (next === undefined) return;
        e.preventDefault();
        tabs[next].focus();
        activate(tabs[next].dataset.tab);
      });
    });
    if (nav) {
      nav.addEventListener('scroll', updateNavScroll, { passive: true });
      window.addEventListener('resize', updateNavScroll);
      updateNavScroll();
    }
    activate('today');
  })();

  /* ================= Feature scroll (manual) ================= */
  (function featureScroll() {
    const root = document.querySelector('[data-feature-scroll]');
    if (!root) return;
    const viewport = root.querySelector('.feature-scroll__viewport');
    const track = root.querySelector('.feature-scroll__track');
    const cards = track ? track.querySelectorAll('.fcard') : [];
    const prev = root.querySelector('[data-scroll-dir="-1"]');
    const next = root.querySelector('[data-scroll-dir="1"]');
    const progress = document.getElementById('featureScrollProgress');
    if (!viewport || !cards.length) return;

    function update() {
      const max = viewport.scrollWidth - viewport.clientWidth;
      const x = viewport.scrollLeft;
      if (progress) {
        const visible = max > 0 ? viewport.clientWidth / viewport.scrollWidth : 1;
        progress.style.width = `${Math.min(100, (visible + (max > 0 ? (x / max) * (1 - visible) : 0)) * 100)}%`;
      }
      if (prev) prev.disabled = x <= 2;
      if (next) next.disabled = x >= max - 2;
    }

    function step(dir) {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 18;
      viewport.scrollBy({ left: (cards[0].offsetWidth + gap) * dir, behavior: REDUCED ? 'auto' : 'smooth' });
    }
    [prev, next].forEach((btn) => btn && btn.addEventListener('click', () => step(Number(btn.dataset.scrollDir))));
    viewport.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        step(e.key === 'ArrowRight' ? 1 : -1);
      }
    });
    viewport.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  })();

  /* ================= FLOW ================= */
  ScrollTrigger.create({
    trigger: '#flowStepper', start: 'top 70%', once: true,
    onEnter() {
      document.querySelectorAll('.flow__step').forEach((el, i) => {
        setTimeout(() => el.classList.add('in'), REDUCED ? 0 : 200 + i * 180);
      });
    },
  });

  /* ================= FAQ ================= */
  document.querySelectorAll('.faq__item').forEach((item) => {
    const q = item.querySelector('.faq__q');
    const a = item.querySelector('.faq__a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq__item.is-open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
          openItem.querySelector('.faq__a').style.maxHeight = null;
        }
      });
      item.classList.toggle('is-open', !isOpen);
      q.setAttribute('aria-expanded', String(!isOpen));
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
    });
  });

})();
