import Header from '../../components/header';
import './intro.css';
import GeometricBackground from '../../components/background/geometricBackground';
import ScrambleText from '../../components/ScrambleText';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

function Intro() {
  const { t } = useTranslation();

  return (
    <>
      <GeometricBackground />
      <Header />

      <div className='intro-page'>
        {/* HERO */}
        <section className='intro-hero'>
          <div className='hero-content'>
            <p className='hero-tag'>{t('hero.tag')}</p>

            <h1>
              <ScrambleText text={t('hero.title')} delay={300} />
              <span>
                <ScrambleText text={t('hero.highlight')} delay={300} />
              </span>
            </h1>

            <p className='hero-description'>{t('hero.desc')}</p>

            <div className='hero-buttons'></div>
          </div>
        </section>

        {/* ABOUT WEBSITE */}
        <section className='intro-section'>
          <div className='section-title'>
            <span>✨</span>
            {t('about.title')}
          </div>

          <div className='intro-grid'>
            <div className='intro-card'>
              <h3>{t('about.card1.title')}</h3>
              <p>{t('about.card1.desc')}</p>
            </div>

            <div className='intro-card'>
              <h3>{t('about.card2.title')}</h3>
              <p>{t('about.card2.desc')}</p>
            </div>

            <div className='intro-card'>
              <h3>{t('about.card3.title')}</h3>
              <p>{t('about.card3.desc')}</p>
            </div>

            <div className='intro-card'>
              <h3>{t('about.card4.title')}</h3>
              <p>{t('about.card4.desc')}</p>
            </div>
          </div>
        </section>

        {/* ALGORITHMS */}
        <section className='intro-section'>
          <div className='section-title'>
            <span>📚</span>
            {t('algo.title')}
          </div>

          <div className='algo-wrapper'>
            {/* SORTING */}
            <div className='algo-box'>
              <h2>📊 {t('algo.sorting.title')}</h2>

              <p>{t('algo.sorting.desc')}</p>

              <ul>
                <li>
                  <Link to='/about-sorting#bubble-sort'>Bubble Sort</Link>
                </li>
                <li>
                  <Link to='/about-sorting#selection-sort'>Selection Sort</Link>
                </li>
                <li>
                  <Link to='/about-sorting#insertion-sort'>Insertion Sort</Link>
                </li>
                <li>
                  <Link to='/about-sorting#merge-sort'>Merge Sort</Link>
                </li>
                <li>
                  <Link to='/about-sorting#quick-sort'>Quick Sort</Link>
                </li>
              </ul>
            </div>

            {/* SEARCHING */}
            <div className='algo-box'>
              <h2>🔍 {t('algo.searching.title')}</h2>

              <p>{t('algo.searching.desc')}</p>

              <ul>
                <li>
                  <Link to='/about-searching#linear-search'>Linear Search</Link>
                </li>
                <li>
                  <Link to='/about-searching#binary-search'>Binary Search</Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className='intro-section'>
          <div className='section-title'>
            <span>👨‍💻</span>
            {t('team.title')}
          </div>

          <p className='team-intro'>{t('team.desc')}</p>

          <div className='team-grid'>
            <a
              href='https://github.com/tuancosac'
              target='_blank'
              rel='noopener noreferrer'
              className='team-link-wrapper'
            >
              <div className='team-card'>
                <h3>Nguyễn Ngọc Tuấn</h3>
                <p>Frontend Developer</p>
              </div>
            </a>

            <a
              href='https://github.com/Chick25'
              target='_blank'
              rel='noopener noreferrer'
              className='team-link-wrapper'
            >
              <div className='team-card'>
                <h3>Huỳnh Lê Kim Yến</h3>
                <p>Database & Backend Developer</p>
              </div>
            </a>

            <a
              href='https://github.com/kimoanh2005'
              target='_blank'
              rel='noopener noreferrer'
              className='team-link-wrapper'
            >
              <div className='team-card'>
                <h3>Nguyễn Thị Kim Oanh</h3>
                <p>Frontend Developer & Tester</p>
              </div>
            </a>

            <a
              href='https://github.com/faonnguyen-1402'
              target='_blank'
              rel='noopener noreferrer'
              className='team-link-wrapper'
            >
              <div className='team-card'>
                <h3>Phạm Nguyễn Phúc Hào</h3>
                <p>Backend & Frontend Developer</p>
              </div>
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Intro;
