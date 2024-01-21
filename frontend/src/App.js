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
import home from './assets/home.svg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomeScreen/HomeScreen';
import AccountScreen from './AccountScreen/AccountScreen';
import MangaPage from './MangaPage/MangaPage';
import LoginPage from './LoginScreen/Login';
import RegisterPage from './LoginScreen/Register';

import { Layout, Menu } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

function App() {

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
            <img className='icon' src={home} alt='home'></img>
            <Link to="/" className='sider-text'>Home</Link>
          </Menu.Item>
          <Menu.Item key="account">
            <img className='icon' src={user} alt='user'></img>
            <Link to="/account" className='sider-text'>Profile</Link>
          </Menu.Item>
          <Menu.Item key="read">
            <img className='icon' src={bookopen} alt='read'></img>
            <Link to="/account" className='sider-text'>Read</Link>
          </Menu.Item>
          <Menu.Item key="upload">
            <img className='icon' src={upload} alt='upload'></img>
            <Link to="/translator" className='sider-text'>Upload</Link>
          </Menu.Item>
        </Menu>
        </Sider>
        <Content className='content-box'>
          <div className='content'>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/account" element={<AccountScreen />} />
              <Route path="/translator" element={<MangaPage />} />
              <Route path="/login" component={<LoginPage />} />
              <Route path="/register" component={<RegisterPage />} />
            </Routes>
          </div>
        </Content>
        </Router>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
}

export default App;
