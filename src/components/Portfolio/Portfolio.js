import React from 'react';
import './Portfolio.css';
import arrow from '../../images/portfolio-arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <div>
        <ul  className="portfolio__list">
          <li>
            <a href="https://github.com/Smolskaia/how-to-learn" className="portfolio__link">
              <p className="portfolio__text">Статичный сайт</p>
              <img className="portfolio__arrow-img" src={arrow} alt="стрелка" />
            </a>
          </li>
          <li>
            <a href="https://github.com/Smolskaia/russian-travel" className="portfolio__link">
              <p className="portfolio__text">Адаптивный сайт</p>
              <img className="portfolio__arrow-img" src={arrow} alt="стрелка" />
            </a>
          </li>
          <li>
            <a href="https://github.com/Smolskaia/react-mesto-api-full-gha" className="portfolio__link">
              <p className="portfolio__text">Одностраничное приложение</p>
              <img className="portfolio__arrow-img" src={arrow} alt="стрелка" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;