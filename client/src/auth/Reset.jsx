import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Layout from '../core/Layout';

import axios from 'axios';
import jwt from 'jsonwebtoken';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Reset = ({ match }) => {
	// Forgot State
	const [ values, setValues ] = useState({
		name: '',
		token: '',
		newPassword: '',
		buttonText: 'Reset Password'
	});

	useEffect(() => {
		let token = match.params.token;
		const { name } = jwt.decode(token);

		if (token) setValues({ ...values, name, token });
	}, []);

	const { name, token, newPassword, buttonText } = values;

	const handleChange = (e) => {
		setValues({ ...values, newPassword: e.target.value });
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, buttonText: 'Submitting' });

		axios
			.put(`/api/reset-password`, { newPassword, resetPasswordLink: token })
			.then((response) => {
				// // console.log('RESET PASSWORD SUCCESS', response);
				toast.success(response.data.message);

				setValues({ ...values, buttonText: 'Done' });
			})
			.catch((error) => {
				// // console.log('RESET PASSWORD ERROR', error.response.data);
				toast.error(error.response.data.error);
				setValues({ ...values, buttonText: 'Reset Password' });
			});
	};

	const passwordResetForm = () => (
		<form>
			<div className="form-group">
				<label className="text-muted">Password</label>
				<input
					onChange={handleChange}
					value={newPassword}
					type="password"
					className="form-control"
					placeholder="insert new password"
					required
				/>
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
				<h1 className="p-5 text-center lead">Hey {name}, type in your new password</h1>
				{passwordResetForm()}
			</div>
		</Layout>
	);
};

export default withRouter(Reset);
