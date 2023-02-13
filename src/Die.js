import './Die.css';
import React from 'react';

function Die(props) {

  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }

  const cube = []

  for (let i = 1; i <= props.number; i++) {
    cube.push(
      <div key={i} className={`dot die${props.number}--${i}`}></div>
    )
  }

  return (
    <div className="die" style={styles} onClick={props.holdDice}>
      {cube}
    </div >
  );
}

export default Die;