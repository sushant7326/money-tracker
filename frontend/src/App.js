import { useState } from 'react';
import './App.css';

function App() {

  const [name, setName] = useState('');
  const [datetime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL+'/transaction';
    fetch(url,{
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({name,description,datetime})
    }).then(response => {
      response.json().then(json =>{
        console.log('result', json);
      });
    });
    console.log(url);
  };

  return (
    <main>
      <h1>$399<span>.99</span> </h1>
      <form onSubmit={addNewTransaction}>
        <div className='basic'>
          <input type='text' 
                 value={name}
                 onChange={ev => setName(ev.target.value)}
                 placeholder='new samsung tv'/>
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
        <div className='transaction'>
          <div className='left'>
            <div className='name'>New Samsung TV</div>
            <div className='description'>it was time for a new tv</div>
          </div>
          <div className='right'>
            <div className='price red'>-$500</div>
            <div className='datetime'>20/10/2024 19:10</div>
          </div>
        </div>
        <div className='transaction'>
          <div className='left'>
            <div className='name'>Gig job new website</div>
            <div className='description'>website for uncle</div>
          </div>
          <div className='right'>
            <div className='price'>+$400</div>
            <div className='datetime'>20/10/2024 19:10</div>
          </div>
        </div>
        <div className='transaction'>
          <div className='left'>
            <div className='name'>iPhone</div>
            <div className='description'>old phone got smashed</div>
          </div>
          <div className='right'>
            <div className='price red'>-$900</div>
            <div className='datetime'>20/10/2024 19:10</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
