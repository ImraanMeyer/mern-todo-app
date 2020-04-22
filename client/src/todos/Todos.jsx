import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../auth/Helpers';

const Todos = ({ history }) => {
	// Signup State
	const [ values, setValues ] = useState({
		todo: '',
		todos: [],
		buttonText: 'Add Todo',
		loading: true
	});

	const { todo, todos, buttonText, loading } = values;

	const token = getCookie('token');

	useEffect(() => {
		loadTodos();
	}, []);

	const loadTodos = () => {
		axios({
			method: 'GET',
			url: `/todos/${isAuth()._id}`,
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((response) => {
				// console.log('PRIVATE PROFILE UPDATE', response)
				const todos = response.data;
				setValues({ ...values, todos, todo: '', loading: false });
			})
			.catch((error) => {
				// console.log('LOAD TODOS ERROR', error.response.data.error);
				if (error.response.status === 401) signout(() => history.push('/'));
			});
	};

	// Get user input from form
	const handleChange = (e) => setValues({ ...values, todo: e.target.value });

	const addTodo = (e) => {
		e.preventDefault();

		axios({
			method: 'POST',
			url: `/todos/new/${isAuth()._id}`,
			data: { todo },
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).then((response) => {
			// console.log('ADD TODO RESPONSE', response);
			const { todos } = response.data;

			updateUser(response, () => {
				setValues({ ...values, buttonText: '...', todos });
				toast.success('Todo succesfully added');
			});
			setValues({ ...values, buttonText: 'Add Todo' });
			loadTodos();
		});
	};

	const todoForm = () => (
		<form>
			<div className="form-group">
				<label className="text-muted">Insert a Todo!</label>
				<input onChange={handleChange} value={todo} type="text" className="form-control" />
			</div>

			<div>
				<button className="btn btn-dark mb-5 btn-block" onClick={addTodo} >
					{buttonText}
				</button>
			</div>
		</form>
	);

	return (
		<Layout>
			<div className="col-md-6 offset-md-3">
				<ToastContainer />
				<h1 className="p-5 text-center">Todo Page</h1>
				{todoForm()}

				{loading == true ? (
					<h1 className="pt-5 text-center ">Loading...</h1>
				) : todos.length == 0 ? (
					<React.Fragment>
						<h3 className="pt-5 text-center">No Todos!</h3>
						<p className="lead text-center">Add a todo by completing the form</p>
					</React.Fragment>
				) : (
					todos.map((todo) => <li className="pt-1" key={todo}>{todo}</li>)
				)}
			</div>
		</Layout>
	);
};

export default Todos;
