import Header from "../../components/header";
import "./intro.css";
import GeometricBackground from "../../components/background/geometricBackground";

import { useTranslation } from "react-i18next";

function Intro() {
  const { t } = useTranslation();

  return (
    <>
      <GeometricBackground />
      <Header />

      <div className="intro-page">

        {/* HERO */}
        <section className="intro-hero">

          <div className="hero-content">

            <p className="hero-tag">
              {/* VISUALIZE ALGORITHM PLATFORM */}
              {t('hero.tag')}
            </p>

            <h1>
              {/* Learn Algorithms */}
              {t('hero.title')}
              {/* <span> Visually</span> */}
              <span>{t('hero.highlight')}</span>
            </h1>

            <p className="hero-description">
              {/* VizAlgo is a web platform that helps students
              understand algorithms through interactive
              visualizations, coding practice, and real-time
              execution. */}
              {t('hero.desc')}
            </p>

            <div className="hero-buttons">


            </div>

          </div>

        </section>

        {/* ABOUT WEBSITE */}
        <section className="intro-section">

          <div className="section-title">
            <span>✨</span>
            {/* About VizAlgo */}
            {t('about.title')}
          </div>

          <div className="intro-grid">

            <div className="intro-card">
              {/* <h3>Interactive Learning</h3> */}
              <h3>{t('about.card1.title')}</h3>

              {/* <p>
                Visualize how algorithms work step-by-step
                instead of only reading theory.
              </p> */}
              <p>{t('about.card1.desc')}</p>
            </div>

            <div className="intro-card">
              {/* <h3>Practice Coding</h3>

              <p>
                Solve coding exercises directly in the browser
                with multiple programming languages.
              </p> */}
              <h3>{t('about.card2.title')}</h3>
              <p>{t('about.card2.desc')}</p>
            </div>

            <div className="intro-card">
              {/* <h3>Real-time Execution</h3>

              <p>
                Run code instantly and view outputs,
                runtime, memory, and testcase results.
              </p> */}
              <h3>{t('about.card3.title')}</h3>
              <p>{t('about.card3.desc')}</p>
            </div>

            <div className="intro-card">
              {/* <h3>Modern UI</h3>

              <p>
                Clean dark-mode interface inspired by
                professional coding platforms.
              </p> */}
              <h3>{t('about.card4.title')}</h3>
              <p>{t('about.card4.desc')}</p>
            </div>

          </div>

        </section>

        {/* ALGORITHMS */}
        <section className="intro-section">

          <div className="section-title">
            <span>📚</span>
            {/* Algorithms Categories */}
            {t('algo.title')}
          </div>

          <div className="algo-wrapper">

            {/* SORTING */}
            <div className="algo-box">

              {/* <h2>📊 Sorting Algorithms</h2> */}
              <h2>📊 {t('algo.sorting.title')}</h2>

              {/* <p>
                Sorting algorithms arrange data in a specific
                order such as ascending or descending.
                They improve searching efficiency and data
                organization.
              </p> */}
              <p>{t('algo.sorting.desc')}</p>

              <ul>
                <li>Bubble Sort</li>
                <li>Selection Sort</li>
                <li>Insertion Sort</li>
                <li>Merge Sort</li>
                <li>Quick Sort</li>
              </ul>

            </div>

            {/* SEARCHING */}
            <div className="algo-box">

              {/* <h2>🔍 Searching Algorithms</h2>

              <p>
                Searching algorithms help locate data inside
                arrays or collections efficiently.
              </p> */}
              <h2>🔍 {t('algo.searching.title')}</h2>
              <p>{t('algo.searching.desc')}</p>

              <ul>
                <li>Linear Search</li>
                <li>Binary Search</li>
              </ul>

            </div>

          </div>

        </section>

        {/* TEAM */}
        <section className="intro-section">

          <div className="section-title">
            <span>👨‍💻</span>
            {/* Development Team */}
            {t('team.title')}
          </div>

          {/* <p className="team-intro">
            We are third-year Information Technology students
            at Tay Nguyen University.
          </p> */}
          <p className="team-intro">{t('team.desc')}</p>

          <div className="team-grid">

            <div className="team-card">
              <h3>Nguyễn Ngọc Tuấn</h3>
              <p>Frontend Developer</p>
            </div>

            <div className="team-card">
              <h3>Huỳnh Lê Kim Yến</h3>
              <p>Database & Backend Developer</p>
            </div>

            <div className="team-card">
              <h3>Nguyễn Thị Kim Oanh</h3>
              <p>Frontend Developer & Tester</p>
            </div>

            <div className="team-card">
              <h3>Phạm Nguyễn Phúc Hào</h3>
              <p>Backend & Frontend Developer</p>
            </div>

          </div>

        </section>

      </div>
    </>
  );
}

export default Intro;