import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [orderId, setOrderId] = useState('');
    const [ deliveryDate, setDeliovryDate] = useState('');
    const [deliveryAddress, setdeliveryAddress] = useState('');
    const [ deliveryFee,  setdeliveryFee] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9595/Deliveries/add', {
            orderId,
            deliveryDate,
            deliveryAddress,
            deliveryFee
        })
            .then(response => {
                console.log(response.data);
                navigate("/");
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="container">
            <h2>Register for Delivery System</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>orderId</label>
                    <input
                        type="text"
                        className="form-control"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>deliveryDate</label>
                    <input
                        type="text"
                        className="form-control"
                        value={deliveryDate}
                        onChange={(e) => setDeliovryDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>deliveryAddress</label>
                    <input
                        type="text"
                        className="form-control"
                        value={deliveryAddress}
                        onChange={(e) => setdeliveryAddress(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>deliveryFee</label>
                    <input
                        type="text"
                        className="form-control"
                        value={deliveryFee}
                        onChange={(e) => setdeliveryFee(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
        </div>
    );
}