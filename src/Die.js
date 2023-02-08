import './Die.css';
import React from 'react';

function Die(props) {

  return (
    <div className='die'>
        <p>{props.number}</p>
    </div>
  );
}

export default Die;