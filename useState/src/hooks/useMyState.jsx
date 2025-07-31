import { useReducer } from "react"; // Importing useReducer to force re-renders when state changes

const states = []; // Global array to store state values across hook calls
let flag = 0; // Global counter to track the order of hook calls during a single render

const useMyState = (initValue) => {
    const callId = flag++; // Assign a unique ID based on call order, then increment flag

    const [, renderer] = useReducer(() => ({})); // Dummy reducer: doesn't change state, just forces re-render

    console.log(flag); // Logs current hook call order for debugging

    // Function to force component to re-render
    const forceUpdate = () => {
        flag = 0;        // Reset flag to 0 for the next render cycle
        renderer({});    // Trigger re-render by dispatching a dummy object
    };

    // If state already exists for this callId (i.e., this hook call position), reuse it
    if (states[callId]) {
        return states[callId]; // Return the existing [value, setValue] tuple
    }

    // Setter function to update the state value
    const setValue = (newValue) => {
        const needToReRender = !Object.is(states[callId][0], newValue); // Only update if value actually changed. Like we pass same value in increase function and remove this needtorender check then the state will be rerendered again even the data are same.
        states[callId][0] = newValue; // Set the new value in the global states array
        needToReRender && forceUpdate(); // If changed, trigger re-render
    };

    const tuple = [initValue, setValue]; // Create a [value, setValue] tuple just like React's useState
    states[callId] = tuple; // Store the tuple in the global states array at the index for this call
    return tuple; // Return the tuple so component can use it
};

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

export default useMyState; // Export the custom hook so it can be used in other components
