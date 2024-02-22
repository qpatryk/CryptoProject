import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CoinCard from './components/CoinCard';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import ReactSelect from 'react-select';
import Chart from 'react-chartjs-2';
import Charts from './components/Charts'; // Import komponentu Charts
import './App.css';

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100';

function App() {
  const [coins, setCoins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('market_cap_desc');
  const [filters, setFilters] = useState({ type: 'all' });

  const data = { // Przygotowanie danych dla wykresu
    labels: ['1 dzień temu', '2 dni temu', '3 dni temu', '4 dni temu', '5 dni temu'],
    datasets: [
      {
        label: 'Cena Bitcoina',
        data: [10000, 9500, 9800, 10200, 10500], // Przykładowe dane, zastąp je prawdziwymi
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

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



//przykładowe dane do wykresu (należy je zastąpić prawdziwymi danymi)



/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}


