import '../pages/home/mainapp.css';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { getAvatarUrl } from '../utils/avatarHelper';
import { VN, US } from 'country-flag-icons/react/3x2';
import { Menu, X } from 'lucide-react';

type SearchItem = {
  title: string;
  category: string;
  path: string;
  keywords: string[];
};

const searchItems: SearchItem[] = [
  {
    title: 'Bubble Sort',
    category: 'Sorting Algorithm',
    path: '/about-sorting#bubble-sort',
    keywords: ['bubble', 'bubble sort', 'sap xep noi bot', 'nổi bọt'],
  },
  {
    title: 'Selection Sort',
    category: 'Sorting Algorithm',
    path: '/about-sorting#selection-sort',
    keywords: ['selection', 'selection sort', 'sap xep chon', 'sắp xếp chọn'],
  },
  {
    title: 'Insertion Sort',
    category: 'Sorting Algorithm',
    path: '/about-sorting#insertion-sort',
    keywords: ['insertion', 'insertion sort', 'sap xep chen', 'sắp xếp chèn'],
  },
  {
    title: 'Merge Sort',
    category: 'Sorting Algorithm',
    path: '/about-sorting#merge-sort',
    keywords: ['merge', 'merge sort', 'sap xep tron', 'sắp xếp trộn'],
  },
  {
    title: 'Quick Sort',
    category: 'Sorting Algorithm',
    path: '/about-sorting#quick-sort',
    keywords: ['quick', 'quick sort', 'sap xep nhanh', 'sắp xếp nhanh'],
  },
  {
    title: 'Linear Search',
    category: 'Searching Algorithm',
    path: '/about-searching#linear-search',
    keywords: ['linear', 'linear search', 'tim kiem tuyen tinh', 'tuyến tính'],
  },
  {
    title: 'Binary Search',
    category: 'Searching Algorithm',
    path: '/about-searching#binary-search',
    keywords: ['binary', 'binary search', 'tim kiem nhi phan', 'nhị phân'],
  },
];

const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const currentLanguage = (i18n as any).language;

  const filteredSearchItems = searchItems.filter((item) => {
    const search = normalizeText(searchValue);

    if (!search) return false;

    const titleMatch = normalizeText(item.title).includes(search);
    const categoryMatch = normalizeText(item.category).includes(search);
    const keywordMatch = item.keywords.some((keyword) =>
      normalizeText(keyword).includes(search),
    );

    return titleMatch || categoryMatch || keywordMatch;
  });

  const toggleLanguage = () => {
    const i18nInstance = i18n as any;
    const newLang = i18nInstance.language === 'en' ? 'vi' : 'en';

    i18nInstance.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  useEffect(() => {
    const loadUserFromStorage = () => {
      const storedUser = localStorage.getItem('user');

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUserFromStorage();

    window.addEventListener('authChange', loadUserFromStorage);
    window.addEventListener('storage', loadUserFromStorage);

    return () => {
      window.removeEventListener('authChange', loadUserFromStorage);
      window.removeEventListener('storage', loadUserFromStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    window.dispatchEvent(new Event('authChange'));

    navigate('/home');
  };

  const handleGoToSearchItem = (path: string) => {
    setSearchValue('');
    setIsSearchOpen(false);
    setMenuOpen(false);

    navigate(path);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (filteredSearchItems.length > 0) {
      handleGoToSearchItem(filteredSearchItems[0].path);
    }
  };

  return (
    <header className='header'>
      <nav className='navbar'>
        <Link to='/home' className='logo-section'>
          VizAlgo
          <span className='logo-subtitle'>Visualizer Algorithm</span>
        </Link>

        <ul className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
          <li>
            <NavLink
              to='/home'
              end
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {t('nav.home')}
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/algorithms'
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {t('nav.algo')}
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/practice'
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {t('nav.practice')}
            </NavLink>
          </li>
        </ul>

        <button
          className='menu-toggle'
          onClick={() => setMenuOpen(!menuOpen)}
          type='button'
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <div className='nav-actions'>
          <form className='search-bar-container' onSubmit={handleSearchSubmit}>
            <svg
              className='search-icon'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z'
                stroke='#64748b'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M21 21L16.65 16.65'
                stroke='#64748b'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>

            <input
              type='text'
              placeholder='Search algorithms...'
              className='search-input'
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
            />

            {isSearchOpen && searchValue.trim() !== '' && (
              <div className='search-dropdown'>
                {filteredSearchItems.length > 0 ? (
                  filteredSearchItems.map((item) => (
                    <button
                      key={item.path}
                      type='button'
                      className='search-result-item'
                      onMouseDown={(event) => {
                        event.preventDefault();
                        handleGoToSearchItem(item.path);
                      }}
                    >
                      <span className='search-result-title'>{item.title}</span>
                      <span className='search-result-category'>
                        {item.category}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className='search-no-result'>
                    Không tìm thấy thuật toán phù hợp
                  </div>
                )}
              </div>
            )}
          </form>

          {user ? (
            <div className='user-profile-dropdown'>
              <div
                className='avatar-placeholder'
                onClick={() => navigate('/profile')}
              >
                <img
                  src={getAvatarUrl(user)}
                  alt='avatar'
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div className='dropdown-content'>
                <div className='dropdown-user-info'>
                  <p className='dropdown-username'>{user.username}</p>
                  <p className='dropdown-email'>{user.email}</p>
                </div>

                <hr className='dropdown-divider' />

                <Link to='/profile' className='dropdown-item'>
                  Hồ sơ cá nhân
                </Link>

                <button
                  onClick={handleLogout}
                  className='dropdown-item btn-logout-text'
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <button className='login-btn' onClick={() => navigate('/login')}>
              {t('nav.login')}
            </button>
          )}

          <button
            onClick={toggleLanguage}
            className='lang-btn'
            aria-label='Toggle Language'
            type='button'
          >
            {currentLanguage === 'en' ? (
              <US title='English' />
            ) : (
              <VN title='VietNamese' />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
