from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def index():
    return {
        "name": "Dave",
        "rtl": 'there is none'
    }

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0') 