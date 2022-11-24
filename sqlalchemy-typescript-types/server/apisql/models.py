from dataclasses import dataclass
from py_ts_interfaces import Interface

from apisql import db


@dataclass
class Initiative(db.Model, Interface):
    id: int = db.Column(db.Integer, primary_key=True)
    name: str = db.Column(db.String(100))
    activities = db.relationship('Activity', backref='initiative')


@dataclass
class Activity(db.Model, Interface):
    id: int = db.Column(db.Integer, primary_key=True)
    name: str = db.Column(db.String(100))
    initiative_id: int = db.Column(db.Integer, db.ForeignKey('initiative.id'))
