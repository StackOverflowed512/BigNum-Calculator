import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const performCalculation = async (num1, num2, operation) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/calculate`, {
            num1,
            num2,
            operation,
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(
                error.response.data.error ||
                    "An error occurred during calculation"
            );
        }
        throw new Error(
            "Network error: Unable to reach the calculation service"
        );
    }
};
