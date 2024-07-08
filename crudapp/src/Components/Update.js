import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Update() {
    const [deliveryAddress, setdeliveryAddress] = useState('');
    const [ deliveryFee,  setdeliveryFee] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setdeliveryAddress(localStorage.getItem('deliveryAddress'));
        setdeliveryFee(localStorage.getItem('deliveryFee'));
        
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:9595/Deliveries/update/${localStorage.getItem('id')}`, {
            
            deliveryAddress,
            deliveryFee
        })
            .then(response => {
                console.log(response.data);
                navigate('/');
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="container">
            <h2>Update Data</h2>
            <form  onSubmit={handleUpdate}>
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
