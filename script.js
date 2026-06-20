const btcPriceEl = document.getElementById('btcPrice');
const btcTipEl = document.getElementById('btcTip');
const marketUpdatedEl = document.getElementById('marketUpdated');
const themeToggleButton = document.getElementById('themeToggleButton');

function formatUpdateTime(date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}

function setTheme(theme) {
  const isLight = theme === 'light';
  document.documentElement.classList.toggle('theme-light', isLight);
  localStorage.setItem('spendwiseTheme', theme);
  if (themeToggleButton) {
    themeToggleButton.textContent = isLight ? 'Dark mode' : 'Light mode';
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem('spendwiseTheme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const theme = savedTheme || (prefersLight ? 'light' : 'dark');
  setTheme(theme);
}

function toggleTheme() {
  const currentIsLight = document.documentElement.classList.contains('theme-light');
  setTheme(currentIsLight ? 'dark' : 'light');
}

if (themeToggleButton) {
  themeToggleButton.addEventListener('click', toggleTheme);
}

async function loadMarketPrice() {
  marketUpdatedEl.textContent = 'Refreshing market data...';

  try {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json');
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    const price = Number(data.bpi.USD.rate.replace(',', ''));
    btcPriceEl.textContent = `$${price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    btcTipEl.textContent = price > 50000
      ? 'Bitcoin is strong. A balanced saving strategy helps while markets are active.'
      : 'Bitcoin is more affordable. Keep your saving habit steady and stay diversified.';
    marketUpdatedEl.textContent = `Updated at ${formatUpdateTime(new Date())} — BTC markets are open 24/7.`;
  } catch (error) {
    btcPriceEl.textContent = 'Unavailable';
    btcTipEl.textContent = 'Market data could not load. Try again later.';
    marketUpdatedEl.textContent = 'Unable to refresh market data at this time.';
  }
}

initTheme();
loadMarketPrice();
