import React from 'react';
import './AboutProject.css'

function AboutProject() {
  return (
    <section className="about-project">
    <div className="about-project__container">
      <h2 className="about-project__title">О&nbsp;проекте</h2>
      <div className="about-project__info">
        <div className="about-project__content">
          <h3 className="about-project__content-title">Дипломный проект включал 5&nbsp;этапов</h3>
          <p className="about-project__content-description">
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.
          </p>
        </div>
        <div className="about-project__content">
          <h3 className="about-project__content-title">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
          <p className="about-project__content-description">
          У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timeline">
        <h3 className="about-project__timeline-deadlines about-project__timeline-deadlines_green">1&nbsp;неделя</h3>
        <h3 className="about-project__timeline-deadlines">4&nbsp;недели</h3>
        <p className="about-project__timeline-text">Back-end</p>
        <p className="about-project__timeline-text">Front-end</p>
      </div>
    </div>
  </section>
  );
}

export default AboutProject;