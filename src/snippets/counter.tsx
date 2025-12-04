import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  // Function to increment and decrement the count
  function increment() {
    // setCount((count) => count + 1);
    setCount(count + 1);
  }
  function decrement() {
    // setCount((count) => count - 1);
    setCount(count - 1);
  }

  // Reset the count to 0
  function reset() {
    setCount(0);
  }

  // Arrow function to increment and decrement the count
  // const increment = () => {
  //   setCount((count) => count + 1);
  // }
  // const decrement = () => {
  //   setCount((count) => count - 1);
  // }

  return (
    <>
      <h2>Counter Snippet</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <button onClick={() => setCount((count) => count + 1)}>Increment</button>
      <button onClick={() => setCount((count) => count - 1)}>Decrement</button>

      <br />

      {/* write two functions to increment and decrement the count */}
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>

    </>
  )
}

export default Counter;
