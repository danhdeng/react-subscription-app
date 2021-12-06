import React from 'react';
import './App.css';
import { Nav } from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Hero} from './components/Hero/Hero';

function App() {
  return (
    <div>
      <Nav />
      <Hero />
    </div>
  );
}

export default App;
