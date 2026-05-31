const { useEffect: useEffectA } = React;

function App() {
  useEffectA(() => {
    try {
      const saved = localStorage.getItem('pv2-theme');
      if (saved === 'dark' || saved === 'light') {
        document.documentElement.setAttribute('data-theme', saved);
      }
    } catch (e) {}
  }, []);

  useReveal();

  return (
    <>
      <a className="skip-link" href="#main">Zum Inhalt springen</a>
      <HeroIntroOverlay />
      <CursorRing enabled={true} />
      <Topbar onToggleTheme={(el) => toggleTheme(el)} />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Languages />
        <References />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
