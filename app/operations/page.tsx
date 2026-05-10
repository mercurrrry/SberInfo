'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { fetchOperations, Operation } from '@/lib/api';
import { ArrowLeft, ArrowDownUp, Calendar, CreditCard, DollarSign, Percent, Receipt } from 'lucide-react';

type SortField = 'date' | 'amount';
type SortOrder = 'asc' | 'desc';

const operationTypeLabels: Record<string, string> = {
  payment: 'Платеж по кредиту',
  withdrawal: 'Снятие средств',
  fee: 'Комиссия',
  interest: 'Начисление процентов',
};

const operationTypeIcons: Record<string, React.ReactNode> = {
  payment: <CreditCard size={18} />,
  withdrawal: <DollarSign size={18} />,
  fee: <Receipt size={18} />,
  interest: <Percent size={18} />,
};

export default function OperationsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [operations, setOperations] = useState<Operation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [authLoading, isAuthenticated, router]);

  // Загрузка операций
  useEffect(() => {
    const loadOperations = async () => {
      try {
        const data = await fetchOperations();
        setOperations(data);
      } catch (error) {
        console.error('[v0] Error loading operations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      loadOperations();
    }
  }, [isAuthenticated]);

  // Сортировка
  const sortedOperations = useMemo(() => {
    return [...operations].sort((a, b) => {
      let comparison = 0;

      if (sortField === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortField === 'amount') {
        comparison = a.amount - b.amount;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [operations, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    const symbols: Record<string, string> = {
      RUB: '₽',
      USD: '$',
      EUR: '€',
    };
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount) + ' ' + (symbols[currency] || currency);
  };

  if (authLoading) {
    return (
      <div className="operations-page">
        <div className="loading-spinner" style={{ minHeight: '100vh' }}>
          <div className="spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="operations-page">
      <header className="profile-header">
        <button className="back-button" onClick={() => router.push('/profile')}>
          <ArrowLeft size={20} />
          <span>Назад</span>
        </button>
        <h1 className="profile-title">История операций</h1>
      </header>

      <main className="operations-content">
        <div className="operations-card">
          <div className="operations-header">
            <h2 className="operations-title">Все операции</h2>
            <div className="sort-buttons">
              <button
                className={`sort-btn ${sortField === 'date' ? 'active' : ''}`}
                onClick={() => handleSort('date')}
              >
                <Calendar size={16} />
                <span>По дате</span>
                {sortField === 'date' && (
                  <ArrowDownUp size={14} style={{ transform: sortOrder === 'asc' ? 'scaleY(-1)' : 'none' }} />
                )}
              </button>
              <button
                className={`sort-btn ${sortField === 'amount' ? 'active' : ''}`}
                onClick={() => handleSort('amount')}
              >
                <DollarSign size={16} />
                <span>По сумме</span>
                {sortField === 'amount' && (
                  <ArrowDownUp size={14} style={{ transform: sortOrder === 'asc' ? 'scaleY(-1)' : 'none' }} />
                )}
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner" />
            </div>
          ) : operations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <p className="empty-state-text">История операций пуста</p>
            </div>
          ) : (
            <div className="operations-list">
              {sortedOperations.map((operation) => (
                <div key={operation.id} className="operation-item">
                  <div className="operation-info">
                    <div className={`operation-icon ${operation.type === 'payment' ? 'payment' : 'withdrawal'}`}>
                      {operationTypeIcons[operation.type]}
                    </div>
                    <div className="operation-details">
                      <span className="operation-type">{operationTypeLabels[operation.type]}</span>
                      <span className="operation-date">{formatDate(operation.date)}</span>
                    </div>
                  </div>
                  <div
                    className={`operation-amount ${
                      operation.type === 'payment' ? 'positive' : 'negative'
                    }`}
                  >
                    {operation.type === 'payment' ? '-' : '+'}
                    {formatAmount(operation.amount, operation.currency)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
