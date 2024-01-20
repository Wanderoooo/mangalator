import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import HomePage from './HomeScreen/HomeScreen';
import AccountPage from './AccountScreen/AccountScreen';
import MangaPage from './MangaPage/MangaPage';

function App() {
  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <Link to="/translator">Translator</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/translator" element={<MangaPage />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
