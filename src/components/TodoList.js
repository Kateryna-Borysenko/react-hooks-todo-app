import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]); //сделать считывание с localStorage

  // ***************  ADD  *************** //
  const addTodo = todo => {
    //проверка если пустая сртока и много пробелов между словами 
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos); //задали новое состояние для тудушек 
    // console.log([...todos]); //лучше смотреть в сomponents
  };

  // ***************  UPDATE  *************** //
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    // меняем преведущего состояния 
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  // ***************  REMOVE  *************** //
  //!== - doesn't match / not equal Иквэл
  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id); //вернёт новый массив без удалённого эл-та

    setTodos(removedArr);
  };

  // ***************  COMPLETE  *************** //
  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        //находим по id  инвертируем значение если 
        todo.isComplete = !todo.isComplete; //toggle between true and false 
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos} //все тудушки
        completeTodo={completeTodo} //выполнинная тудушка
        removeTodo={removeTodo} //обработчик удаление тудушки
        updateTodo={updateTodo} //обработчик обновления  тудушки
      />
    </>
  );
}

export default TodoList;
