from flask import Flask, request, jsonify
from flask_cors import CORS
from arithmetic.add import add_large_numbers
from arithmetic.sub import subtract_large_numbers
from arithmetic.mul import karatsuba
from arithmetic.div import divide_large_numbers_efficient

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/calculate', methods=['POST'])
def calculate():
    data = request.json
    num1 = data.get('num1', '0')
    num2 = data.get('num2', '0')
    operation = data.get('operation')
    
    try:
        # Validate inputs
        if not num1.lstrip('-').isdigit() or not num2.lstrip('-').isdigit():
            return jsonify({'error': 'Invalid input: Numbers must contain only digits'}), 400
            
        # Perform calculation based on operation
        if operation == 'add':
            result = add_large_numbers(num1, num2)
            return jsonify({'result': result})
        
        elif operation == 'subtract':
            result = subtract_large_numbers(num1, num2)
            return jsonify({'result': result})
        
        elif operation == 'multiply':
            # Convert to int for karatsuba function
            result = str(karatsuba(int(num1), int(num2)))
            return jsonify({'result': result})
        
        elif operation == 'divide':
            if num2.strip('0') == '':
                return jsonify({'error': 'Division by zero is not allowed'}), 400
                
            quotient, remainder = divide_large_numbers_efficient(num1, num2)
            return jsonify({
                'quotient': quotient,
                'remainder': remainder
            })
        
        else:
            return jsonify({'error': f'Unknown operation: {operation}'}), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)