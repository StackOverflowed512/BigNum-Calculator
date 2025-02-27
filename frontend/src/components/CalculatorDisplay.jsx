import React from "react";

const CalculatorDisplay = ({
    value,
    secondaryValue,
    operation,
    isCalculating,
}) => {
    // Format the display values for better readability
    const formatDisplayValue = (val) => {
        if (!val) return "0";

        // For very large numbers, show truncated version with ellipsis
        if (val.length > 15) {
            return `${val.substring(0, 5)}...${val.substring(val.length - 5)}`;
        }

        return val;
    };

    // Full value available on hover
    const displayValue = formatDisplayValue(value);

    return (
        <div className="bg-calculator-display text-white p-4 rounded-t-lg mb-2">
            {/* Secondary display showing previous number and operation */}
            <div className="h-6 text-right text-gray-400 text-sm mb-1 overflow-hidden">
                {secondaryValue && (
                    <span title={secondaryValue}>
                        {formatDisplayValue(secondaryValue)} {operation}
                    </span>
                )}
            </div>

            {/* Main display */}
            <div className="flex justify-between items-center">
                <div
                    className="text-3xl font-medium text-right w-full overflow-x-auto whitespace-nowrap"
                    title={value}
                >
                    {isCalculating ? (
                        <span className="animate-pulse">Calculating...</span>
                    ) : (
                        displayValue
                    )}
                </div>
            </div>

            {/* Show full number in smaller text if truncated */}
            {value && value.length > 15 && !isCalculating && (
                <div className="mt-2 text-xs text-gray-400 overflow-hidden text-ellipsis">
                    <span>{value}</span>
                </div>
            )}
        </div>
    );
};

export default CalculatorDisplay;
