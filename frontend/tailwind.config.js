/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                calculator: {
                    display: "#202020",
                    keypad: "#333333",
                    operation: "#FF9500",
                    number: "#505050",
                    function: "#666666",
                },
            },
        },
    },
    plugins: [],
};
