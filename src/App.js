import './App.css';
import Die from './Die';
import React from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [rolls, setRolls] = React.useState(0)
  const [dice, setDice] = React.useState(allNewDice)
  const [tenzies, setTenzies] = React.useState(false)
  const [seconds, setSeconds] = React.useState(0)
  const [bestTime, setBestTime] = React.useState(() => JSON.parse(localStorage.getItem('bestTime')) || '')

  React.useEffect(() => {
    let intervalId
    if (!tenzies) {
      intervalId = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [!tenzies]);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const allSameValue = dice.every(die => die.value === dice[0].value)

    if (allHeld && allSameValue) {
      setTenzies(true)
      setBestTime(seconds)
    }
  }
    , [dice])

  React.useEffect(() => {
    localStorage.setItem("bestTime", JSON.stringify(bestTime))
  }, [bestTime])


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
    if (tenzies) {
      setDice(allNewDice)
      setTenzies(false)
      setRolls(0)
      setSeconds(0)
    }
    setRolls(i => i + 1)
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
      {tenzies && (<Confetti />)}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <div className='info'>
        <p>Rolls: {rolls}</p>
        <p>Seconds: {seconds}s</p>
        <p>Best Time: {bestTime}s</p>
      </div>
    </main>
  );
}

export default App;