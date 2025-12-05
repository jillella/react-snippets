// The React useState Hook allows us to track state in a function component.
// The useState Hook can be used to keep track of strings, numbers, booleans, arrays, objects, and any combination of these!

import { useState } from 'react';

// Update State with a button click
function FavoriteColor() {
  const [color, setColor] = useState("red");

  return (
    <>
      <h1>My favorite color is {color}!</h1>
      <button
        type="button"
        onClick={() => setColor("blue")}
      >Blue</button>
    </>
  )
}

// Create multiple state Hooks
function MyCarMultiple() {
  const [brand, setBrand] = useState("Ford");
  const [model] = useState("Mustang");
  const [year] = useState("1964");
  const [color, setColor] = useState("red");

  return (
    <>
      <h1>My {brand}</h1>
      <p>
        It is a {color} {model} from {year}.
      </p>
      <div>
        <button onClick={() => setBrand("Toyota")}>Change Brand</button>
        <button onClick={() => setColor("blue")}>Change Color</button>
      </div>
    </>
  )
}

// Create a single Hook that holds an object:
function MyCarObject() {
  const [car] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"
  });

  return (
    <>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        (This example shows object state structure - see next example for updating)
      </p>
    </>
  )
}

// Updating Objects and Arrays in State
// When state is updated, the entire state gets overwritten.
// What if we only want to update the color of our car?
// If we only called setCar({color: "blue"}), this would remove the brand, model, and year from our state.
// We can use the JavaScript spread operator to help us.

// Use the JavaScript spread operator to update only the color of the car:
function MyCarUpdate() {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"
  });

  const updateColor = () => {
    setCar(previousState => {
      return { ...previousState, color: "blue" }
    });
  }

  return (
    <>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
      <button
        type="button"
        onClick={updateColor}
      >Blue</button>
    </>
  )
}

// Main component showing all examples
function UseState() {
  return (
    <div>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>Update State with Button Click</h2>
        <FavoriteColor />
      </div>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>Multiple State Hooks</h2>
        <MyCarMultiple />
      </div>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>Single Hook with Object</h2>
        <MyCarObject />
      </div>
      <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
        <h2>Updating Object State with Spread Operator</h2>
        <MyCarUpdate />
      </div>
    </div>
  );
}

export default UseState;