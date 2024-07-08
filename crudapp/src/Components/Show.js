import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Show() {
    const navigate = useNavigate();
    const [deliveries, setDeliveries] = useState([]);

    const getDeliveries = () => {
        axios.get('http://localhost:9595/Deliveries/all')
            .then(response => {
                console.log(response.data);
                setDeliveries(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleRegister = () => {
        navigate("/register");
    };

    const handleLocalStorage = (orderId, deliveryDate, deliveryAddress, deliveryFee) => {
        localStorage.setItem("orderId", orderId);
        localStorage.setItem("deliveryDate", deliveryDate);
        localStorage.setItem("deliveryAddress", deliveryAddress);
        localStorage.setItem("deliveryFee", deliveryFee);
       
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:9595/deliveries/delete/${id}`)
            .then(response => {
                console.log(response.data);
                getDeliveries();
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        getDeliveries();
    }, []);

    return (
        <div className="container mt-3 mb-3">
            <button className="btn btn-info m-2" onClick={handleRegister}>Register</button>
            <h3>Delevery List</h3>
            <div className="row mt-3 mb-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">orderId</th>
                            <th scope="col">deliveryDate</th>
                            <th scope="col">deliveryAddress</th>
                            <th scope="col">deliveryFee</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveries.map(deliveries => (
                            <tr key={deliveries._id}>
                                <td>{deliveries.orderId}</td>
                                <td>{deliveries.deliveryDate}</td>
                                <td>{deliveries.deliveryAddress}</td>
                                <td>{deliveries.deliveryFee}</td>
                              
                                <td>
                                    <Link to="/update">
                                        <button
                                            className="btn btn-success"
                                            onClick={() => handleLocalStorage(deliveries._id,  deliveries.deliveryAddress, deliveries.deliveryFee)}
                                        >
                                            Update
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(deliveries._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
