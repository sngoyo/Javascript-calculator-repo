import React from "react";
import {useState} from "react";
import * as math from "mathjs";

function Button () {
    const [calc, setCalc] = useState("");
    const [result, setResult] = useState("0");
    const [userInput, setUserInput] = useState("0");


    const handleClear = () => {
       setCalc("");
        setResult("");
        setUserInput(0);
    }

    const ops = ["/", "*", "+", ".", "-", "="];
    const opsDot = ["."];

    //The below function restricts operators not to be followed by another operator and also should not be the first input entered
    const setInput= (value) => {
        if (/[0-9/+*-]+[=]{1}[-0-9]+/g.test(calc)){//setting new calculation after previous calculation(that is after "=")
          setCalc(result + value);
          setUserInput(value);

        } else {

        let calcPlusValue = calc + value;

        //Checking to avoid operators being entered before any numbers.
        if ( ops.includes(value) && calc === ""){
           return;

        //Checking to avoid double or triple operators being entered at once and also if operator "-" is the last one should allow to proceed with calculation
        } else if (ops.includes(value) &&  ops.includes(calc.slice(-1))){

          if (value === "-" && calc.slice(-1) !== "-"){
            setCalc(calc + value);
            setUserInput(value);

          } else if (value === "-" && calc.split("-").length-1 === 1){// Counting "-" in Calc
            setCalc(calc + value);
            setUserInput(value);

          } else if ( /[0-9]+[/+*-]{2}/g.test(calc) && calc.slice(-1) === "-") {// Allowing calculation like "9+-4=5 -r 8+-9=-1"
            setCalc(calc);


          } else {
            setCalc(calc.replace(calc.slice(-1), value));
            setUserInput(value);
        }


       //Checking to avoid number from starting with zeros at the begining like 0345 or 099.
      } else if ( (calcPlusValue.indexOf("0") === 0 && calcPlusValue.charAt(1) !== 0 && calcPlusValue.charAt(1) !== ".")) {
        setCalc(value);
        setUserInput(value);

       //Checking to avoid numbers starting with zeroes to have multiple "." character like "0.32.4.3"
      } else if (calc.indexOf("0") === 0 && opsDot.includes(calcPlusValue.charAt(1))){
           if (calcPlusValue.indexOf(".") === calcPlusValue.lastIndexOf(".")) {
            setCalc(calcPlusValue);
            setUserInput(value);
           }

       //Checking to avoid number to start with more than one zeroes like 0003;
      } else if(/^0+/.test(calcPlusValue)){
        setCalc(calcPlusValue.replace(/^0+/, "0"));
        setUserInput(value);

       //Checking to avoid numbers from having multiple "." in their value like 2.3.4.5.6
      } else if (calcPlusValue.indexOf(".") === calcPlusValue.lastIndexOf(".")){
        setCalc(calcPlusValue);
        setUserInput(value);
      }
    }
  }

    //Function for computing numbers
    const setCalculator = (value) => {
          setResult(math.evaluate(calc).toString());
          setCalc((calc + value + math.evaluate(calc)).toString());
    }

    return (
        <div >
        <div id="display">
          <div className="firstDisplay" > {calc ?calc:""}&nbsp;</div>
          <div className="secDisplay" style={{color: "white"}} >{result ? result : userInput}&nbsp;</div>
        </div>
        <div className="buttons-container">
           <button id="clear" className="span-two" onClick={handleClear} >AC</button>
           <button id="divide" className="ops-button" onClick={() => setInput("/")} >/</button>
           <button id="multiply" className="ops-button" onClick={() => setInput("*")}>x</button>
           <button id="seven" onClick={() => setInput("7")}>7</button>
           <button id="eight" onClick={() => setInput("8")}>8</button>
           <button id="nine" onClick={() => setInput("9")}>9</button>
           <button id="subtract" className="ops-button" onClick={() => setInput("-")}>-</button>
           <button id="four" onClick={() => setInput("4")}>4</button>
           <button id="five" onClick={() => setInput("5")}>5</button>
           <button id="six" onClick={() => setInput("6")}>6</button>
           <button id="add" className="ops-button" onClick={() => setInput("+")}>+</button>
           <button id="one" onClick={() => setInput("1")}>1</button>
           <button id="two" onClick={() => setInput("2")}>2</button>
           <button id="three" onClick={() => setInput("3")}>3</button>
           <button id="equals" className="span-two-vertically"  onClick={() => setCalculator("=")}>=</button>
           <button id="zero" className="span-two" onClick={() => setInput("0")}>0</button>
           <button id="decimal" onClick={() => setInput(".")} >.</button>
        </div>
        </div>
    );
}

export default Button;