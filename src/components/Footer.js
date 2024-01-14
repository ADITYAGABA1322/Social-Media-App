// InstagramNavbar.js
import React, { useRef, useState } from 'react';
import { FaHome, FaSearch, FaPlusSquare, FaHeart, FaUser } from 'react-icons/fa';

import './Inst.css'; // Import the CSS file for styling
import { Outlet } from 'react-router-dom';
import CreatePost from './CreatePost';

const Footer = () => {
  const [activeTab, setActiveTab] = useState('home');
 
  
  const refOpen = useRef(null);
  const refClose = useRef(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
  
      <nav className="instagram-navbar ">
        <div className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabClick('home')}>
          <FaHome />
        </div>
        <div className={`nav-item ${activeTab === 'add' ? 'active' : ''}`} onClick={() =>{ handleTabClick('add');refOpen.current.click()}}>
          <FaPlusSquare />
        </div>
        <div className={`nav-item ${activeTab === 'likes' ? 'active' : ''}`} onClick={() => handleTabClick('likes')}>
          <FaHeart />
        </div>
        <div className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => handleTabClick('profile')}>
          <FaUser />
        </div>
      </nav>
      <CreatePost refOpen={refOpen} refClose={refClose} handleTabClick={handleTabClick} />
    </div>
  );
};

export default Footer;
