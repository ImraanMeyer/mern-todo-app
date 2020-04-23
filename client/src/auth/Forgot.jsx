import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import Layout from '../core/Layout';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Forgot = ({ history }) => {
	// Forgot State
	const [ values, setValues ] = useState({
		email: 'imraan.meyer97@gmail.com',
		buttonText: 'Request Password Reset Link'
	});

	const { email, buttonText } = values;

	const handleChange = (name) => (e) => {
		setValues({ ...values, [name]: e.target.value });
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, buttonText: 'Submitting' });

		axios
			.put(`/api/forgot-password`, { email })
			.then((response) => {
				console.log('FORGOT PASSWORD SUCCESS', response);
                toast.success(response.data.message)
                
                setValues({...values, buttonText: 'Requested'})
			})
			.catch((error) => {
                console.log('FORGOT PASSWORD ERROR', error.response.data);
				toast.error(error.response.data.error);
				setValues({ ...values, buttonText: 'Request Password Reset Link' });
			});
	};

	const passwordForgotForm = () => (
		<form>
			<div className="form-group">
				<label className="text-muted">Email</label>
				<input onChange={handleChange('email')} value={email} type="email" className="form-control" />
			</div>

			<div>
				<button className="btn btn-primary" onClick={clickSubmit}>
					{buttonText}
				</button>
			</div>
		</form>
	);

	return (
		<Layout>
			<div className="col-md-6 offset-md-3">
				<ToastContainer />
				<h1 className="p-5 text-center">Forgot Password</h1>
				{passwordForgotForm()}
			</div>
		</Layout>
	);
};

export default withRouter(Forgot);
