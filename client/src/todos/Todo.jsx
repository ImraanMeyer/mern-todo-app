import React from 'react';
import './todo.css'
// import trashIcon from '../assets/trash-alt-regular.svg';

const Todo = ({ todoObject, deleteTodo, handleEdit }) => {
	const { _id, todo } = todoObject;

	return (
		<div className="list-group-item">
			<div className="todo-content">
				<h4>{todo}</h4>
				<div className="d-flex icons">
					<button className="btn btn-primary">
						<i className="pl-2 far fa-edit" onClick={handleEdit.bind(_id, _id)} />
					</button>
					<button className="btn btn-danger" onClick={deleteTodo.bind(_id,_id)}>
						<i className="pl-2 far fa-trash-alt" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Todo;

// <img style={{color: 'black'}} src={trashIcon} alt="far fa-trash-alt font awesome icon" />
