from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__)

data = {
    "name": "Dave",
    "rtl": 'there is none'
}

@app.route('/api', methods=['GET'])
def index():
    return data

@app.route('/add', methods=['POST'], strict_slashes=False)
def add_something():
    print(request)
    #name = request['name']
    #body = request['rtl']
    global data
    data = request.get_json()
    # data = {
    #     'name': 'poop',
    #     'rtl': 'peep',
    # }

    return data


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0') 