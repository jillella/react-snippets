function JSX() {
  const name = "John";
  const age = 10;
  const isOverAge = age >= 18;
  return (
    <>
      <h2>JSX Snippet</h2>
      <h3>Hello, {name}!</h3>
      <p>You are {age} years old.</p>
      <p>You are {isOverAge ? "over 18" : "under 18"}.</p>

      {/* difference between ? and && */}
      {/* ? is used to render a different element based on a condition */}
      {/* && is used to render a element only if a condition is true */}
      {isOverAge ? <p>You are over 18.</p> : <p>You are under 18.</p>}
      {isOverAge && <p>You are over 18.</p>}
    </>
  );
}

export default JSX;
