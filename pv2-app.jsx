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
      <CursorRing enabled={true} />
      <Topbar onToggleTheme={(el) => toggleTheme(el)} />
      <Hero />
      <About />
      <Projects />
      <Stack />
      <Languages />
      <References />
      <Contact />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
