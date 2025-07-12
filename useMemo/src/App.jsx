import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useMyMemo from './hooks/useMyMemo'

function App() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(100)

  const squareCount = () =>{
    console.log("Expensive cAlc");
    return count * count;
  }

  const increase = () =>{
    console.log("Expensive cAlc");
    setCount(count+1);
  }

  const memoizedSquaredCount = useMyMemo(squareCount,[count])
  // console.log(memoizedSquaredCount);
  
  return (
   <>
   <h1>Counter : {count}</h1>
   <h1>Squared Counter : {memoizedSquaredCount}</h1>
   <button onClick={increase}>Increment</button>
   <h1>Counter 2 : {count2}</h1>
   <button onClick={()=>setCount2(count2-1)}>Decrement</button>
   </>
  )
}

export default App
