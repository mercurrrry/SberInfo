'use client';

import React, { useState, useEffect } from 'react';
import { Credit, convertCurrency } from '@/lib/api';

interface CreditCardProps {
  credit: Credit;
}

const CURRENCIES = ['RUB', 'USD', 'EUR'];

const currencySymbols: Record<string, string> = {
  RUB: '₽',
  USD: '$',
  EUR: '€',
};

export function CreditCard({ credit }: CreditCardProps) {
  const [selectedCurrency, setSelectedCurrency] = useState(credit.currency);
  const [displayBalance, setDisplayBalance] = useState(credit.balance);
  const [displayDebt, setDisplayDebt] = useState(credit.debt);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    const convertAmounts = async () => {
      if (selectedCurrency === credit.currency) {
        setDisplayBalance(credit.balance);
        setDisplayDebt(credit.debt);
        return;
      }

      setIsConverting(true);

      try {
        const [balanceResult, debtResult] = await Promise.all([
          convertCurrency(credit.balance, credit.currency, selectedCurrency),
          convertCurrency(credit.debt, credit.currency, selectedCurrency),
        ]);

        setDisplayBalance(balanceResult.amount);
        setDisplayDebt(debtResult.amount);
      } catch (error) {
        console.error('Ошибка конвертации:', error);

        // fallback — чтобы не было пустоты
        setDisplayBalance(credit.balance);
        setDisplayDebt(credit.debt);
      } finally {
        setIsConverting(false);
      }
    };

    convertAmounts();
  }, [selectedCurrency, credit]);

  const formatAmount = (amount: number, currency: string) => {
    return (
      new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount) + ' ' + currencySymbols[currency]
    );
  };

  return (
    <div className="credit-card">
      <div className="credit-card-header">
        <span className="credit-card-number">{credit.dealNumber}</span>

        <span className={`credit-card-status ${credit.status}`}>
          {credit.status === 'active' && 'Активный'}
          {credit.status === 'overdue' && 'Просрочен'}
          {credit.status === 'closed' && 'Закрыт'}
        </span>
      </div>

      <div className="credit-card-amount">
        <div className="credit-card-label">Остаток по кредиту</div>
        <div className="credit-card-value">
          {isConverting ? '...' : formatAmount(displayBalance, selectedCurrency)}
        </div>
      </div>

      {displayDebt > 0 && (
        <div className="credit-card-debt">
          <div className="credit-card-label">Текущая задолженность</div>
          <div className="credit-card-debt-value">
            {isConverting ? '...' : formatAmount(displayDebt, selectedCurrency)}
          </div>
        </div>
      )}

      <div className="credit-card-currency-select">
        {CURRENCIES.map((currency) => (
          <button
            key={currency}
            className={`currency-btn ${
              selectedCurrency === currency ? 'active' : ''
            }`}
            onClick={() => setSelectedCurrency(currency)}
            disabled={isConverting}
          >
            {currency}
          </button>
        ))}
      </div>
    </div>
  );
}