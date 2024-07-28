
from flask import request, jsonify
from app import app, db
from models import Reservation

@app.route('/reservations', methods=['POST'])
def add_reservation():
    data = request.get_json()
    new_reservation = Reservation(
        customer_name=data['customer_name'],
        service_type=data['service_type'],
        item_type=data['item_type'],
        date=data['date']
    )
    db.session.add(new_reservation)
    db.session.commit()
    return jsonify({'message': 'Reservation created'})

@app.route('/reservations', methods=['GET'])
def get_reservations():
    reservations = Reservation.query.all()
    return jsonify([{
        'id': res.id,
        'customer_name': res.customer_name,
        'service_type': res.service_type,
        'item_type': res.item_type,
        'date': res.date
    } for res in reservations])
