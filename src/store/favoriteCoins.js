function FavoriteCoins() {
    const favorite = useSelector(state => state.favorite);

    return (
        <ul>
            {favorite.map(coin => (
                <li key={coin.id}>
                    {coin.name}
                    <button onClick={() => removeFromFavorite(coin)}>Remove</button>
                </li>
            ))}
        </ul>
    );
}
