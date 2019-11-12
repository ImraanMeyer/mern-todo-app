import React from 'react';

const TodoItem = ({ todoItem, deleteTodo }) => {
  const { _id, todo} = todoItem;

  const getStyle = () => {
    return {
      background: 'f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted'
    };
  };

  return (
    <div style={getStyle()}>
      <div className='todoItem'>
        <h5>{todo}</h5>
        <button
          style={btnStyle}
          className='delBtn'
          onClick={deleteTodo.bind(_id, _id)}
        >
          x
          </button>
      </div>
    </div>
  );
}

const btnStyle = {
  background: '#c56666',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '.7em',
  float: 'right'
};

export default TodoItem;