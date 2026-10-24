import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import BlogIndex from './pages/BlogIndex.jsx';
import BlogPost from './pages/BlogPost.jsx';
import Privacidad from './pages/Privacidad.jsx';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blog" element={<BlogIndex />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="privacidad" element={<Privacidad />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
