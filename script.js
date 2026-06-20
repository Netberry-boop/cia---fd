const btcPriceEl = document.getElementById('btcPrice');
const btcTipEl = document.getElementById('btcTip');

async function loadMarketPrice() {
  try {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json');
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    const price = Number(data.bpi.USD.rate.replace(',', ''));
    btcPriceEl.textContent = `$${price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    btcTipEl.textContent = price > 50000
      ? 'Bitcoin is strong. Consider low-cost index funds for long-term balance.'
      : 'Bitcoin is affordable now. Keep a steady saving habit and diversify safely.';
  } catch (error) {
    btcPriceEl.textContent = 'Unavailable';
    btcTipEl.textContent = 'Market data could not load. Check your connection and refresh.';
  }
}

loadMarketPrice();
