import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastProvider } from './contexts/ToastContext';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/common/ScrollToTop';
import GoogleAnalytics from './components/common/GoogleAnalytics';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Projects = lazy(() => import('./pages/Projects'));
const CustomPackage = lazy(() => import('./pages/CustomPackage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <ToastProvider>
          <Router>
            <ScrollToTop />
            <GoogleAnalytics />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/custom-package" element={<CustomPackage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/privacy-policy/:projectId" element={<PrivacyPolicy />} />
                </Route>
              </Routes>
            </Suspense>
          </Router>
        </ToastProvider>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
