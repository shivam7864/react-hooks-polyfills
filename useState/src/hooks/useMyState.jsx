import { useReducer } from "react";

const states = [];
let flag = 0;
const useMyState = (initValue) =>{
    const callId = flag++;
    
    const [,renderer] = useReducer(()=>({}));

    console.log(flag);
    
    const forceUpdate = ()=>{
        flag=0;
        renderer({});
    }

    if(states[callId]){
        return states[callId];
    }

    const setValue = (newValue)=>{
        const needToReRender = !Object.is(states[callId][0],newValue);
        states[callId][0] = newValue;
        needToReRender && forceUpdate();
    }

    const tuple = [initValue,setValue];
    states[callId]=tuple
    return tuple;
}

//This will update the all the states if any state is updated

// let defaultValue
// function useMyState(initValue){
//     defaultValue = defaultValue || initValue;
//     const [,renderer] = useReducer(()=>({}));

//     function forceUpdate(){
//         renderer({});
//     }

//     function setValue(newValue){
//         defaultValue=newValue;
//         forceUpdate();
//     }

//     return [defaultValue,setValue];
// }

export default useMyState;