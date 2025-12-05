import { useState, useEffect } from "react";

// useEffect runs on every render. That means that when the count changes, a render happens, which then triggers another effect.
// WARNING: This will cause an infinite loop!
function TimerInfinite() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  }); // <- no dependency array, so it runs on every render.

  return <h1>I've rendered {count} times!</h1>;
}

// Only run the effect on the initial render
function TimerOnce() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  
    return () => clearTimeout(timer);
  }, []); // <- empty dependency array, runs only on mount
  
  return <h1>I've rendered {count} times!</h1>;
}

// Here is an example of a useEffect Hook that is dependent on a variable. If the count variable updates, the effect will run again:
function Counter() {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]); // <- add the count variable here

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
    </>
  );
}

// Main component showing all examples
function UseEffect() {
  return (
    <div>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid red' }}>
        <h2>Infinite Loop Example (Don't use in production!)</h2>
        <TimerInfinite />
      </div>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid blue' }}>
        <h2>Run Once on Mount</h2>
        <TimerOnce />
      </div>
      <div style={{ padding: '1rem', border: '1px solid green' }}>
        <h2>Run When Dependency Changes</h2>
        <Counter />
      </div>
    </div>
  );
}

export default UseEffect;
