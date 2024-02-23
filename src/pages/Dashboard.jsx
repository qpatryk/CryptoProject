// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import CoinGecko from 'coingecko-api';

const Dashboard = () => {
    const [marketData, setMarketData] = useState({});
    const CoinGeckoClient = new CoinGecko();

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                // Pobierz globalne dane rynkowe
                const response = await CoinGeckoClient.global();
                if (response.success) {
                    setMarketData(response.data);
                } else {
                    console.error('Błąd podczas pobierania danych z CoinGecko');
                }
            } catch (error) {
                console.error('Błąd połączenia z CoinGecko:', error);
            }
        };

        fetchMarketData();
    }, []);

    return (
        <div className="dashboard">
            <h1>Panel główny</h1>
            <div className="market-summary">
                <h2>Podsumowanie rynku</h2>
                <p>Całkowita kapitalizacja rynkowa: ${marketData.total_market_cap?.usd.toLocaleString()}</p>
                <p>Całkowity wolumen 24h: ${marketData.total_volume?.usd.toLocaleString()}</p>
                <p>Dominacja Bitcoina: {marketData.market_cap_percentage?.btc.toFixed(2)}%</p>
                {/* Wyświetl więcej informacji rynkowych według potrzeb */}
            </div>
            {/* Dodaj dodatkowe sekcje lub komponenty do wyświetlania innych informacji na panelu */}
        </div>
    );
};

export default Dashboard;
