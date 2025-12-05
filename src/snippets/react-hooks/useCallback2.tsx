// The useCallback Hook is used to memoize a callback function.
// Memoizing a function means caching the result of a function so that it does not need to be recalculated.
// The useCallback function only re-executes when one of its dependencies changes value.
// This allows us to isolate resource intensive functions so that they will not automatically run on every render.

import { useState, useCallback, memo } from 'react';

// Child component that receives a function prop
const Button = memo(({ onClick, text }: { onClick: () => void; text: string }) => {
  console.log(`${text} button rendered`);
  return <button onClick={onClick}>{text}</button>;
});

// Parent component without useCallback
// This function is recreated on every render, causing all Button components to re-render
function WithoutCallbackExample() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // These functions are recreated on every render
  const handleClick1 = () => {
    setCount1(count1 + 1);
  };

  const handleClick2 = () => {
    setCount2(count2 + 1);
  };

  console.log("Parent rendered");
  return (
    <div>
      <h2>Without useCallback:</h2>
      <p>Count 1: {count1}</p>
      <p>Count 2: {count2}</p>
      <Button onClick={handleClick1} text="Button 1" />
      <Button onClick={handleClick2} text="Button 2" />
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        (Check console - all components re-render when clicking either button)
      </p>
    </div>
  );
}

// Parent component with useCallback
// These functions are memoized and only recreated when their dependencies change
// When clicking Button 1, only Parent and Button 1 should re-render
// When clicking Button 2, only Parent and Button 2 should re-render
function WithCallbackExample() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // These functions are memoized and only recreated when dependencies change
  const handleClick1 = useCallback(() => {
    setCount1(count1 + 1);
  }, [count1]);

  const handleClick2 = useCallback(() => {
    setCount2(count2 + 1);
  }, [count2]);

  console.log("Parent rendered");
  return (
    <div>
      <h2>With useCallback:</h2>
      <p>Count 1: {count1}</p>
      <p>Count 2: {count2}</p>
      <Button onClick={handleClick1} text="Button 1" />
      <Button onClick={handleClick2} text="Button 2" />
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        (Check console - only the relevant button re-renders when clicked)
      </p>
    </div>
  );
}

// Main component showing all examples
function UseCallback2() {
  return (
    <div>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <WithoutCallbackExample />
      </div>
      <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
        <WithCallbackExample />
      </div>
    </div>
  );
}

export default UseCallback2;

