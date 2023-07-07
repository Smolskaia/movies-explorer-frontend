import React from 'react';
import './Promo.css';
import image from '../../images/promo-image.svg';

function Promo() {
  return (
    <section className="promo">
    <div className="promo__container">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <img className='promo__image' src={image} alt="абстрактная картинка" />
    </div>
  </section>
  );
}

export default Promo;