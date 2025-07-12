import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useMyState from "./hooks/useMyState";

function App() {
  const [count, setCount] = useMyState(0);

  const [myCount,setMyCount] = useMyState(0);

  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    setCount(count - 1);
  };

   const increaseUseMyState = () => {
    setMyCount(myCount + 1);
  };
  const decreaseseMyState = () => {
    setMyCount(myCount - 1);
  };

  return (
    <>
      <button onClick={increase} style={{ marginRight: "12px" }}>
        +
      </button>
      <span style={{ marginRight: "12px" }}>{count}</span>
      <button onClick={decrease}>-</button>

      <h1>My useState</h1>

      <button onClick={increaseUseMyState} style={{ marginRight: "12px" }}>
        +
      </button>
      <span style={{ marginRight: "12px" }}>{myCount}</span>
      <button onClick={decreaseseMyState}>-</button>
    </>
  );
}

export default App;
