import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Coin = () => {
  const { id } = useParams(); // Get the coin ID from the URL
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch coin details');
        }
        const data = await response.json();
        setCoin(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCoinDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="w-full h-auto text-center bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-10">
      <h1 className="text-4xl font-bold">{coin.name}</h1>
      <img src={coin.image.large} alt={coin.name} className="mx-auto my-5 w-20 h-20" />
      <p className="text-lg">Symbol: {coin.symbol.toUpperCase()}</p>
      <p className="text-lg">Current Price: ${coin.market_data.current_price.usd.toLocaleString()}</p>
      <p className="text-lg">Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</p>
      <p className="text-lg">24h Change: {coin.market_data.price_change_percentage_24h.toFixed(2)}%</p>
      <p className="text-lg mt-5">{coin.description.en.split('. ')[0]}</p> {/* Display the first sentence of the description */}
    </div>
  );
};

export default Coin;