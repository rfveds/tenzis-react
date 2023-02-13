import './Die.css';
import React from 'react';

function Die(props) {

  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }

  const a = []

  for(let i = 1; i <= props.number; i++){
    a.push(
      <div class={`dot die${props.number}--${i}`}></div>
    )
  }

  return (
    <div className="die" style={styles} onClick={props.holdDice}>
      {a}
    </div >
  );
}

export default Die;