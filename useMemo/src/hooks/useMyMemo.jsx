import { useEffect, useRef } from "react";

const areEqual = (prevDeps, nextDeps) => {
  //   if (prevDeps === null) return false;
  //   if (prevDeps.length !== nextDeps.length) return false;

  //   for (let i = 0; i < prevDeps.length; i++) {
  //     if (prevDeps[i] !== nextDeps[i]) return false;
  //   }
  //   return true;

  let hasDepsChanged = false;
  if (!nextDeps.length) {
    hasDepsChanged = false;
  }

  for (let i = 0; i < nextDeps.length; i++) {
    const prevValue = prevDeps[i];
    const nextValue = nextDeps[i];
    hasDepsChanged = !Object.is(prevValue, nextValue);
    if (hasDepsChanged) {
      break;
    }
  }
  return hasDepsChanged;
};

const useMyMemo = (callback, depsArray) => {
  const memoizedRef = useRef(null);

  if (
    !memoizedRef.current ||
    areEqual(memoizedRef.current.depsArray, depsArray)
    // !areEqual(memoizedRef.current.depsArray, depsArray)
  ) {
    memoizedRef.current = {
      value: callback(),
      depsArray,
    };
  }

  useEffect(() => {
    return () => {
      memoizedRef.current = null;
    };
  }, []);
  return memoizedRef.current.value;
};

export default useMyMemo;
