// pv2-effects.jsx — Cursor ring, reveal hook, magnet hover

const {
  useEffect,
  useRef,
  useState
} = React;
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}
function CursorRing({
  enabled
}) {
  const ref = useRef(null);
  const [overLink, setOverLink] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    let x = -100,
      y = -100,
      tx = -100,
      ty = -100,
      raf;
    const onMove = e => {
      tx = e.clientX;
      ty = e.clientY;
      setVisible(true);
      const t = e.target;
      const linkLike = t.closest && t.closest('a, button, .project, .stack-cat li, .topbar-nav a');
      setOverLink(!!linkLike);
    };
    const onLeave = () => setVisible(false);
    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      if (ref.current) ref.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);
  if (!enabled) return null;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: `cursor-ring ${visible ? 'visible' : ''} ${overLink ? 'over-link' : ''}`,
    "aria-hidden": "true"
  });
}
function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

// Theme toggle with View Transitions wipe from a click origin
function toggleTheme(originEl) {
  const root = document.documentElement;
  const cur = root.getAttribute('data-theme') || 'light';
  const next = cur === 'light' ? 'dark' : 'light';
  const apply = () => root.setAttribute('data-theme', next);
  try {
    localStorage.setItem('pv2-theme', next);
  } catch (e) {}
  if (!document.startViewTransition) {
    apply();
    return;
  }
  // Compute origin for the wipe
  const rect = originEl ? originEl.getBoundingClientRect() : {
    left: window.innerWidth - 40,
    top: 40,
    width: 32,
    height: 32
  };
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const endRadius = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));
  const t = document.startViewTransition(apply);
  t.ready.then(() => {
    document.documentElement.animate({
      clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${endRadius}px at ${cx}px ${cy}px)`]
    }, {
      duration: 520,
      easing: 'cubic-bezier(.2,.7,.2,1)',
      pseudoElement: '::view-transition-new(root)'
    });
  });
}
function MagnetWrap({
  children,
  strength = 0.25
}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = '';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-block',
      transition: 'transform .35s cubic-bezier(.2,.7,.2,1)'
    }
  }, children);
}
Object.assign(window, {
  useReveal,
  CursorRing,
  useScrolled,
  toggleTheme,
  MagnetWrap
});