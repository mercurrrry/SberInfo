import React from 'react';
import { Header } from '@/components/Header';
import { CurrencyTicker } from '@/components/CurrencyTicker';
import { Footer } from '@/components/Footer';
import { CreditCard as CreditCardIcon, History, Shield, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      <Header />
      
      <section className="hero-screen">
        <div className="hero-content">
          <h1 className="hero-title">
            Мониторинг кредитных сделок <span>SberInfo</span>
          </h1>
          <p className="hero-description">
            Автоматизированная система для отслеживания ваших кредитов, 
            расчета остатков и просмотра истории платежей. 
            Полный контроль над вашими финансами в одном месте.
          </p>
        </div>
        <div className="hero-ticker">
          <CurrencyTicker />
        </div>
      </section>

      <section className="features">
        <h2 className="features-title">Возможности системы</h2>
        <div className="features-grid-2x2">
          <div className="feature-card">
            <div className="feature-icon">
              <CreditCardIcon size={24} />
            </div>
            <h3 className="feature-title">Управление кредитами</h3>
            <p className="feature-description">
              Просматривайте все ваши кредиты в одном месте. 
              Отслеживайте остатки, процентные ставки и сроки погашения.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <History size={24} />
            </div>
            <h3 className="feature-title">История операций</h3>
            <p className="feature-description">
              Полная история всех платежей и операций по вашим кредитам. 
              Удобная сортировка по дате и сумме.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <TrendingUp size={24} />
            </div>
            <h3 className="feature-title">Мультивалютность</h3>
            <p className="feature-description">
              Конвертация сумм в различные валюты по актуальному курсу ЦБ РФ. 
              Поддержка рублей, долларов и евро.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={24} />
            </div>
            <h3 className="feature-title">Безопасность</h3>
            <p className="feature-description">
              Надежная защита ваших данных. 
              Шифрование и безопасная аутентификация для защиты вашей информации.
            </p>
          </div>
        </div>
      </section>

      <section className="features" style={{ background: '#fff', paddingTop: '2rem' }}>
        <h2 className="features-title">Как это работает</h2>
        <div className="features-grid">
          <div className="feature-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#21a038', marginBottom: '1rem' }}>1</div>
            <h3 className="feature-title">Регистрация</h3>
            <p className="feature-description">
              Создайте аккаунт в системе, указав ваши данные
            </p>
          </div>

          <div className="feature-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#21a038', marginBottom: '1rem' }}>2</div>
            <h3 className="feature-title">Привязка кредитов</h3>
            <p className="feature-description">
              Ваши кредитные договоры автоматически подтягиваются в систему
            </p>
          </div>

          <div className="feature-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#21a038', marginBottom: '1rem' }}>3</div>
            <h3 className="feature-title">Мониторинг</h3>
            <p className="feature-description">
              Отслеживайте состояние всех кредитов в личном кабинете
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
