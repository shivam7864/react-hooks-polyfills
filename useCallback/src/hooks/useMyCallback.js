import { useEffect, useRef } from "react";

const areEqual = (next = [], prev = []) => {
  let hasDepsChanged = false;
  if (!next.length) {
    hasDepsChanged = false;
  }
  if (prev.length !== next.length) {
    hasDepsChanged = false;
    return hasDepsChanged;
  }
  for (let i = 0; i < next.length; i++) {
    const nextValue = next[i];
    const prevValue = prev[i];
    hasDepsChanged = !Object.is(nextValue, prevValue);
    if (hasDepsChanged) break;
  }
  return hasDepsChanged;
};

const useMyCallback = (callback, depsArray) => {
  const memoizedRef = useRef([]);
  if (
    !memoizedRef.current ||
    areEqual(memoizedRef.current.depsArray, depsArray)
  ) {
    memoizedRef.current = {
      fn: callback(),
      depsArray,
    };
  }

  useEffect(() => {
    return () => {
      memoizedRef.current = null;
    };
  }, []);
  return memoizedRef.current.fn;
};
export default useMyCallback;
