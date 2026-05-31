const {
  useEffect: useEffectA
} = React;
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
    className: "skip-link",
    href: "#main"
  }, "Zum Inhalt springen"), /*#__PURE__*/React.createElement(HeroIntroOverlay, null), /*#__PURE__*/React.createElement(CursorRing, {
    enabled: true
  }), /*#__PURE__*/React.createElement(Topbar, {
    onToggleTheme: el => toggleTheme(el)
  }), /*#__PURE__*/React.createElement("main", {
    id: "main"
  }, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(Projects, null), /*#__PURE__*/React.createElement(Stack, null), /*#__PURE__*/React.createElement(Languages, null), /*#__PURE__*/React.createElement(References, null), /*#__PURE__*/React.createElement(Contact, null)), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
