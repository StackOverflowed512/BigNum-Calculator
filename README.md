# Big Number Calculator

A web application for performing arithmetic operations on arbitrarily large numbers.

## Features

- Addition, subtraction, multiplication, and division of very large integers
- Clean, user-friendly interface
- History of recent calculations
- Efficient algorithms for large number operations

## Technology Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Python with Flask
- **Communication**: RESTful API

## Getting Started

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- npm or yarn

### Installation

#### Using Docker (recommended)

1. Make sure you have Docker and Docker Compose installed
2. Clone the repository
3. Run the application:
   ```
   docker-compose up
   ```
4. Open your browser and navigate to `http://localhost:3000`

#### Manual Setup

1. Clone the repository

2. Setup Backend:
   ```
   cd backend
   pip install -r requirements.txt
   python app.py
   ```

3. Setup Frontend:
   ```
   cd frontend
   npm install
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## How It Works

- The frontend provides a calculator interface to input numbers and operations
- When a calculation is performed, the frontend sends a request to the backend API
- The backend uses specialized algorithms for large number arithmetic:
  - Addition and subtraction: Direct use of Python's arbitrary-precision integers
  - Multiplication: Karatsuba algorithm for efficient multiplication of large numbers
  - Division: Efficient implementation with quotient and remainder calculation

