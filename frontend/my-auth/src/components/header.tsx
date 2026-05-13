import '../pages/home/mainapp.css';
import logo from '../assets/images/logo.png';

const Header = () => {
  return (
    <header className='header'>
      <nav className='navbar'>
        {/* LEFT - LOGO */}
        <a href='/' className='logo-section'>
          <img src={logo} alt='VizAlgo Logo' className='logo-img' />

          <div className='logo-text'>
            <h1>VizAlgo</h1>
          </div>
        </a>

        {/* CENTER - NAVIGATION */}
        <ul className='nav-links'>
          <li>
            <a href='/' className='active'>
              Home
            </a>
          </li>

          <li>
            <a href='/algorithms'>Algorithms</a>
          </li>

          <li>
            <a href='/practice'>Practice</a>
          </li>

          <li>
            <a href='/playground'>Playground</a>
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
