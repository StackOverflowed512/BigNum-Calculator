import React from "react";

const CalculatorButton = ({
    onClick,
    className,
    children,
    disabled = false,
}) => {
    const baseClasses =
        "h-14 font-medium rounded-lg text-xl flex items-center justify-center shadow-md transition-all duration-150";
    const enabledClasses = "active:scale-95 active:shadow-sm";
    const disabledClasses = "opacity-50 cursor-not-allowed";

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${
                disabled ? disabledClasses : enabledClasses
            } ${className}`}
        >
            {children}
        </button>
    );
};

export default CalculatorButton;
