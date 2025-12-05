// The React useReducer Hook is similar to useState but gives you more control over state management.
// useReducer is useful when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

import { useReducer } from 'react';

// Basic counter with useReducer
// useReducer accepts a reducer function and an initial state
function CounterBasic() {
  const initialState = 0;
  
  const reducer = (state: number, action: string) => {
    switch (action) {
      case 'increment':
        return state + 1;
      case 'decrement':
        return state - 1;
      case 'reset':
        return initialState;
      default:
        return state;
    }
  };

  const [count, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h1>Count: {count}</h1>
      <div>
        <button onClick={() => dispatch('increment')}>Increment</button>
        <button onClick={() => dispatch('decrement')}>Decrement</button>
        <button onClick={() => dispatch('reset')}>Reset</button>
      </div>
    </>
  );
}

// Counter with action objects (more flexible pattern)
// Using action objects allows you to pass additional data with actions
function CounterWithActionObjects() {
  type Action = 
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'reset' }
    | { type: 'incrementBy'; payload: number };

  const initialState = 0;
  
  const reducer = (state: number, action: Action) => {
    switch (action.type) {
      case 'increment':
        return state + 1;
      case 'decrement':
        return state - 1;
      case 'reset':
        return initialState;
      case 'incrementBy':
        return state + action.payload;
      default:
        return state;
    }
  };

  const [count, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h1>Count: {count}</h1>
      <div>
        <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
        <button onClick={() => dispatch({ type: 'incrementBy', payload: 5 })}>Increment by 5</button>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      </div>
    </>
  );
}

// Counter with complex state object
// useReducer is especially useful when managing complex state
function CounterWithStateObject() {
  type State = {
    count: number;
    step: number;
  };

  type Action =
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'reset' }
    | { type: 'setStep'; payload: number };

  const initialState: State = {
    count: 0,
    step: 1
  };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'increment':
        return { ...state, count: state.count + state.step };
      case 'decrement':
        return { ...state, count: state.count - state.step };
      case 'reset':
        return initialState;
      case 'setStep':
        return { ...state, step: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h1>Count: {state.count}</h1>
      <p>Step: {state.step}</p>
      <div>
        <button onClick={() => dispatch({ type: 'increment' })}>Increment by {state.step}</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>Decrement by {state.step}</button>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label>
          Step:
          <input
            type="number"
            value={state.step}
            onChange={(e) => dispatch({ type: 'setStep', payload: Number(e.target.value) })}
            style={{ marginLeft: '0.5rem', width: '60px' }}
          />
        </label>
      </div>
    </>
  );
}

// Main component showing all examples
function UseReducer() {
  return (
    <div>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>Basic Counter with useReducer</h2>
        <CounterBasic />
      </div>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>Counter with Action Objects</h2>
        <CounterWithActionObjects />
      </div>
      <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
        <h2>Counter with Complex State Object</h2>
        <CounterWithStateObject />
      </div>
    </div>
  );
}

export default UseReducer;

