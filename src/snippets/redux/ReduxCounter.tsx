import { useAppDispatch, useAppSelector } from './hooks';
import { increment, decrement, incrementByAmount, reset } from './counterSlice';

function ReduxCounter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <h2>Redux Counter Example</h2>
      <div className="card">
        <div style={{ fontSize: '2rem', margin: '20px 0' }}>
          Count: <strong>{count}</strong>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
          <button onClick={() => dispatch(incrementByAmount(5))}>
            Add 5
          </button>
          <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
      </div>
      <p className="read-the-docs">
        This counter uses Redux Toolkit for state management
      </p>
    </>
  );
}

export default ReduxCounter;

