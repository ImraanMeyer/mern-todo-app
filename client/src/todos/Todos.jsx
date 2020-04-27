import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../auth/Helpers';
import Todo from './Todo';

const Todos = ({ history }) => {
	// Signup State
	const [ values, setValues ] = useState({
		todo: '',
		editTodoId: '',
		todos: [],
		buttonText: 'Add Todo',
		loading: true,
		editSelected: true
	});

	const { editTodoId,editSelected, todo, todos, buttonText, loading } = values;

	const token = getCookie('token');

	useEffect(() => {
		loadTodos();
	}, []);

	const loadTodos = () => {
		axios({
			method: 'GET',
			url: `/api/todos`,
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((response) => {
				// // console.log('PRIVATE PROFILE UPDATE', response)
				const todos = response.data.todos;
				setValues({ ...values, todos, todo: '', loading: false, buttonText: 'Add Todo' });
			})
			.catch((error) => {
				// // console.log('LOAD TODOS ERROR', error.response.data.error);
				if (error.response.status === 401) signout(() => history.push('/'));
			});
	};

	// Get user input from form
	const handleChange = (e) => setValues({ ...values, todo: e.target.value });

	const addTodo = (e) => {
		e.preventDefault();
		axios({
			method: 'POST',
			url: `/api/todos/new`,
			data: { todo },
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((response) => {
				setValues({ ...values, todo: ' ' });
				toast.success(response.data.message);
			})
			.then(loadTodos)
			.catch((error) => {
				toast.error(error.response.data.error);
			})
	};

	const deleteTodo = id => {
		axios({
			method: 'DELETE',
			url: `/api/todos/remove/${id}`,
			data: { todo },
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(response => {
				toast.success(response.data.message)
			})
			.then(loadTodos)
			.catch(error => {
				toast.error(error.response.data.error)
			})
	}

	const handleEdit = async (id) => {
		await axios({
			method: 'GET',
			url: `/api/todos/${id}`,
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).then(response => {
			setValues({...values, todo: response.data.todo, editTodoId: response.data._id, buttonText: 'Edit Todo', editSelected: false })
		})
		.catch((error) => {
			toast.error(error.response.data.error)
		})
	}

	const applyEdit = (e) => {
		e.preventDefault()
		axios({
			method: 'PUT',
			url: `/api/todos/edit/${editTodoId}`,
			data: {todo},
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).then(response => {
			toast.success(response.data.message)
			setValues({...values, editTodoId: ' ', todo: ' ', buttonText: 'Add Todo', editSelected: true })
		}).then(loadTodos)
		.catch(error =>{
			toast.error(error.response.data.error)
		})
	}

	// console.log(todo)


	const todoForm = () => (
		<form>
			<div className="form-group">
				<label className="text-muted">Insert a Todo!</label>
				<input onChange={handleChange} value={todo} type="text" required className="form-control" />
			</div>

			<div>
				<button className="btn btn-dark mb-5 btn-block" onClick={editSelected ? addTodo : applyEdit}>
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
					<ul className="list-group list-group-flush">{todos.map((todoObject) => <Todo todoObject={todoObject} key={todoObject._id} deleteTodo={deleteTodo} handleEdit={handleEdit} />)}</ul>
				)}
			</div>
		</Layout>
	);
};

export default Todos;
