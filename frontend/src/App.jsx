import React from "react";
import Calculator from "./components/Calculator";

function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Big Number Calculator
                </h1>
                <p className="text-gray-600">
                    Handles arbitrarily large numbers with precision
                </p>
            </header>

            <main className="w-full max-w-md">
                <Calculator />
            </main>

            <footer className="mt-8 text-center text-gray-500 text-sm">
                <p>© 2025 Big Number Calculator Project</p>
            </footer>
        </div>
    );
}

export default App;
