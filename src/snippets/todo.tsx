import { useState } from 'react';

function Todo() {
  const [todoList, setTodoList] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    setTodoList([...todoList, newTask]);
    setNewTask('');
  };

  // const deleteTask = (taskName) => {
  //   const newTodoList = todoList.filter((task) => {
  //     if (task === taskName) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   });
  //   setTodoList(newTodoList);
  // };

  // const deleteTask = (taskName) => {
  //   const newTodoList = todoList.filter((task) => {
  //     return task !== taskName;
  //   });
  //   setTodoList(newTodoList);
  // };

  // const deleteTask = (taskName) => {
  //   const newTodoList = todoList.filter((task) => task !== taskName);
  //   setTodoList(newTodoList);
  // };

  const deleteTask = (taskName: string) => {
    setTodoList(todoList.filter((task) => task !== taskName));
  };

  return (
    <>
      <h2>Todo Snippet</h2>
      <div>
        <input value={newTask} onChange={handleChange} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div>
        {todoList.map((task, index) => {
          return (
            <div key={index}>
              {task} <button onClick={() => deleteTask(task)}>X</button>{' '}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Todo;
