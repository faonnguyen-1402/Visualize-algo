import "../pages/home/mainapp.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";

const Header = () => {

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
              Home
            </NavLink>
          </li>

          <li>
            {/* Tương tự cho /algo */}
            <NavLink to='/algorithms' className={({ isActive }) => (isActive ? 'active' : '')}>
              Algorithms
            </NavLink>
          </li>

          <li>
            <NavLink to='/practice' className={({ isActive }) => (isActive ? 'active' : '')}>
              Practice
            </NavLink>
          </li>

          <li>
            <NavLink to='/playground' className={({ isActive }) => (isActive ? 'active' : '')}>
              Playground
            </NavLink>
          </li>
        </ul>

         {/* RIGHT - ACTIONS */}
        <div className='nav-actions'>
          <button className='search-btn'>🔍</button>

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
              Login
            </button>
          )}

          {/* <button className='login-btn'>Login</button> */}
        </div>

      </nav>
    </header>
  );
};

export default Header;