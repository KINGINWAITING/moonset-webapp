"use client";

import { useEffect, useState } from 'react';

type Cryptocurrency = {
  id: number;
  name: string;
  symbol: string;
  price: number;
  percent_change_24h: number;
};

export function CryptoTicker() {
  const [cryptos, setCryptos] = useState<Cryptocurrency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        // Sample data for demonstration
        const sampleData: Cryptocurrency[] = [
          { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 65400.65, percent_change_24h: 2.9 },
          { id: 2, name: 'Ethereum', symbol: 'ETH', price: 3534.47, percent_change_24h: 1.8 },
          { id: 3, name: 'Solana', symbol: 'SOL', price: 146.85, percent_change_24h: 5.1 },
          { id: 4, name: 'Cardano', symbol: 'ADA', price: 0.446, percent_change_24h: -1.4 },
          { id: 5, name: 'Polkadot', symbol: 'DOT', price: 6.33, percent_change_24h: 2.6 },
          { id: 6, name: 'Dogecoin', symbol: 'DOGE', price: 0.124, percent_change_24h: 3.7 },
          { id: 7, name: 'Chainlink', symbol: 'LINK', price: 13.85, percent_change_24h: 4.2 },
          { id: 8, name: 'Litecoin', symbol: 'LTC', price: 82.35, percent_change_24h: 1.5 },
          { id: 9, name: 'Ripple', symbol: 'XRP', price: 0.524, percent_change_24h: 0.8 },
          { id: 10, name: 'Moonset', symbol: 'MOON', price: 0.824, percent_change_24h: 12.5 },
          { id: 11, name: 'Tether', symbol: 'USDT', price: 1.00, percent_change_24h: 0.1 },
          { id: 12, name: 'BNB', symbol: 'BNB', price: 578.24, percent_change_24h: 3.2 },
          { id: 13, name: 'USD Coin', symbol: 'USDC', price: 1.00, percent_change_24h: 0.05 },
          { id: 14, name: 'Avalanche', symbol: 'AVAX', price: 34.76, percent_change_24h: 4.8 },
          { id: 15, name: 'Polygon', symbol: 'MATIC', price: 0.68, percent_change_24h: 2.2 }
        ];
        
        setCryptos(sampleData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch crypto data:', error);
        setLoading(false);
      }
    };

    fetchCryptoData();
    
    // Update data every 60 seconds
    const intervalId = setInterval(fetchCryptoData, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div className="h-10 bg-[#050110]"></div>;
  }

  return (
    <div className="w-full overflow-hidden h-10 relative crypto-ticker-container">
      {/* Background gradient with stars */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-[#050110] to-blue-900/80 z-0">
        <div className="absolute inset-0 ticker-stars-bg"></div>
      </div>
      
      {/* Primary ticker row */}
      <div className="ticker-scroll relative z-10 h-full flex items-center">
        <div className="ticker-content">
          {cryptos.map((crypto) => (
            <div key={`primary-${crypto.id}`} className="ticker-item">
              <span className="ticker-symbol">{crypto.symbol}</span>
              <span className="ticker-price">${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span 
                className={`ticker-change ${crypto.percent_change_24h >= 0 ? 'ticker-positive' : 'ticker-negative'}`}
              >
                {crypto.percent_change_24h >= 0 ? '+' : ''}{crypto.percent_change_24h.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
        
        {/* Duplicate content for seamless looping */}
        <div className="ticker-content">
          {cryptos.map((crypto) => (
            <div key={`duplicate-${crypto.id}`} className="ticker-item">
              <span className="ticker-symbol">{crypto.symbol}</span>
              <span className="ticker-price">${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span 
                className={`ticker-change ${crypto.percent_change_24h >= 0 ? 'ticker-positive' : 'ticker-negative'}`}
              >
                {crypto.percent_change_24h >= 0 ? '+' : ''}{crypto.percent_change_24h.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
        
        {/* Triple duplicate for extra safety */}
        <div className="ticker-content">
          {cryptos.map((crypto) => (
            <div key={`triple-${crypto.id}`} className="ticker-item">
              <span className="ticker-symbol">{crypto.symbol}</span>
              <span className="ticker-price">${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span 
                className={`ticker-change ${crypto.percent_change_24h >= 0 ? 'ticker-positive' : 'ticker-negative'}`}
              >
                {crypto.percent_change_24h >= 0 ? '+' : ''}{crypto.percent_change_24h.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
        
        {/* Quadruple duplicate for good measure */}
        <div className="ticker-content">
          {cryptos.map((crypto) => (
            <div key={`quad-${crypto.id}`} className="ticker-item">
              <span className="ticker-symbol">{crypto.symbol}</span>
              <span className="ticker-price">${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span 
                className={`ticker-change ${crypto.percent_change_24h >= 0 ? 'ticker-positive' : 'ticker-negative'}`}
              >
                {crypto.percent_change_24h >= 0 ? '+' : ''}{crypto.percent_change_24h.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .crypto-ticker-container {
          border-bottom: 1px solid rgba(139, 92, 246, 0.3);
          box-shadow: 0 1px 15px rgba(139, 92, 246, 0.15);
        }
        
        .ticker-stars-bg {
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        
        .ticker-scroll {
          display: flex;
          white-space: nowrap;
        }
        
        .ticker-content {
          display: inline-flex;
          animation: ticker-scroll 120s linear infinite;
        }
        
        .ticker-item {
          display: inline-flex;
          align-items: center;
          margin: 0 0.75rem;
          padding: 0.15rem 0.75rem;
          border-radius: 9999px;
          background: rgba(30, 27, 75, 0.4);
          border: 1px solid rgba(139, 92, 246, 0.2);
          backdrop-filter: blur(8px);
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.1);
          transition: all 0.3s ease;
        }
        
        .ticker-item:hover {
          background: rgba(139, 92, 246, 0.15);
          border-color: rgba(139, 92, 246, 0.4);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.25);
          transform: translateY(-2px);
        }
        
        .ticker-symbol {
          font-weight: 600;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.95);
          text-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
          margin-right: 0.5rem;
          letter-spacing: 0.025em;
        }
        
        .ticker-price {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.8);
          margin-right: 0.5rem;
        }
        
        .ticker-change {
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
        }
        
        .ticker-positive {
          color: #10b981;
          background: rgba(16, 185, 129, 0.15);
          text-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
        }
        
        .ticker-negative {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.15);
          text-shadow: 0 0 8px rgba(239, 68, 68, 0.3);
        }
        
        @keyframes ticker-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
} 