import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [datetime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);
  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL+'/transaction';
    fetch(url,{
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({
        price,
        name,
        description,
        datetime})
    }).then(response => {
      response.json().then(json =>{
        setName('');
        setPrice('');
        setDescription('');
        setDateTime('');
        // getTransactions().then(setTransactions)
        setTransactions(prev => [...prev, json]);
      });
    });
    console.log(url);
  };

  useEffect (() => {
    // getTransactions().then(transactions => {
    //   setTransactions(transactions);
    // });
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL+'/transactions';
    const response = await fetch(url);
    console.log(response);
    return await response.json();
  }

  let balance = 0;
  for(const transaction of transactions) balance += transaction.price;
  balance = balance.toFixed(2);

  return (
    <main>
      <h1>{balance.split('.')[0]}<span>{balance.split('.')[1]}</span> </h1>
      <form onSubmit={addNewTransaction}>
        <div className='top'>
        <input type='text' 
                 value={name}
                 onChange={ev => setName(ev.target.value)}
                 placeholder='new samsung tv'/>
        </div>
        <div className='basic'>
          <input type='text' 
                 value={price}
                 onChange={ev => setPrice(ev.target.value)}
                 placeholder='price'/>
          <input type='datetime-local'
                 value={datetime}
                 onChange={ev => setDateTime(ev.target.value)}/>
        </div>
        <div className='description'>
          <input type='text' 
                 value={description}
                 onChange={ev => setDescription(ev.target.value)}
                 placeholder='description'/>
        </div>
        <button type='submit'>Add new transaction</button>
      </form>
      <div className='transactions'>
        {(transactions.length > 0) ? [...transactions].reverse().map(transaction => (
          <div className='transaction'>
            <div className='left'>
              <div className='name'>{transaction.name}</div>
              <div className='description'>{transaction.description}</div>
            </div>
            <div className='right'>
              <div className={'price '+(transaction.price < 0 ? 'red' : '')}> {(transaction.price < 0 ? '-$' : '$')}{Math.abs(transaction.price)}</div>
              <div className='datetime'>{transaction.datetime}</div>
            </div>
          </div>
        )) : null}
      </div>
    </main>
  );
}

export default App;
