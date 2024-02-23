// App.jsx
// ... other imports

function App() {
    const [coins, setCoins] = useState([]);
    // ... other state variables

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coinData = await getCoins();
                setCoins(coinData);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Optionally, you could set an error state and display a message to the user
            }
        };

        fetchData();
        // Since getCoins sets up a WebSocket subscription, you may not need to poll with setInterval
        // However, if you do need to set up an interval for any reason, you can uncomment the following lines:
        // const interval = setInterval(fetchData, 10000);
        // return () => clearInterval(interval);
    }, []);

    // ... rest of the component

    return (
        // ... JSX markup
    );
}

export default App;
