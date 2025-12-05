// The useCallback Hook returns a memoized callback function.
// This allows us to isolate resource intensive functions so that they will not automatically run on every render.
// The useCallback Hook only runs when one of its dependencies update.
// This can improve performance by preventing unnecessary re-renders of child components.

import { useState, useCallback, memo } from 'react';

// Child component that receives a callback function
const ExpensiveChild = memo(({ onClick, count }: { onClick: () => void; count: number }) => {
  console.log('ExpensiveChild rendered');
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={onClick}>Increment</button>
    </div>
  );
});

// Without useCallback - the function is recreated on every render
// This causes ExpensiveChild to re-render even when count doesn't change
function WithoutCallback() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  const handleClick = () => {
    setCount(c => c + 1);
  };

  return (
    <>
      <p>Other State: {otherState}</p>
      <button onClick={() => setOtherState(s => s + 1)}>Update Other State</button>
      <ExpensiveChild onClick={handleClick} count={count} />
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        (Check console - ExpensiveChild re-renders when otherState changes)
      </p>
    </>
  );
}

// With useCallback - the function is memoized and only recreated when dependencies change
// This prevents ExpensiveChild from re-rendering when otherState changes
function WithCallback() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty dependency array - function never changes

  return (
    <>
      <p>Other State: {otherState}</p>
      <button onClick={() => setOtherState(s => s + 1)}>Update Other State</button>
      <ExpensiveChild onClick={handleClick} count={count} />
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        (Check console - ExpensiveChild only re-renders when count changes)
      </p>
    </>
  );
}

// Main component showing all examples
function UseCallback() {
  return (
    <div>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>Without useCallback</h2>
        <WithoutCallback />
      </div>
      <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
        <h2>With useCallback</h2>
        <WithCallback />
      </div>
    </div>
  );
}

export default UseCallback;

