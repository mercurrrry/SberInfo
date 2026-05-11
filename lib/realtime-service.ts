import { fetchCurrencyRates } from './api';

let interval: NodeJS.Timeout | null = null;

export async function startRealtime(callback: any) {
  if (typeof window === 'undefined') return;

  const load = async () => {
    try {
      const rates = await fetchCurrencyRates();
      callback(rates);
    } catch (e) {
      console.error('realtime error', e);
    }
  };

  await new Promise(r => setTimeout(r, 300));
  await load();

  interval = setInterval(load, 86400000);
}

export function stopRealtime() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}