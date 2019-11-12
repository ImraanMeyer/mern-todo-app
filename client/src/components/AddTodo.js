import React from 'react';

const AddTodo = ({ addTodo, setTodo }) => {

  return (
    <div style={{ display: 'flex' }}>
      <input
        type="text"
        name="todo"
        placeholder="Add a todo!"
        style={{ flex: '10' }}
        onChange={e => setTodo(e.target.value)}
        className='inputField'
        required
      />
      <input
        type="submit"
        value="Submit"
        className="btn"
        style={{ flex: '4' }}
        onClick={addTodo}
      />
    </div>
  );
}

export default AddTodo;