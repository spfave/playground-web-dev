from flask import jsonify

from apisql import app, db
from apisql.models import Initiative  # , Activity


@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/initiative', methods=['GET'])
def get_initiatives():
    # initiatives = db.session.execute(db.select(Initiative))
    initiatives = Initiative.query.all()
    return jsonify({"data": initiatives})


@app.route('/initiative/<int:id>', methods=['Get'])
def get_initiative(id):
    initiative = Initiative.query.get(id)
    return jsonify({"data": initiative})


# @app.route('/initiative', methods=['GET'])
# def get_initiatives():
#     data = {"test": "test JSON"}
#     return jsonify(data)


# @app.route('/initiative/<int:id>', methods=['Get'])
# def get_initiative(id):
#     data = {"init_id": id}
#     return jsonify(data)
