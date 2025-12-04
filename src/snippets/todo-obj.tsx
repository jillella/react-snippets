import { useState } from 'react';

function TodoObj() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    const task = {
      id: todoList.length + 1,
      taskName: newTask,
      completed: false,
    };
    setTodoList([...todoList, task]);
    setNewTask('');
  };

  const completeTask = (id) => {
    setTodoList(todoList.map((task) => {
      if (task.id === id) {
        return { ...task, completed: true };
      }
      return task;
    }));
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

  const deleteTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  return (
    <>
      <h2>Todo Object Snippet</h2>
      <div>
        <input value={newTask} onChange={handleChange} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div>
        {todoList.map((task) => {
          return (
            <div
              key={task.id}
              style={{
                backgroundColor: task.completed ? 'green' : 'transparent',
                padding: '4px',
                margin: '2px 0',
              }}
            >
              {task.taskName}{' '}
              <button onClick={() => completeTask(task.id)}>Complete</button>{' '}
              <button onClick={() => deleteTask(task.id)}>X</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TodoObj;
