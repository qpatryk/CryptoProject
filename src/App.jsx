import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CoinCard from './components/CoinCard';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import ReactSelect from 'react-select';
import Chart from 'react-chartjs-2';
import './App.css';

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100';

function App() {
  const [coins, setCoins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('market_cap_desc');
  const [filters, setFilters] = useState({ type: 'all' });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCoins(data);
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const filteredCoins = coins
    .filter((coin) => coin.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((coin) => filters.type === 'all' || coin.type === filters.type)
    .sort((a, b) => {
      if (sortBy === 'market_cap_desc') {
        return b.market_cap - a.market_cap;
      } else if (sortBy === 'market_cap_asc') {
        return a.market_cap - b.market_cap;
      } else if (sortBy === 'price_desc') {
        return b.current_price - a.current_price;
      } else if (sortBy === 'price_asc') {
        return a.current_price - b.current_price;
      }
    });

  return (
    <>
      <header>
        <h1>Krypto Giełda</h1>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/charts">Wykresy</Link>
        </nav>
      </header>

      <main>
        <section className="coins-list">
          <h2>Lista Kryptowalut</h2>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <SortableContainer>
            {filteredCoins
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((coin) => (
                <SortableElement key={coin.id} index={coin.id}>
                  <CoinCard coin={coin} />
                </SortableElement>
              ))}
          </SortableContainer>
          <Pagination page={page} setPage={setPage} totalPages={Math.ceil(filteredCoins.length / itemsPerPage)} />
        </section>

        <section className="filters">
          <ReactSelect
            options={[
              { value: 'all', label: 'Wszystkie' },
              { value: 'bitcoin', label: 'Bitcoin' },
              { value: 'ethereum', label: 'Ethereum' },
              { value: 'tether', label: 'Tether' },
              { value: 'binance-coin', label: 'Binance Coin' },
            ]}
            value={filters.type}
            onChange={(newValue) => setFilters({ ...filters, type: newValue.value })}
          />
        </section>

        <section className="charts">
          <Chart type="line" data={{ ... }} />
        </section>
      </main>
    </>
  );
}

export default App;
