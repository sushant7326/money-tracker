import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // Set default values for each input
  const [name, setName] = useState('Default Item');
  const [price, setPrice] = useState('0.00');
  const [datetime, setDateTime] = useState(new Date().toISOString().slice(0, 16)); // ISO format for datetime-local
  const [description, setDescription] = useState('Default description');
  const [transactions, setTransactions] = useState([]);

  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';

    // Use the default values if inputs are empty
    const transactionData = {
      name: name || 'Default Item',
      price: price || '0.00',
      description: description || 'Default description',
      datetime: datetime || new Date().toISOString().slice(0, 16),
    };

    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(transactionData),
    }).then((response) => {
      response.json().then((json) => {
        setName('Default Item');
        setPrice('0.00');
        setDescription('Default description');
        setDateTime(new Date().toISOString().slice(0, 16));
        setTransactions((prev) => [...prev, json]);
      });
    });
    console.log(url);
  }

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + '/transactions';
    const response = await fetch(url);
    return await response.json();
  }

  let balance = 0;
  for (const transaction of transactions) balance += parseFloat(transaction.price);
  balance = balance.toFixed(2);

  return (
    <main>
      <h1>{balance.split('.')[0]}<span>{balance.split('.')[1]}</span> </h1>
      <form onSubmit={addNewTransaction}>
        <div className="top">
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="new samsung tv"
          />
        </div>
        <div className="basic">
          <input
            type="number"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
            placeholder="price"
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(ev) => setDateTime(ev.target.value)}
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="description"
          />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 ? (
          [...transactions].reverse().map((transaction, index) => (
            <div className="transaction" key={index}>
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                <div className={'price ' + (transaction.price < 0 ? 'red' : '')}>
                  {(transaction.price < 0 ? '-$' : '$')}{Math.abs(transaction.price)}
                </div>
                <div className="datetime">{transaction.datetime}</div>
              </div>
            </div>
          ))
        ) : null}
      </div>
    </main>
  );
}

export default App;
