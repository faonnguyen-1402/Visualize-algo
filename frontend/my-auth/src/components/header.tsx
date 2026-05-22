import "../pages/home/mainapp.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import i18n from '../i18n'; // Đường dẫn tới file i18n.ts của bạn
import { i18n as I18nType } from 'i18next';


const Header = () => {

  const { t } = useTranslation();
  const toggleLanguage = () => {
    const i18nInstance = i18n as any; // Ép kiểu để gọi hàm
    const newLang = i18nInstance.language === 'en' ? 'vi' : 'en';
    i18nInstance.changeLanguage(newLang); 
    localStorage.setItem('lang', newLang);
  };

  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  const checkAuth = () =>{
    const storedUser = localStorage.getItem('user');
    if(storedUser){
      try{
        setUser(JSON.parse(storedUser));
      }catch(e){
        console.error('Error parse data user: ', e);
        setUser(null);
      }
    }else{
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener('authChange', checkAuth);
    return () =>{
      window.removeEventListener('authChange', checkAuth);
    }
  }, []);

  const handleLogout = () =>{
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    window.dispatchEvent(new Event('authChange'));

    navigate('/home');
  };
const currentLanguage = (i18n as any).language;
  return (
    <header className="header">
      <nav className="navbar">
        <Link to='/home' className="logo-section">
          VizAlgo
          <span className="logo-subtitle">Visualizer Algorithm</span>
        </Link>

        <ul className='nav-links'>
          <li>
            {/* NavLink sẽ tự động thêm class "active" nếu URL là /home hoặc / */}
            <NavLink to='/home' end className={({ isActive }) => (isActive ? 'active' : '')}>
              {/* Home */}
              {t('nav.home')}
            </NavLink>
          </li>

          <li>
            {/* Tương tự cho /algo */}
            <NavLink to='/algorithms' className={({ isActive }) => (isActive ? 'active' : '')}>
              {/* Algorithms */}
              {t('nav.algo')}
            </NavLink>
          </li>

          <li>
            <NavLink to='/practice' className={({ isActive }) => (isActive ? 'active' : '')}>
              {/* Practice */}
              {t('nav.practice')}
            </NavLink>
          </li>

          {/* <li>
            <NavLink to='/playground' className={({ isActive }) => (isActive ? 'active' : '')}>
              Playground
            </NavLink>
          </li> */}
        </ul>

         {/* RIGHT - ACTIONS */}
        <div className='nav-actions'>

           {/* <button onClick={toggleLanguage} className="lang-btn">
       {currentLanguage === 'en' ? '🇻🇳' : '🇺🇸'}
    </button> */}

          {/* <button className='search-btn'>🔍</button> */}
          <div className="search-bar-container">
            {/* <span className="search-icon">🔍</span> */}
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search algorithms, practices..." 
              className="search-input"
            />
          </div>

          {user ?(
            <div className="user-profile-dropdown">
              <div className="avatar-placeholder" onClick={() => navigate('/profile')}>
                {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
              </div>

              <div className="dropdown-content">
                <div className="dropdown-user-info">
                  <p className="dropdown-username">{user.username}</p>
                  <p className="dropdown-email">{user.email}</p>
                </div>
                <hr className="dropdown-divider" />
                <Link to="/profile" className="dropdown-item">Hồ sơ cá nhân</Link>
                <button onClick={handleLogout} className="dropdown-item btn-logout-text">
                  Sign out
                </button>
              </div>
            </div>
          ):(
            <button className='login-btn' onClick={() => navigate('/login')}>
      {t('nav.login')}
    </button>
          )}
             <button onClick={toggleLanguage} className="lang-btn">
       {currentLanguage === 'en' ? '🇻🇳' : '🇺🇸'}
    </button>
          {/* <button className='login-btn'>Login</button> */}
        </div>

      </nav>
    </header>
  );
};

export default Header;