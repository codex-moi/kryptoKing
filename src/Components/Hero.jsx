import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
        if (!response.ok) {
          throw new Error('Failed to fetch coins');
        }
        const data = await response.json();
        setCoins(data);
        setFilteredCoins(data); // Initialize filteredCoins with all coins
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  // Update filteredCoins whenever searchTerm changes
  useEffect(() => {
    const results = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCoins(results);
  }, [searchTerm, coins]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <>
      <div className="w-full h-auto text-center tracking-tight pt-[10%] bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-10">
        <h2 className="text-3xl md:text-4xl font-bold">Largest <br /> Crypto Marketplace</h2>
        <p className="text-base md:text-lg mt-2">Buy, sell, and manage your cryptocurrency portfolio with KryptoKing.</p>
        <div className="flex flex-col md:flex-row justify-center items-center mt-10 bg-[#0f172a] w-[90%] md:w-[50%] lg:w-[30%] mx-auto rounded p-2">
          <input
            type="text"
            placeholder="Search digital currencies..."
            className="bg-transparent p-2 focus:outline-none w-full md:w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
          <AiOutlineSearch size={20} className="mt-2 md:mt-0 md:ml-2" />
        </div>
        <div className="flex justify-between items-center mt-10 w-full">
          <div className="flex flex-col w-[90%] md:w-[80%] lg:w-[60%] mx-auto bg-[#0f172a] rounded p-2">
            <div className="hidden md:flex justify-between font-bold">
              <p>#</p>
              <p>Coin</p>
              <p>Price</p>
              <p>24h Change</p>
              <p>Market Cap</p>
            </div>
            <div className="flex flex-col">
              {/* Map through filteredCoins instead of coins */}
              {filteredCoins.map((coin, index) => (
                <div
                  key={coin.id}
                  className="flex flex-col md:flex-row justify-between mt-2 p-2 bg-gray-800 rounded md:rounded-none md:bg-transparent"
                >
                  <p className="text-sm md:text-base">{index + 1}</p>
                  <Link
                    to={`/coin/${coin.id}`}
                    className="text-blue-500 hover:underline text-sm md:text-base"
                  >
                    {coin.name}
                  </Link>
                  <p className="text-sm md:text-base">${coin.current_price.toLocaleString()}</p>
                  <p
                    className={`text-sm md:text-base ${
                      coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                  <p className="text-sm md:text-base">${coin.market_cap.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;