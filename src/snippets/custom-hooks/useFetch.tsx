import { useState, useEffect } from "react";

// Custom Hook: useFetch
const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data];
};

// Export the hook as a named export
export { useFetch };

// Example 1: Without a custom Hook
// Use the JSONPlaceholder service to fetch some fake titles and display them
function HomeWithoutHook() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      {data &&
        data.map((item: any) => {
          return <p key={item.id}>{item.title}</p>;
        })}
    </>
  );
}

// Example 2: Using the custom Hook
// Import and use the newly created custom Hook
function HomeWithHook() {
  const [data] = useFetch("https://jsonplaceholder.typicode.com/todos");

  return (
    <>
      {data &&
        data.map((item: any) => {
          return <p key={item.id}>{item.title}</p>;
        })}
    </>
  );
}

// Main component showing all examples
function UseFetch() {
  return (
    <div>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>Example 1: Without Custom Hook</h2>
        <p>Fetching data directly in the component:</p>
        <HomeWithoutHook />
      </div>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>Example 2: With Custom Hook (useFetch)</h2>
        <p>Using the custom Hook to fetch data:</p>
        <HomeWithHook />
      </div>
    </div>
  );
}

export default UseFetch;
