import { CoinGeckoClient } from 'coingecko-api-v3';

const client = new CoinGeckoClient({
    ws: true, // enable websocket
});

const getCoins = () => {
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
}

export default getCoins;
