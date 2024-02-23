function CoinCard({ coin }) {
    return (
        <div>
            <h2>{coin.name}</h2>
            <p>Price: {coin.current_price}</p>
            <p>Change: {coin.price_change_percentage_24h}</p>
            <button onClick={() => addToFavorites(coin)}>Add to Favorites</button>
        </div>
    );
}
