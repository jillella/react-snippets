// The React useMemo Hook returns a memoized value.
// Think of memoization as caching a value so that it does not need to be recalculated.
// The useMemo Hook only runs when one of its dependencies update.
// This can improve performance by preventing expensive calculations from running on every render.

import { useState, useMemo } from 'react';

// Expensive calculation function
const expensiveCalculation = (num: number) => {
  console.log("Calculating...");
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

// Without useMemo - the expensive function runs on every render
// When changing the count or adding a todo, you will notice a delay in execution
function WithoutMemo() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState<string[]>([]);
  const calculation = expensiveCalculation(count);

  const increment = () => {
    setCount((c) => c + 1);
  };

  const addTodo = () => {
    setTodos((t) => [...t, "New Todo"]);
  };

  return (
    <div>
      <div>
        <h2>My Todos</h2>
        {todos.map((todo, index) => {
          return <p key={index}>{todo}</p>;
        })}
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          Note that this example executes the expensive function also when you click on the Add Todo button.
        </p>
      </div>
    </div>
  );
}

// With useMemo - the expensive function only runs when count changes
// Adding todos won't trigger the expensive calculation
function WithMemo() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState<string[]>([]);
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  const addTodo = () => {
    setTodos((t) => [...t, "New Todo"]);
  };

  return (
    <div>
      <div>
        <h2>My Todos</h2>
        {todos.map((todo, index) => {
          return <p key={index}>{todo}</p>;
        })}
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          The expensive function only runs when count changes, not when todos are added.
        </p>
      </div>
    </div>
  );
}

// Main component showing all examples
function UseMemo() {
  return (
    <div>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>Without useMemo</h2>
        <WithoutMemo />
      </div>
      <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
        <h2>With useMemo</h2>
        <WithMemo />
      </div>
    </div>
  );
}

export default UseMemo;

