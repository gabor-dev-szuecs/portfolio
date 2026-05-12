// pv2-app.jsx — Root component

const { useState: useStateA, useEffect: useEffectA } = React;

function App() {
  // Restore theme from storage
  useEffectA(() => {
    try {
      const saved = localStorage.getItem('pv2-theme');
      if (saved === 'dark' || saved === 'light') {
        document.documentElement.setAttribute('data-theme', saved);
      }
    } catch (e) {}
  }, []);

  useReveal();

  const [tweaks, setTweaks] = useStateA(() => window.__pv2_tweaks || { cursorRing: true });
  useEffectA(() => {
    const handler = (e) => setTweaks(e.detail);
    window.addEventListener('pv2-tweaks-changed', handler);
    return () => window.removeEventListener('pv2-tweaks-changed', handler);
  }, []);

  return (
    <>
      <CursorRing enabled={!!tweaks.cursorRing} />
      <Topbar onToggleTheme={(el) => toggleTheme(el)} />
      <Hero />
      <About />
      <Projects />
      <Stack />
      <Languages />
      <References />
      <Contact />
      <Footer />
      <PortfolioTweaks />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
