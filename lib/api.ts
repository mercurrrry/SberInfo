const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  avatar?: string;
}

export interface CurrencyRate {
  code: string;
  value: number;
  change: number;
}

export interface Credit {
  id: string;
  dealNumber: string;
  loanAmount: number;
  balance: number;
  debt: number;
  currency: string;
  interestRate: number;
  issueDate: string;
  loanTermMonths: number;
  repaymentMethod: string;
  status: 'active' | 'overdue' | 'closed';
}

export interface Operation {
  id: string;
  type: 'payment' | 'withdrawal' | 'fee' | 'interest';
  amount: number;
  currency: string;
  date: string;
  description: string;
  creditId: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export async function fetchCurrencyRates(): Promise<CurrencyRate[]> {
  const res = await fetch('/api/rates', { cache: 'no-store' });
  return res.json();
}

// Авторизация
export async function login(data: LoginRequest): Promise<AuthResponse> {
  // TODO: Реализовать реальный запрос к бэкенду
  // POST ${API_BASE_URL}/auth/login
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Заглушка: успешный вход
      resolve({
        success: true,
        user: {
          id: '1',
          email: data.email,
          fullName: 'Иванов Иван Иванович',
          phone: '+7 (999) 123-45-67',
        },
        token: 'mock-jwt-token',
      });
    }, 800);
  });
}

// Регистрация
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  // TODO: Реализовать реальный запрос к бэкенду
  // POST ${API_BASE_URL}/auth/register
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        user: {
          id: '1',
          email: data.email,
          fullName: data.fullName,
          phone: data.phone,
        },
        token: 'mock-jwt-token',
      });
    }, 800);
  });
}

// Выход
export async function logout(): Promise<{ success: boolean }> {
  // TODO: Реализовать реальный запрос к бэкенду
  // POST ${API_BASE_URL}/auth/logout
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 300);
  });
}

// Получение текущего пользователя
export async function getCurrentUser(): Promise<User | null> {
  // TODO: Реализовать реальный запрос к бэкенду
  // GET ${API_BASE_URL}/auth/me
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Проверяем localStorage на наличие пользователя
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('user');
        if (stored) {
          resolve(JSON.parse(stored));
          return;
        }
      }
      resolve(null);
    }, 300);
  });
}

// Обновление профиля
export async function updateProfile(data: Partial<User>): Promise<{ success: boolean; user: User }> {
  // TODO: Реализовать реальный запрос к бэкенду
  // PUT ${API_BASE_URL}/users/profile
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedUser: User = {
        id: '1',
        email: data.email || 'user@example.com',
        fullName: data.fullName || 'Иванов Иван Иванович',
        phone: data.phone || '+7 (999) 123-45-67',
        avatar: data.avatar,
      };
      resolve({ success: true, user: updatedUser });
    }, 500);
  });
}

// Загрузка аватара
export async function uploadAvatar(file: File): Promise<{ success: boolean; url: string }> {
  // TODO: Реализовать реальный запрос к бэкенду
  // POST ${API_BASE_URL}/users/avatar
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Создаем локальный URL для превью
      const url = URL.createObjectURL(file);
      resolve({ success: true, url });
    }, 500);
  });
}

// Получение кредитов пользователя
export async function fetchCredits(): Promise<Credit[]> {
  // TODO: Реализовать реальный запрос к бэкенду
  // GET ${API_BASE_URL}/credits
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          dealNumber: 'CRD-2024-00123',
          loanAmount: 1500000,
          balance: 825050,
          debt: 45000,
          currency: 'RUB',
          interestRate: 12.5,
          issueDate: '2024-01-15',
          loanTermMonths: 36,
          repaymentMethod: 'Аннуитетный',
          status: 'active',
        },
        {
          id: '2',
          dealNumber: 'CRD-2024-00456',
          loanAmount: 500000,
          balance: 320000,
          debt: 0,
          currency: 'RUB',
          interestRate: 14.9,
          issueDate: '2024-03-20',
          loanTermMonths: 24,
          repaymentMethod: 'Дифференцированный',
          status: 'active',
        },
        {
          id: '3',
          dealNumber: 'CRD-2023-00789',
          loanAmount: 250000,
          balance: 85000,
          debt: 12500,
          currency: 'RUB',
          interestRate: 18.0,
          issueDate: '2023-06-10',
          loanTermMonths: 12,
          repaymentMethod: 'Аннуитетный',
          status: 'overdue',
        },
      ]);
    }, 600);
  });
}

// Получение истории операций
export async function fetchOperations(creditId?: string): Promise<Operation[]> {
  // TODO: Реализовать реальный запрос к бэкенду
  // GET ${API_BASE_URL}/operations?creditId=${creditId}
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const operations: Operation[] = [
        {
          id: '1',
          type: 'payment',
          amount: 45000,
          currency: 'RUB',
          date: '2026-04-28',
          description: 'Ежемесячный платеж по кредиту CRD-2024-00123',
          creditId: '1',
        },
        {
          id: '2',
          type: 'interest',
          amount: 8500,
          currency: 'RUB',
          date: '2026-04-15',
          description: 'Начисление процентов по кредиту CRD-2024-00123',
          creditId: '1',
        },
        {
          id: '3',
          type: 'payment',
          amount: 22000,
          currency: 'RUB',
          date: '2026-04-10',
          description: 'Ежемесячный платеж по кредиту CRD-2024-00456',
          creditId: '2',
        },
        {
          id: '4',
          type: 'fee',
          amount: 500,
          currency: 'RUB',
          date: '2026-04-05',
          description: 'Комиссия за обслуживание счета',
          creditId: '1',
        },
        {
          id: '5',
          type: 'payment',
          amount: 45000,
          currency: 'RUB',
          date: '2026-03-28',
          description: 'Ежемесячный платеж по кредиту CRD-2024-00123',
          creditId: '1',
        },
        {
          id: '6',
          type: 'payment',
          amount: 22000,
          currency: 'RUB',
          date: '2026-03-10',
          description: 'Ежемесячный платеж по кредиту CRD-2024-00456',
          creditId: '2',
        },
        {
          id: '7',
          type: 'interest',
          amount: 9200,
          currency: 'RUB',
          date: '2026-03-15',
          description: 'Начисление процентов по кредиту CRD-2024-00123',
          creditId: '1',
        },
        {
          id: '8',
          type: 'payment',
          amount: 25000,
          currency: 'RUB',
          date: '2026-03-01',
          description: 'Ежемесячный платеж по кредиту CRD-2023-00789',
          creditId: '3',
        },
      ];

      if (creditId) {
        resolve(operations.filter((op) => op.creditId === creditId));
      } else {
        resolve(operations);
      }
    }, 500);
  });
}

// Конвертация валюты
export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<{ amount: number; rate: number }> {
  // TODO: Реализовать реальный запрос к бэкенду
  // GET ${API_BASE_URL}/currency/convert?amount=${amount}&from=${fromCurrency}&to=${toCurrency}
  
  const rates: Record<string, number> = {
    USD: 88.56,
    EUR: 95.12,
    RUB: 1,
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      const fromRate = rates[fromCurrency] || 1;
      const toRate = rates[toCurrency] || 1;
      const convertedAmount = (amount * fromRate) / toRate;
      const rate = toRate / fromRate;
      
      resolve({
        amount: Math.round(convertedAmount * 100) / 100,
        rate: Math.round(rate * 10000) / 10000,
      });
    }, 200);
  });
}

// Расчет остатка по кредиту на определенную дату
export interface CreditCalculation {
  borrowerFullName: string;
  creditAmount: number;
  creditAmountCurrency: string;
  balanceOnDate: number;
  balanceOnDateCurrency: string;
  balanceInOneYear: number;
  balanceInOneYearCurrency: string;
  repaymentMethod: string;
  creditHistory: string;
  exchangeRateInfo: {
    rateUsdRub: number;
    rateEurRub: number;
    date: string;
  };
}

export async function calculateCredit(
  dealId: string,
  calculationDate: string,
  targetCurrency: string
): Promise<{ success: boolean; data?: CreditCalculation; error?: string }> {
  // TODO: Реализовать реальный запрос к бэкенду
  // POST ${API_BASE_URL}/credits/calculate
  // Body: { deal_id, calculation_date, target_currency }
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          borrowerFullName: 'Иванов Иван Иванович',
          creditAmount: 150000,
          creditAmountCurrency: targetCurrency,
          balanceOnDate: 82500.5,
          balanceOnDateCurrency: targetCurrency,
          balanceInOneYear: 37500.25,
          balanceInOneYearCurrency: targetCurrency,
          repaymentMethod: 'Аннуитетный',
          creditHistory: 'Положительная',
          exchangeRateInfo: {
            rateUsdRub: 88.5,
            rateEurRub: 95.1,
            date: calculationDate,
          },
        },
      });
    }, 700);
  });
}
