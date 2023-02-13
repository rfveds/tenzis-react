import './App.css';
import Die from './Die';
import React from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = React.useState(allNewDice)
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const allSameValue = dice.every(die => die.value === dice[0].value)

    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }
    , [dice])


  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice())
    }
    return newDice
  }

  function generateNewDice() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid()
    }
  }
  function rollDice() {
    if(tenzies){
      setDice(allNewDice)
      setTenzies(false)
    } 
    setDice(oldDice => oldDice.map((die) => {
      return die.isHeld ?
        die :
        generateNewDice()
    }))
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map((die) => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  const diceElements = dice.map(die =>
    <Die 
      key={die.id} 
      number={die.value} 
      isHeld={die.isHeld} 
      holdDice={() => holdDice(die.id)} 
    />)

  return (
    <main>
      { tenzies && (<Confetti />)}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
