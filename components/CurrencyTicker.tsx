'use client';

import React, { useEffect, useState } from 'react';
import { CurrencyRate } from '@/lib/api';
import { startRealtime, stopRealtime } from '@/lib/realtime-service';

export function CurrencyTicker() {
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    startRealtime((newRates: CurrencyRate[]) => {
      setRates(newRates);
      setIsLoading(false);
    });

    return () => stopRealtime();
  }, []);

  if (isLoading) {
    return (
      <div className="currency-bar">
        <div className="currency-bar-inner">
          <span className="currency-loading">
            Загрузка курсов...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="currency-bar">
      <div className="currency-bar-inner">
        {rates.map((rate) => (
          <div className="currency-item-static" key={rate.code}>
            <span className="currency-code">{rate.code}</span>

            <span className="currency-value">
              {Number(rate.value || 0).toFixed(2)} ₽
            </span>

            <span
              className={`currency-change ${
                rate.change >= 0 ? 'positive' : 'negative'
              }`}
            >
              {rate.change >= 0 ? '+' : ''}
              {Number(rate.change || 0).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}