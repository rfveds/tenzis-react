import './Die.css';
import React from 'react';

function Die(props) {

  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }


  return (
    <div className="die" style={styles} onClick={props.holdDice}>
      <p>{props.number}</p>
    </div >
  );
}

export default Die;