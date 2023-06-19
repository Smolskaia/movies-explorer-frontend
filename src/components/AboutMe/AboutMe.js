import React from 'react';
import './AboutMe.css';
import myphoto from '../../images/aboutMe-photo.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Анна</h3>
          <p className="about-me__about">Фронтенд-разработчик, 31&nbsp;год</p>
          <p className="about-me__description">
            Я&nbsp;-&nbsp;инженер по образованию. Окончила Московский Политех. В настоящее время  живу в Ташкенте. Люблю путешествовать и активно проводить время. Сейчас мое внимание полностью направлено на развитие карьеры в веб-разработке. Я открыта для новых возможностей и готова принять участие в работе над классным проектом. 
          </p>
          <a
            href="https://github.com/Smolskaia"
            className="about-me__link"
            rel="noreferrer">
            Github
          </a>
        </div>
        <img src={myphoto} alt="фото студента" className="about-me__photo" />
      </div>
    </section>
  );
}

export default AboutMe;