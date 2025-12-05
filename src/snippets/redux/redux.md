# What is Redux?
Redux is a predictable state container for JavaScript apps.

It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.

On top of that, it provides a great developer experience, such as time travel, hot reloading, and support for many tools.

# Redux Toolkit

Redux Toolkit is a package that provides a set of tools and utilities for working with Redux.
It is built on top of Redux and provides a more intuitive and easier to use API for working with Redux.

# Redux Toolkit features:
- Immer support (allows mutating state in reducers)
- Built-in thunk support (async actions)
- Built-in dev tools support
- Simplified API (less boilerplate)

# What is a Redux store?
A Redux store is a JavaScript object that holds the entire state tree of your application.
It is the single source of truth for the state of your application.
Only the store can change its own state through reducers.

# What is a Redux slice?
A Redux slice is a collection of Redux reducer logic and actions for a single feature.
It contains:
- Initial state
- Reducer functions (how state updates)
- Action creators (functions that return actions)

# Redux flow:

## 1. **Store Setup** (`store.ts`)
```4:8:src/snippets/redux/store.ts
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```
Creates the Redux store with the `counter` reducer. The store holds the app state.

## 2. **Provider Connection** (`main.tsx`)
```11:11:src/main.tsx
    <Provider store={store}>
```
Wraps the app with `<Provider>` so components can access the store via hooks.

## 3. **Slice Definition** (`counterSlice.ts`)
```11:28:src/snippets/redux/counterSlice.ts
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});
```
- Defines initial state: `{ value: 0 }`
- Defines reducers (state updates)
- Exports action creators: `increment()`, `decrement()`, etc.

## 4. **Component Usage** (`ReduxCounter.tsx`)
```5:6:src/snippets/redux/ReduxCounter.tsx
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
```
- `useAppSelector`: reads `state.counter.value` from the store
- `useAppDispatch`: returns the dispatch function to send actions

## 5. **Dispatching Actions**
```16:21:src/snippets/redux/ReduxCounter.tsx
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
          <button onClick={() => dispatch(incrementByAmount(5))}>
            Add 5
          </button>
          <button onClick={() => dispatch(reset())}>Reset</button>
```

## Complete Flow:
1. User clicks button → `dispatch(increment())` is called
2. Action is sent to the store
3. Store runs the matching reducer (`increment`)
4. State updates: `state.counter.value` changes
5. Components using `useAppSelector` re-render with the new value

The typed hooks (`useAppSelector`/`useAppDispatch`) add TypeScript support so you get autocomplete and type checking for the state shape.