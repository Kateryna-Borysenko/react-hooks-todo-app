import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  //начальное состояние '', если редактируем то заполняем инпут значением
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null); //!фокус

  useEffect(() => {
    inputRef.current.focus();//!фокус
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  // обработчик submit 
  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000), //формируем id
      text: input
    });
    setInput(''); //состояние '' после сабмита 
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {/* // ***************  RENDER по условию   *************** // */}
      {props.edit ? (
        <>
          <input
            placeholder='Update your item' //появится только если полностью удалить старое значение
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef} //!фокус
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef} //!фокус
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
