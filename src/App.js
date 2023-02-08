import './App.css';
import Die from './Die';
import React from 'react';

function App() {

  function allNewDice() {
    const numbers = []
    for (let i = 0; i < 10; i++) {
      const randomNumber = Math.floor(Math.random() * 6 + 1)
      numbers.push(randomNumber)
    }
    return numbers
  }

  const [dice, setDice] = React.useState(allNewDice)

  const diceElements = dice.map(number => <Die number={number}/>)

  return (
    <main>
      <div className='dice-container'>
        {diceElements}
      </div>

    </main>
  );
}

export default App;
