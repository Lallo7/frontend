import React from 'react';
import './Concentration.css';

function Concentration() {
  return (
    <div className="concentration-guide">
      <div className="concentration-heading">
        <hr />
        <h1>CONCENTRATION GUIDE</h1>
        <hr/>
      </div>  
      <div className="magicpattern-container">
        <div className="magicpattern">
          <h2>Parfum</h2><br />
          Concentration <br /> of perfume oils <br />  20-40%
        </div>
        <div className="magicpattern">
          <h2>Eau de Parfum</h2><br />
          Concentration of <br /> perfume oils <br />15-20%
        </div>
        <div className="magicpattern">
          <h2>Eau de Toilette</h2><br />
          Concentration of <br />perfume oils <br />5-15%
        </div>
        <div className="magicpattern">
          <h2>Eau de Cologne</h2><br />
          Concentration of <br /> perfume oils <br /> 2-5%
        </div>
      </div>
    </div>
  );
}

export default Concentration;
