import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
    const [user, setUser] = useState({});

    const initialValues = {
        'Enter name': ['text', 'name'],
        'Enter email': ["email", 'email'],
        'Enter password': ['password', 'password']
    }

    const handleChange = e => {
        e.persist();
        setUser(user => ({ ...user, [e.target.name]: e.target.value }));
    };

    const handlSubmit = e => {
        e.preventDefault();
        console.log(user)

        axios.post('/users/register', user).then(res => console.log(res.data))
    }

    return (
        <form>
            {
                Object.entries(initialValues).map(([placeholder, type]) => (
                    <input type={type[0]} name={type[1]} placeholder={placeholder} onChange={handleChange} required={true} />
                ))
            }
            <button type="submit" onClick={handlSubmit}>
                --- Sign Up ---
            </button>
        </form>
    )
}

export default Register;