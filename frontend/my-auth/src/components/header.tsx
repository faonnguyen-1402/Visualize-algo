import "../pages/home/mainapp.css";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
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

          <button className='login-btn'>Login</button>
        </div>

      </nav>
    </header>
  );
};

export default Header;