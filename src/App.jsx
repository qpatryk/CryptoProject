import React, { useState, useEffect } from 'react';
import { CoinGeckoClient } from 'coingecko-api-v3';
// ... other imports

import React, { useState, useEffect } from 'react';
import { CoinGeckoClient } from 'coingecko-api-v3';
// ... other imports

import React, { useState, useEffect } from 'react';
import { CoinGeckoClient } from 'coingecko-api-v3';
// ... other imports

import React, { useState, useEffect } from 'react';
import { CoinGeckoClient } from 'coingecko-api-v3';
// ... other imports

function App() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        // Create a new instance of CoinGeckoClient
        const client = new CoinGeckoClient({
            ws: true, // enable websocket
        });

        // Function to subscribe to WebSocket and handle incoming messages
        const subscribeToCoins = () => {
            return new Promise((resolve, reject) => {
                client.ws.subscribe('global', {
                    pingInterval: 10000,
                    reconnect: {
                        auto: true,
                        delay: 5000,
                        maxAttempts: 15
                    }
                });

                client.ws.on('message', (data) => {
                    if (data.type === 'global') {
                        resolve(data.data.coins);
                    }
                });

                client.ws.on('error', (error) => {
                    reject(error);
                });
            });
        };

        // Fetch data using the WebSocket connection
        const fetchData = async () => {
            try {
                const coinData = await subscribeToCoins();
                setCoins(coinData);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Optionally, you could set an error state and display a message to the user
            }
        };

        fetchData();

        // Cleanup function to close the WebSocket connection when the component unmounts
        return () => {
            client.ws.close();
        };
    }, []);

    // ... rest of the component

    return (
    // ... JSX markup
  );
}







export default App;



