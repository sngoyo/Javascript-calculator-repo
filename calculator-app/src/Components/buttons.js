import React from "react";
import {useState} from "react";
import calculator from "/home/salim/Documents/REACT_APPs/Javascript-calculator/Javascript-calculator-repo/calculator-app/src/Components/calculator.js";


function Button () {

    return (

        <div >
        <calculator />
        <div className="buttons-container">
        <div className="opsAndClearButton">

        <div className="Operators-container">
        <button id="clear">AC</button>

           <button id="divide" className="ops-button">/</button>
           <button id="multiply" className="ops-button">x</button>
           <button id="subtract" className="ops-button">-</button>
           <button id="add" className="ops-button">+</button>

           <button id="equals">=</button>
          <div className="numbersButtons">
             <button id="seven">7</button>
             <button id="eight">8</button>
             <button id="nine">9</button>
             <button id="four">4</button>
             <button id="five">5</button>
             <button id="six">6</button>
             <button id="one">1</button>
             <button id="two">2</button>
             <button id="three">3</button>
             <button id="zero">0</button>
             <button id="decimal">.</button>
        </div>
        </div>
        </div>



        </div>

        </div>

    );
}

export default Button;