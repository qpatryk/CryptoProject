// ExchangeForm.jsx
import React, { useState } from 'react';

const ExchangeForm = ({ availableCoins }) => {
  const [fromCoin, setFromCoin] = useState('');
  const [toCoin, setToCoin] = useState('');
  const [amount, setAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [isExchanging, setIsExchanging] = useState(false);

  const handleFromCoinChange = (event) => {
    setFromCoin(event.target.value);
    setExchangeRate(null); // Reset exchange rate when coin changes
  };

  const handleToCoinChange = (event) => {
    setToCoin(event.target.value);
    setExchangeRate(null); // Reset exchange rate when coin changes
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const getExchangeRate = async (from, to) => {
    // Tutaj powinna znaleźć się logika do pobrania kursu wymiany z API
    // Poniższy kod to przykład, który zwraca fikcyjny kurs wymiany
    return 0.5; // Przykładowy kurs wymiany
  };

  const executeExchange = async (from, to, amount) => {
    // Tutaj powinna znaleźć się logika do wykonania wymiany za pomocą API
    // Poniższy kod to przykład, który symuluje wykonanie wymiany
    console.log(`Wymieniono ${amount} ${from} na ${to} po kursie ${exchangeRate}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!fromCoin || !toCoin || !amount) {
      alert('Proszę wypełnić wszystkie pola.');
      return;
    }
    setIsExchanging(true);
    try {
      const rate = await getExchangeRate(fromCoin, toCoin);
      setExchangeRate(rate);
      await executeExchange(fromCoin, toCoin, amount);
      alert(`Wymiana zakończona sukcesem. Kurs wymiany: ${rate}`);
    } catch (error) {
      console.error('Błąd wymiany:', error);
      alert('Wystąpił błąd podczas wymiany.');
    }
    setIsExchanging(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... reszta formularza ... */}
      <button type="submit" disabled={isExchanging}>Wymień</button>
    </form>
  );
};

export default ExchangeForm;
