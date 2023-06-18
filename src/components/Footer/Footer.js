import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__text">
        Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.
      </h3>
      <div className="footer__container">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <a
          href="https://practicum.yandex.ru"
          className="footer__link"
        >
          Яндекс.Практикум
        </a>
        <a
          href="https://github.com/yandex-praktikum"
          className="footer__link"
        >
          Github
        </a>
      </div>
    </footer>
  );
}

export default Footer;
