import React, { useState } from "react";
import './App.css';
import ImageRenderer from './MangaPage/ImageRenderer';
import mangalatorlogo from './assets/mangalatorlogo.png';
import menu from './assets/menu.svg'
import user from './assets/user.svg'
import upload from './assets/upload.svg'
import search from './assets/search.svg'
import login from './assets/log-in.svg'
import bookopen from './assets/book-open.svg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomeScreen/HomeScreen';
import AccountPage from './AccountScreen/AccountScreen';
import MangaPage from './MangaPage/MangaPage';
import LoginPage from './LoginScreen/Login';
import RegisterPage from './LoginScreen/Register';

function App() {
  const [images, setImages] = useState([]);

  const handleImageUpload = event => {
    let files = Array.from(event.target.files);
    setImages(prevImages => [...prevImages, ...files]);
  };
  

  console.log(images);

  return (
    <>
    <div className="bg-white flex flex-col items-stretch">
      <div className="container topbar">
        <img
          loading="lazy"
          src={menu}
          className="aspect-square overlay menu"
          width='54px'
          height='54px'
          justify='left'
        />
        <img
          loading="lazy"
          src={mangalatorlogo}
          className="aspect-square overlay logo"
          width='97px'
          height='97px'
        />
        <div className="rectangle underlay" />
      </div>
      <div className="absolute inset-0 bg-blue-500 opacity-50 z-0"></div>
      <div className="bg-neutral-300 flex w-[296px] max-w-full flex-col items-stretch self-start">
        <span className="flex justify-between gap-5 px-9 py-8 border-b-stone-400 border-b border-solid items-start max-md:px-5">
         
          <div className="text-black text-3xl">Profile</div>
        </span>
        <span className="flex justify-between gap-5 px-9 py-8 border-b-stone-400 border-b border-solid items-start max-md:px-5">
          <img
            loading="lazy"
            src={user}
            className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
          />
          <div className="text-black text-3xl self-stretch">Read</div>
        </span>
        <span className="flex items-center justify-between gap-5 px-9 py-6 border-b-stone-400 border-b border-solid max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/03a31290361a5f47ac0f41e0c0a9bdbe78b68982fa9848e689d5aa576f59c070?"
            className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full my-auto"
          />
          <div className="text-black text-3xl self-stretch">Upload</div>
        </span>
        <span className="flex items-stretch justify-between gap-5 px-9 py-8 border-b-stone-400 border-b border-solid max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c76459c04e8258ff93e3d756f963ff9366f70f60cfc94a6524871a632621971c?"
            className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
          />
          <div className="text-black text-3xl">Search</div>
        </span>
        <span className="flex justify-between gap-5 mt-[473px] pt-8 pb-5 px-9 border-t-stone-400 border-t border-solid items-start max-md:mt-10 max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/40b025eb622579bbffa84f6c997d90da6968594b2e92e6bf885df4d378254fd3?"
            className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
          />
          <div className="text-black text-3xl">Log in</div>
        </span>
      </div>
    </div>
    <div className="App">
      <ImageRenderer imgs={images}/>
      <input type="file" accept=".png, .jpg, .jpeg" multiple onChange={handleImageUpload} title="Input files here" placeholder="ohueidjsk" />
    </div>
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
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Routes>
    </div>
  </Router>
    </>
  );
}

export default App;
