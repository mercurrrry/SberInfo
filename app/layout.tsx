import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/contexts/AuthContext'
import './globals.css'
import '@/styles/app.css'

const geist = Geist({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-geist-sans',
});
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'SberInfo - Мониторинг кредитных сделок',
  description: 'Автоматизированная система мониторинга кредитных сделок. Отслеживайте ваши кредиты, платежи и историю операций.',
  generator: 'v0.app',
  keywords: ['кредиты', 'мониторинг', 'сделки', 'банк', 'платежи', 'история операций'],
}

export const viewport: Viewport = {
  themeColor: '#21a038',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
