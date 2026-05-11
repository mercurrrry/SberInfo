import { NextResponse } from 'next/server';

const CBR_CODES = ['USD', 'EUR', 'CNY', 'GBP', 'JPY', 'CHF'];

export async function GET() {
  try {
    const res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js', {
      next: { revalidate: 86400 }
    });
    const json = await res.json();

    const rates = CBR_CODES.map(code => {
      const item = json?.Valute?.[code];
      if (!item) return { code, value: 0, change: 0 };

      const value     = Number(item.Value) / Number(item.Nominal);
      const prevValue = Number(item.Previous) / Number(item.Nominal);
      const change    = prevValue !== 0 ? ((value - prevValue) / prevValue) * 100 : 0;

      return { code, value, change };
    });

    return NextResponse.json(rates);
  } catch {
    return NextResponse.json(
      CBR_CODES.map(code => ({ code, value: 0, change: 0 }))
    );
  }
}