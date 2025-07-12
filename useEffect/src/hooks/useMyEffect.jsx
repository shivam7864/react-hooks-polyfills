import { useRef } from "react"

const useMyEffect = (callback,depsArray) =>{

    const firstRenderRef = useRef(true);
    const prevDepsArrayRef = useRef([]);
    const cleanUpRef = useRef(null);

    if(firstRenderRef.current){
        callback();
        firstRenderRef.current=false;
        cleanUpRef.current = callback();
        return;
    }

    let depsChanged = true;
    if(depsArray){
        depsChanged = checkIfDepsChanged(prevDepsArrayRef.current,depsArray);
    }
    if(depsChanged){
        if(typeof cleanUpRef.current === "function"){
            cleanUpRef.current();
        }
        callback();
    }
    prevDepsArrayRef.current = depsArray;
}

const checkIfDepsChanged = (prev,next)=>{
    let hasDepsChanged = false;
    if(!next.length){
        hasDepsChanged = false;
    }

    for(let i=0;i<next.length;i++){
        const prevValue = prev[i];
        const nextValue = next[i];
        hasDepsChanged = !Object.is(prevValue,nextValue);
        if(hasDepsChanged){
            break;
        }
    }
    return hasDepsChanged;

}

export default useMyEffect