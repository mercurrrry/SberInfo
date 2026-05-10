'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { CreditCard } from '@/components/CreditCard';
import { fetchCredits, updateProfile, uploadAvatar, Credit } from '@/lib/api';
import { ArrowLeft, History, User } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, updateUser, logout } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [credits, setCredits] = useState<Credit[]>([]);
  const [isLoadingCredits, setIsLoadingCredits] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAvatar(user.avatar);
    }
  }, [user]);

  // Загрузка кредитов
  useEffect(() => {
    const loadCredits = async () => {
      try {
        const data = await fetchCredits();
        setCredits(data);
      } catch (error) {
        console.error('[v0] Error loading credits:', error);
      } finally {
        setIsLoadingCredits(false);
      }
    };

    if (isAuthenticated) {
      loadCredits();
    }
  }, [isAuthenticated]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadAvatar(file);
      if (result.success) {
        setAvatar(result.url);
        updateUser({ avatar: result.url });
      }
    } catch (error) {
      console.error('[v0] Error uploading avatar:', error);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const result = await updateProfile({ fullName, email, phone, avatar });
      if (result.success) {
        updateUser(result.user);
      }
    } catch (error) {
      console.error('[v0] Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (authLoading) {
    return (
      <div className="profile-page">
        <div className="loading-spinner" style={{ minHeight: '100vh' }}>
          <div className="spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        <button className="back-button" onClick={() => router.push('/')}>
          <ArrowLeft size={20} />
          <span>Назад</span>
        </button>
        <h1 className="profile-title">Личный кабинет</h1>
      </header>

      <main className="profile-content">
        <div className="profile-grid">
          <div className="profile-info-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar" onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
                {avatar ? (
                  <img src={avatar} alt="" />
                ) : (
                  <User size={48} />
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <button className="avatar-upload-btn" onClick={handleAvatarClick}>
                Изменить фото
              </button>
            </div>

            <form className="profile-form" onSubmit={handleSaveProfile}>
              <div className="form-group">
                <label htmlFor="fullName">ФИО</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Иванов Иван Иванович"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.ru"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <button type="submit" className="profile-save-btn" disabled={isSaving}>
                {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
              </button>
            </form>

            <button
              onClick={handleLogout}
              style={{
                marginTop: '1rem',
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'transparent',
                border: '1px solid #ef4444',
                color: '#ef4444',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Выйти из аккаунта
            </button>
          </div>

          <div className="credits-section">
            <div className="credits-header">
              <h2 className="credits-title">Мои кредиты</h2>
              <Link href="/operations">
                <button className="history-btn">
                  <History size={18} />
                  <span>История операций</span>
                </button>
              </Link>
            </div>

            {isLoadingCredits ? (
              <div className="loading-spinner">
                <div className="spinner" />
              </div>
            ) : credits.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">💳</div>
                <p className="empty-state-text">У вас пока нет активных кредитов</p>
              </div>
            ) : (
              <div className="credits-grid">
                {credits.map((credit) => (
                  <CreditCard key={credit.id} credit={credit} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
