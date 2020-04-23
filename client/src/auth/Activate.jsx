import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

import Layout from '../core/Layout';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

const Activate = ({match}) => {
	// Signup State
	const [ values, setValues ] = useState({
		name: '',
		token: '',
		show: true
	});

    // Grab the token when state changes
    useEffect(() => {
        let token = match.params.token;
        let {name} = jwt.decode(token);


        if(token) {
            setValues({...values, name, token})
        }
    }, []);

	const { name, token, /* show */ } = values;
    

	const clickSubmit = (e) => {
		e.preventDefault();

		axios
			.post(`/api/account-activation`, { token })
			.then((response) => {
				// console.log('ACCOUNT ACTIVATION', response);

                setValues({ ...values, show: false });
				toast.success(response.data.message);
			})
			.catch((error) => {
                // console.log('ACCOUNT ACTIVATION', error.response.data.error);
				toast.error(error.response.data.error);
			});
	};

	const actvationLink = () => (
		<div className="text-center">
			<h1 className="p-5">Hey {name}, Ready to activate your account?</h1>

			<button className="btn btn-outline-primary" onClick={clickSubmit}>
				Activate Account
			</button>
		</div>
	);

	return (
		<Layout>
			<div className="col-md-6 offset-md-3">
				<ToastContainer />
				{actvationLink()}
			</div>
		</Layout>
	);
};

export default Activate;
