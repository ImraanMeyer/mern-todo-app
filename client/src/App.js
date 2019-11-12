import React, { Component, useState, useEffect } from 'react';
import './App.css';
import Todo from './components/Todo';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import FadeIn from 'react-fade-in';

import axios from 'axios';
import Register from './components/auth/Register';


const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const getTodos = () => axios.get('/todos').then(res => setTodos(res.data));

  const addTodo = (e) => {
    e.preventDefault();
    console.log(todo)
    axios.post('/todos/new', {todo}).then(() => getTodos());
  }  

  const deleteTodo = id => axios.delete(`/todos/${id}`).then(() => getTodos());

  useEffect(() => {
    getTodos()
  }, [setTodos])

  return(
    <div className="App">
      <div className="container">
        <Register />
      </div>
    </div>
  )


  // return (
  //   <div className="App">
  //     <div className="container">
  //       <Header getTodos={getTodos} />
  //       <AddTodo addTodo={addTodo} setTodo={setTodo} />
  //       {
  //         todos.map(todoItem => (
  //           <FadeIn>
  //             <Todo todoItem={todoItem} deleteTodo={deleteTodo} />
  //           </FadeIn>
  //         ))
  //       }
  //     </div>
  //   </div>
  // )
}

export default App;