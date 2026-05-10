'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export function Header() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <header className="header">
      <Link href="/" className="header-logo">
        <img className="header-logo-icon" src="/SberInfo.png"></img>
      </Link>
      
      <nav className="header-nav">
        {isLoading ? (
          <div className="spinner" style={{ width: 24, height: 24 }} />
        ) : isAuthenticated ? (
          <Link href="/profile">
            <Button variant="default">Профиль</Button>
          </Link>
        ) : (
          <Link href="/auth">
            <Button variant="default">Вход / Регистрация</Button>
          </Link>
        )}
      </nav>
    </header>
  );
}
