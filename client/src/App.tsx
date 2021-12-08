import React from 'react';
import './App.css';
import { Nav } from './components/Nav/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Articles } from './pages/Articles';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { ArticlesPlan } from './pages/ArticlesPlan';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<ProtectedRoute />}>
          <Route path="/articles" element={<Articles />} />
        </Route>
        <Route path="/article-plans" element={<ProtectedRoute />}>
          <Route path="/article-plans" element={<ArticlesPlan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
