import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    test('renders app title', () => {
        render(<App />);
        const titleElement = screen.getByText(/Krypto Giełda/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('renders dashboard and portfolio links', () => {
        render(<App />);
        const dashboardLink = screen.getByText(/Dashboard/i);
        const portfolioLink = screen.getByText(/Portfolio/i);
        expect(dashboardLink).toBeInTheDocument();
        expect(portfolioLink).toBeInTheDocument();
    });

    test('fetches and displays coin data', async () => {
        render(<App />);

        const coinCards = await screen.findAllByTestId('coin-card');
        expect(coinCards).toHaveLength(10); // default items per page

        const firstCoinName = coinCards[0].textContent;
        expect(firstCoinName).toBeTruthy();
    });

    test('filters coins by type', async () => {
        render(<App />);

        const defiCoins = await screen.findAllByTestId('coin-card-defi');
        expect(defiCoins).toHaveLength(0); // no filters initially

        userEvent.selectOptions(screen.getByTestId('filter-select'), ['defi']);

        const defiCoinsFiltered = await screen.findAllByTestId('coin-card-defi');
        expect(defiCoinsFiltered).toHaveLengthGreaterThan(0);
    });

    test('sorts coins by market cap and price', async () => {
        render(<App />);

        let coinCards = await screen.findAllByTestId('coin-card');
        let firstCoin = coinCards[0];
        let lastCoin = coinCards[coinCards.length - 1];

        userEvent.selectOptions(screen.getByTestId('sort-select'), ['market_cap_asc']);
        coinCards = await screen.findAllByTestId('coin-card');
        expect(coinCards[0]).toHaveTextContent(firstCoin.textContent);
        expect(coinCards[coinCards.length - 1]).toHaveTextContent(lastCoin.textContent);

        userEvent.selectOptions(screen.getByTestId('sort-select'), ['price_desc']);
        coinCards = await screen.findAllByTestId('coin-card');
        expect(coinCards[0]).toHaveTextContent(lastCoin.textContent);
        expect(coinCards[coinCards.length - 1]).toHaveTextContent(firstCoin.textContent);
    });
});
