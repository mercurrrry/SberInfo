import { NextResponse } from 'next/server';

const MOEX_PAIRS = [
  { code: 'USD', secid: 'USD000UTSTOM', board: 'CETS' },
  { code: 'CNY', secid: 'CNYRUB_TOM',   board: 'CETS' },
];

const CBR_CODES = ['EUR', 'GBP', 'JPY', 'CHF'];

async function fetchMoex() {
  return Promise.all(
    MOEX_PAIRS.map(async ({ code, secid, board }) => {
      try {
        const res = await fetch(
          `https://iss.moex.com/iss/history/engines/currency/markets/selt/boards/${board}/securities/${secid}.json?limit=20&sort_order=desc`,
          { next: { revalidate: 60 } }
        );
        const { history: h } = await res.json();
        const closeIdx = h?.columns?.indexOf('CLOSE');
        const row  = h?.data?.find((r: any[]) => r[closeIdx] != null && r[closeIdx] !== 0);
        const prev = h?.data?.find((r: any[], i: number) => i > h.data.indexOf(row) && r[closeIdx] != null && r[closeIdx] !== 0);
        const value  = Number(row?.[closeIdx] ?? 0);
        const prevValue = Number(prev?.[closeIdx] ?? 0);
        const change = prevValue !== 0 ? ((value - prevValue) / prevValue) * 100 : 0;
        return { code, value, change };
      } catch {
        return { code, value: 0, change: 0 };
      }
    })
  );
}

async function fetchCbr() {
  try {
    const res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js', {
      next: { revalidate: 3600 }
    });
    const json = await res.json();

    return CBR_CODES.map(code => {
      const item = json?.Valute?.[code];
      if (!item) return { code, value: 0, change: 0 };

      const value    = Number(item.Value);
      const prevValue = Number(item.Previous);
      const change   = prevValue !== 0 ? ((value - prevValue) / prevValue) * 100 : 0;

      return { code, value, change };
    });
  } catch {
    return CBR_CODES.map(code => ({ code, value: 0, change: 0 }));
  }
}

export async function GET() {
  const [moex, cbr] = await Promise.all([fetchMoex(), fetchCbr()]);
  return NextResponse.json([...moex, ...cbr]);
}