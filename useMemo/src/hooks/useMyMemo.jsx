// Import React hooks
import { useEffect, useRef } from "react";

// Helper function to compare previous and current dependency arrays
const areEqual = (prevDeps, nextDeps) => {
  let hasDepsChanged = false;

  // If nextDeps is empty, we assume nothing has changed
  if (!nextDeps.length) {
    hasDepsChanged = false;
  }

  // Loop through each dependency to compare values
  for (let i = 0; i < nextDeps.length; i++) {
    const prevValue = prevDeps[i];
    const nextValue = nextDeps[i];

    // Check if values are different using Object.is for strict comparison
    hasDepsChanged = !Object.is(prevValue, nextValue);

    // If any dependency has changed, exit early
    if (hasDepsChanged) {
      break;
    }
  }

  // Return true if dependencies have changed, false otherwise
  return hasDepsChanged;
};

// Custom hook similar to useMemo
const useMyMemo = (callback, depsArray) => {
  // Create a mutable ref to store memoized value and dependencies
  const memoizedRef = useRef(null);

  // If no memo exists yet OR dependencies have changed
  if (
    !memoizedRef.current ||                       // First render: nothing memoized yet
    areEqual(memoizedRef.current.depsArray, depsArray) // Dependencies changed: recalculate
  ) {
    // Recalculate and store new value and deps
    memoizedRef.current = {
      value: callback(),   // Execute the callback to get the memoized value
      depsArray,           // Store current dependencies
    };
  }

  // Cleanup effect that resets the memo on unmount
  useEffect(() => {
    return () => {
      memoizedRef.current = null; // Clear memo on component unmount
    };
  }, []); // Empty dependency array: runs only once

  // Return the memoized value
  return memoizedRef.current.value;
};

export default useMyMemo; // Export the custom hook
