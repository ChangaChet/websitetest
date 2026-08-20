import { useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initLenis, getLenis } from './lib/lenis';
import Header from './components/Header';
import Footer from './components/Footer';
import BootLoader from './components/BootLoader';
import BookModal from './components/BookModal';
import ScrollProgress from './components/ScrollProgress';
import { BookingProvider } from './lib/booking';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Resort from './pages/Resort';
import Dining from './pages/Dining';
import Packages from './pages/Packages';
import Reviews from './pages/Reviews';
import Faq from './pages/Faq';

gsap.registerPlugin(ScrollTrigger);

/* Jump to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);
  return null;
}

/* Animated route outlet */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/resort" element={<Resort />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    initLenis();
  }, []);

  return (
    <HashRouter>
      <BookingProvider>
        <BootLoader>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <ScrollProgress />
          <ScrollToTop />
          <Header />
          <div id="main">
            <AnimatedRoutes />
          </div>
          <Footer />
          <BookModal />
        </BootLoader>
      </BookingProvider>
    </HashRouter>
  );
}
