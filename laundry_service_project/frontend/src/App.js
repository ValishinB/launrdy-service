
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({
    customer_name: '',
    service_type: '',
    item_type: '',
    date: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/reservations')
      .then(response => setReservations(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/reservations', form)
      .then(response => {
        setReservations([...reservations, response.data]);
        setForm({ customer_name: '', service_type: '', item_type: '', date: '' });
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Laundry Service Reservations</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="customer_name" placeholder="Customer Name" value={form.customer_name} onChange={handleChange} required />
        <input type="text" name="service_type" placeholder="Service Type" value={form.service_type} onChange={handleChange} required />
        <input type="text" name="item_type" placeholder="Item Type" value={form.item_type} onChange={handleChange} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <button type="submit">Add Reservation</button>
      </form>
      <ul>
        {reservations.map(res => (
          <li key={res.id}>{res.customer_name} - {res.service_type} - {res.item_type} - {res.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
