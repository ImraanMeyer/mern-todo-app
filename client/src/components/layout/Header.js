import React from 'react';

export default function Header({ getTodos }) {

  return (
    <header style={headerStyle}>
      <h1><button onClick={getTodos} style={{ border: 'none', background: 'none' }}>Todo List</button></h1>
    </header>
  );
}

const headerStyle = {
  background: '#ccc',
  color: 'white',
  height: '10vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottomLeftRadius: '1em',
  borderBottomRightRadius: '1em',
  marginBottom: '2em'
};
