// The useRef Hook allows you to persist values between renders.
// It can be used to store a mutable value that does not cause a re-render when updated.
// It can be used to access a DOM element directly.

import { useState, useRef, useEffect } from 'react';

// Does Not Cause Re-renders
// If we tried to count how many times our application renders using the useState Hook,
// we would be caught in an infinite loop since this Hook itself causes a re-render.
// To avoid this, we can use the useRef Hook.
function RenderCount() {
  const [inputValue, setInputValue] = useState("");
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <>
      <p>Type in the input field:</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h1>Render Count: {count.current}</h1>
    </>
  );
}

// Accessing DOM Elements
// The useRef Hook is often used to access DOM elements directly.
// First, we create a ref using the useRef Hook.
// Then, we attach the ref to a DOM element using the ref attribute in JSX.
// Finally, we can access the DOM element using the current property.
function FocusInput() {
  const inputElement = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputElement.current?.focus();
  };

  return (
    <>
      <input type="text" ref={inputElement} />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}

// Tracking State Changes
// The useRef Hook can also be used to keep track of previous state values.
// This is because we are able to persist useRef values between renders.
function TrackPreviousState() {
  const [inputValue, setInputValue] = useState("");
  const previousInputValue = useRef("");

  useEffect(() => {
    previousInputValue.current = inputValue;
  }, [inputValue]);

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h2>Current Value: {inputValue}</h2>
      <h2>Previous Value: {previousInputValue.current}</h2>
    </>
  );
}

// Main component showing all examples
function UseRef() {
  return (
    <div>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>Tracking Renders (Does Not Cause Re-renders)</h2>
        <RenderCount />
      </div>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>Accessing DOM Elements</h2>
        <FocusInput />
      </div>
      <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
        <h2>Tracking Previous State Values</h2>
        <TrackPreviousState />
      </div>
    </div>
  );
}

export default UseRef;

