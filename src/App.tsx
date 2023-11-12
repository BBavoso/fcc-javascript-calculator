// import { useState } from 'react'
import { useState } from "react";
import "./App.css";
import OperatorButton from "./components/OperatorButton";
import NumberButton from "./components/NumberButton";
import { operator, getOperatorIcon } from "./types/Operator";

function App() {
  const [resultDisplay, setResultDisplay] = useState("0");

  const maxCharactersInDisplay = 14;

  const [isNegative, setIsNegative] = useState(false);

  // Calculation Logic

  type calculationStates = operator | number;

  const [calculation, setCalculation] = useState(
    new Array<calculationStates>()
  );

  const calculationToDisplay = (): string => {
    let result = "";

    for (let i = 0; i < calculation.length; i++) {
      const currentCalculationState = calculation[i];
      result += " ";

      if (i % 2 == 0) {
        result += currentCalculationState;
      } else {
        result += getOperatorIcon(currentCalculationState as operator);
      }
    }

    return result;
  };

  const performCalulation = (calculations: calculationStates[]): number => {
    setTimeout(() => {}, 1000);
    let result = calculations[0] as number;
    let lastOperator: operator = calculation[1] as operator;
    for (let i = 2; i < calculations.length; i++) {
      let currentCalculationState = calculations[i];
      if (i % 2 == 1) {
        lastOperator = currentCalculationState as operator;
      } else {
        currentCalculationState = currentCalculationState as number;
        switch (lastOperator) {
          case "add":
            result += currentCalculationState;
            break;
          case "subtract":
            result -= currentCalculationState;
            break;
          case "multiply":
            result *= currentCalculationState;
            break;
          case "divide":
            result /= currentCalculationState;
            break;
        }
      }
    }
    return result;
  };

  // Handle Decimal Numbers
  type decimalStatus = "notDecimal" | "pressedDecimal" | "isDecimal";
  const [numberDecimalStatus, setNumberDecimalStatus] =
    useState<decimalStatus>("notDecimal");

  const handleDecimalButton = () => {
    if (
      numberDecimalStatus === "notDecimal" &&
      resultDisplay.length < maxCharactersInDisplay - 1
    ) {
      setResultDisplay(resultDisplay + ".");
      setNumberDecimalStatus("pressedDecimal");
    }
  };

  const handleEqualsButton = () => {
    if (calculation.length == 1) return;

    let displayAsNumber: number;
    if (isNegative) {
      displayAsNumber = -1 * Number(resultDisplay);
    } else {
      displayAsNumber = Number(resultDisplay);
    }

    setResultDisplay(
      performCalulation([...calculation, displayAsNumber]).toString()
    );

    setIsNegative(false);
    setCalculation([]);
  };

  const resetDisplay = (numberToResetTo: number) => {
    setResultDisplay(numberToResetTo.toString());
    setNumberDecimalStatus("notDecimal");
    setIsNegative(false);
  };

  const handleClearButton = () => {
    resetDisplay(0);
    setCalculation([]);
  };

  const handleNumberButton = (numberPressed: number) => {
    let newDisplayResult: string;
    if (resultDisplay.length >= maxCharactersInDisplay) {
      return;
    }
    if (numberDecimalStatus == "notDecimal" && resultDisplay == "0") {
      newDisplayResult = numberPressed.toString();
    } else {
      newDisplayResult = resultDisplay + numberPressed.toString();
    }
    setResultDisplay(newDisplayResult);
  };

  // Operator handling
  const handleOperatorButton = (operatorPressed: operator) => {
    if (resultDisplay == "0") {
      if (operatorPressed == "subtract") {
        setIsNegative(true);
      } else {
        setIsNegative(false);
        setCalculation([...calculation.slice(0, -1), operatorPressed]);
      }
      return;
    }

    let numberToAppend: number;
    if (isNegative) {
      numberToAppend = -1 * Number(resultDisplay);
    } else {
      numberToAppend = Number(resultDisplay);
    }
    setCalculation([...calculation, numberToAppend, operatorPressed]);

    resetDisplay(0);
  };

  return (
    <>
      <div id="calculator-container">
        <table id="calculator">
          <tbody>
            <tr>
              <td colSpan={4}>
                <p id="history">
                  {calculationToDisplay() + " " + resultDisplay}
                </p>
              </td>
            </tr>
            <tr>
              <td colSpan={4} onClick={() => console.log(calculation)}>
                <p id="display">
                  {isNegative ? "-" + resultDisplay : resultDisplay}
                </p>
              </td>
            </tr>
            <tr>
              <td id="clear" colSpan={4} onClick={handleClearButton}>
                AC
              </td>
            </tr>
            <tr>
              <NumberButton
                number={1}
                handleNumberPressed={handleNumberButton}
              />
              <NumberButton
                number={2}
                handleNumberPressed={handleNumberButton}
              />
              <NumberButton
                number={3}
                handleNumberPressed={handleNumberButton}
              />
              <OperatorButton
                operator="add"
                handleOperator={handleOperatorButton}
              />
            </tr>
            <tr>
              <NumberButton
                number={4}
                handleNumberPressed={handleNumberButton}
              />
              <NumberButton
                number={5}
                handleNumberPressed={handleNumberButton}
              />
              <NumberButton
                number={6}
                handleNumberPressed={handleNumberButton}
              />
              <OperatorButton
                operator="subtract"
                handleOperator={handleOperatorButton}
              />
            </tr>
            <tr>
              <NumberButton
                number={7}
                handleNumberPressed={handleNumberButton}
              />
              <NumberButton
                number={8}
                handleNumberPressed={handleNumberButton}
              />
              <NumberButton
                number={9}
                handleNumberPressed={handleNumberButton}
              />
              <OperatorButton
                operator="multiply"
                handleOperator={handleOperatorButton}
              />
            </tr>
            <tr>
              <NumberButton
                number={0}
                handleNumberPressed={handleNumberButton}
              />
              <td id="decimal" onClick={handleDecimalButton}>
                .
              </td>
              <td id="equals" onClick={handleEqualsButton}>
                =
              </td>
              <OperatorButton
                operator="divide"
                handleOperator={handleOperatorButton}
              />
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
