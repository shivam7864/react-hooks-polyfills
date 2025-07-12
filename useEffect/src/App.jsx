import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useMyEffect from "./hooks/useMyEffect";

function App() {
  const [count, setCount] = useState(0);
  

  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    setCount(count - 1);
  };


  useMyEffect(()=>{
    console.log("useMyEffect initial without deps array");
    return (()=>{
      console.log("Clean up called");
      
    })
  })

  useMyEffect(()=>{
    console.log("useMyEffect with empty deps array");
    return (()=>{
      console.log("Clean up called");
      
    })
  },[])
  
  useMyEffect(()=>{
    console.log("useMyEffect with count deps array");
    return (()=>{
      console.log("Clean up called");
      
    })
  },[count])

  return (
    <>
      <button onClick={increase} style={{ marginRight: "12px" }}>
        +
      </button>
      <span style={{ marginRight: "12px" }}>{count}</span>
      <button onClick={decrease}>-</button>
    </>
  );
}

export default App;
