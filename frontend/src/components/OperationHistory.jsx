import React from "react";

const OperationHistory = ({ history }) => {
    if (!history || history.length === 0) {
        return null;
    }

    return (
        <div className="mt-6 bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
                History
            </h3>

            <div className="overflow-y-auto max-h-40">
                {history.map((entry, index) => (
                    <div
                        key={index}
                        className="border-b border-gray-200 py-2 last:border-b-0"
                    >
                        <div className="text-sm text-gray-500">
                            <span>
                                {entry.num1} {entry.operation} {entry.num2}
                            </span>
                        </div>
                        <div className="text-md font-medium">
                            {entry.result}
                            {entry.remainder && entry.remainder !== "0" && (
                                <span className="text-sm text-gray-500 ml-2">
                                    (remainder: {entry.remainder})
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OperationHistory;
