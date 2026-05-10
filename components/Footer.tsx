import React from 'react';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h4 className="footer-section-title">SberInfo</h4>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Автоматизированная система мониторинга кредитных сделок. 
            Удобный инструмент для контроля ваших финансов.
          </p>
        </div>
        
        <div>
          <h4 className="footer-section-title">Навигация</h4>
          <ul className="footer-links">
            <li><a href="/">Главная</a></li>
            <li><a href="/profile">Личный кабинет</a></li>
            <li><a href="/operations">История операций</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="footer-section-title">Информация</h4>
          <ul className="footer-links">
            <li><a href="#">О сервисе</a></li>
            <li><a href="#">Условия использования</a></li>
            <li><a href="#">Политика конфиденциальности</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="footer-section-title">Контакты</h4>
          <ul className="footer-links">
            <li>8 888 888-88-88</li>
            <li>support@sbertech.ru</li>
            <li>Рязань, ул. Семашко, 14</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        © {new Date().getFullYear()} SberInfo. Все права защищены. 
        Данные о курсах валют предоставлены ЦБ РФ.
      </div>
    </footer>
  );
}
