import React, { useState, useEffect } from "react";
import CalculatorButton from "./CalculatorButton";
import CalculatorDisplay from "./CalculatorDisplay";
import OperationHistory from "./OperationHistory";
import { performCalculation } from "../services/calculatorService";

const Calculator = () => {
    const [displayValue, setDisplayValue] = useState("");
    const [storedValue, setStoredValue] = useState("");
    const [operation, setOperation] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [calculating, setCalculating] = useState(false);
    const [error, setError] = useState("");
    const [history, setHistory] = useState([]);

    // Clear error when display value changes
    useEffect(() => {
        if (error) {
            setError("");
        }
    }, [displayValue]);

    const clearAll = () => {
        setDisplayValue("");
        setStoredValue("");
        setOperation(null);
        setWaitingForOperand(false);
        setCalculating(false);
        setError("");
    };

    const inputDigit = (digit) => {
        if (waitingForOperand) {
            setDisplayValue(String(digit));
            setWaitingForOperand(false);
        } else {
            setDisplayValue(
                displayValue === "0" ? String(digit) : displayValue + digit
            );
        }
    };

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplayValue("0");
            setWaitingForOperand(false);
        }

        if (displayValue.indexOf(".") === -1) {
            setDisplayValue(displayValue + ".");
        }
    };

    const handleOperator = (nextOperator) => {
        const inputValue = displayValue;

        if (operation && !waitingForOperand) {
            performOperation();
        } else {
            setStoredValue(inputValue);
        }

        setOperation(nextOperator);
        setWaitingForOperand(true);
    };

    const performOperation = async () => {
        if (!operation || !storedValue) return;

        const num1 = storedValue;
        const num2 = displayValue;

        if (operation === "divide" && num2.trim() === "0") {
            setError("Division by zero is not allowed");
            return;
        }

        setCalculating(true);

        try {
            const result = await performCalculation(num1, num2, operation);

            let displayResult;
            let remainderValue = null;

            if (operation === "divide") {
                displayResult = result.quotient;
                remainderValue = result.remainder;
            } else {
                displayResult = result.result;
            }

            setDisplayValue(displayResult);
            setStoredValue(displayResult);
            setOperation(null);
            setWaitingForOperand(true);

            // Add to history
            setHistory([
                {
                    num1,
                    num2,
                    operation: getOperationSymbol(operation),
                    result: displayResult,
                    remainder: remainderValue,
                },
                ...history.slice(0, 9), // Keep only the last 10 operations
            ]);
        } catch (err) {
            setError(err.message || "Calculation error");
        } finally {
            setCalculating(false);
        }
    };

    const getOperationSymbol = (op) => {
        switch (op) {
            case "add":
                return "+";
            case "subtract":
                return "-";
            case "multiply":
                return "×";
            case "divide":
                return "÷";
            default:
                return op;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Display */}
            <CalculatorDisplay
                value={displayValue || "0"}
                secondaryValue={storedValue}
                operation={operation ? getOperationSymbol(operation) : ""}
                isCalculating={calculating}
            />

            {/* Error display */}
            {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            {/* Keypad */}
            <div className="bg-calculator-keypad p-2 grid grid-cols-4 gap-2">
                {/* Function keys row */}
                <CalculatorButton
                    onClick={clearAll}
                    className="bg-calculator-function text-white"
                >
                    AC
                </CalculatorButton>
                <CalculatorButton
                    onClick={() => setDisplayValue(displayValue.slice(0, -1))}
                    className="bg-calculator-function text-white"
                    disabled={!displayValue || calculating}
                >
                    ⌫
                </CalculatorButton>
                <CalculatorButton
                    onClick={() =>
                        setDisplayValue(
                            displayValue.startsWith("-")
                                ? displayValue.substring(1)
                                : "-" + displayValue
                        )
                    }
                    className="bg-calculator-function text-white"
                    disabled={calculating}
                >
                    +/-
                </CalculatorButton>
                <CalculatorButton
                    onClick={() => handleOperator("divide")}
                    className="bg-calculator-operation text-white"
                    disabled={calculating}
                >
                    ÷
                </CalculatorButton>

                {/* Numbers and operations */}
                <CalculatorButton
                    onClick={() => inputDigit(7)}
                    className="bg-calculator-number text-white"
                    disabled={calculating}
                >
                    7
                </CalculatorButton>
                <CalculatorButton
                    onClick={() => inputDigit(8)}
                    className="bg-calculator-number text-white"
                    disabled={calculating}
                >
                    8
                </CalculatorButton>
                <CalculatorButton
                    onClick={() => inputDigit(9)}
                    className="bg-calculator-number text-white"
                    disabled={calculating}
                >
                    9
                </CalculatorButton>
                <CalculatorButton
                    onClick={() => handleOperator("multiply")}
                    className="bg-calculator-operation text-white"
                    disabled={calculating}
                >
                    ×
                </CalculatorButton>

                <CalculatorButton
                    onClick={() => inputDigit(4)}
                    className="bg-calculator-number text-white"
                    disabled={calculating}
                >
                    4
                </CalculatorButton>
                <CalculatorButton
                    onClick={() => inputDigit(5)}
                    className="bg-calculator-number text-white"
                    disabled={calculating}
                >
                    5
                </CalculatorButton>
                <CalculatorButton
                    onClick={() => inputDigit(6)}
                    className="bg-calculator-number text-white"
                    disabled={calculating}
                >
                    6
                </CalculatorButton>
                <CalculatorButton
                    onClick={() => handleOperator("subtract")}
                    className="bg-calculator-operation text-white"
                    disabled={calculating}
                >
                    -
                </CalculatorButton>

                <CalculatorButton
                    onClick={() => inputDigit(1)}
                    className="bg-calculator-number text-white"
                    disabled={calculating}
                >
                    1
                </CalculatorButton>
                <CalculatorButton
                    onClick={() => inputDigit(2)}
                    className="bg-calculator-number text-white"
                    disabled={calculating}
                >
                    2
                </CalculatorButton>
                <CalculatorButton
                    onClick={() => inputDigit(3)}
                    className="bg-calculator-number text-white"
                    disabled={calculating}
                >
                    3
                </CalculatorButton>
                <CalculatorButton
                    onClick={() => handleOperator("add")}
                    className="bg-calculator-operation text-white"
                    disabled={calculating}
                >
                    +
                </CalculatorButton>

                <CalculatorButton
                    onClick={() => inputDigit(0)}
                    className="bg-calculator-number text-white col-span-2"
                    disabled={calculating}
                >
                    0
                </CalculatorButton>
                <CalculatorButton
                    onClick={inputDecimal}
                    className="bg-calculator-number text-white"
                    disabled={true} // Disabled as we're working with integers
                >
                    .
                </CalculatorButton>
                <CalculatorButton
                    onClick={performOperation}
                    className="bg-calculator-operation text-white"
                    disabled={calculating || !operation}
                >
                    =
                </CalculatorButton>
            </div>

            {/* History section */}
            <OperationHistory history={history} />
        </div>
    );
};

export default Calculator;
