
from app import db

class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    service_type = db.Column(db.String(100), nullable=False)
    item_type = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(50), nullable=False)

db.create_all()
