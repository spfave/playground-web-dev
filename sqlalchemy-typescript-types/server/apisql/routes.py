from apisql import app
from flask import jsonify


@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/initiative', methods=['GET'])
def get_initiatives():
    data = {"test": "test JSON"}
    return jsonify(data)


@app.route('/initiative/<int:id>', methods=['Get'])
def get_initiative(id):
    data = {"init_id": id}
    return jsonify(data)
