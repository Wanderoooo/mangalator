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

import { Layout, Menu } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [images, setImages] = useState([]);
  const [activeContent, setActiveContent] = useState("home"); 

  const handleImageUpload = event => {
    let files = Array.from(event.target.files);
    setImages(prevImages => [...prevImages, ...files]);
  };
  
  console.log(images);

  return (
    <Layout className='full-height'>
      <Header className='topbar'>
        <img
          loading="lazy"
          src={mangalatorlogo}
          className="aspect-square overlay logo"
          width='97px'
          height='97px'
        />
      </Header>
      <Layout>
        <Router>
        <Sider className='sider'>
        <Menu className='sider'>
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="account">
            <Link to="/account">Account</Link>
          </Menu.Item>
          <Menu.Item key="translator">
            <Link to="/translator">Translator</Link>
          </Menu.Item>
        </Menu>
        </Sider>
        <Content className='content'>
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/translator" element={<MangaPage />} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
            </Routes>
          </div>
        <div className="App">
         <ImageRenderer imgs={images}/>
         <input type="file" accept=".png, .jpg, .jpeg" multiple onChange={handleImageUpload} title="Input files here" placeholder="ohueidjsk" />
        </div>
        </Content>
        </Router>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
}

export default App;
