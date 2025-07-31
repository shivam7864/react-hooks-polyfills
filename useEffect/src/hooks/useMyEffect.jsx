import { useRef } from "react"; // Import useRef to persist values across renders

const useMyEffect = (callback, depsArray) => {
    const firstRenderRef = useRef(true); // Tracks if this is the first render
    const prevDepsArrayRef = useRef([]); // Stores previous dependency array
    const cleanUpRef = useRef(null); // Stores the cleanup function from the last effect

    if (firstRenderRef.current) { // If it's the first render
        callback(); // Call the effect function initially
        firstRenderRef.current = false; // Mark first render as completed
        cleanUpRef.current = callback(); // Store cleanup function if returned
        return; // Skip the rest
    }

    let depsChanged = true; // Assume dependencies have changed by default

    if (depsArray) { // If dependencies are provided
        depsChanged = checkIfDepsChanged(prevDepsArrayRef.current, depsArray); // Compare current and previous deps
    }

    if (depsChanged) { // If dependencies have changed
        if (typeof cleanUpRef.current === "function") { // If there's a cleanup function
            cleanUpRef.current(); // Call the previous cleanup
        }
        callback(); // Run the new effect
    }

    prevDepsArrayRef.current = depsArray; // Save current dependencies for next comparison
};

// Function to compare two dependency arrays
const checkIfDepsChanged = (prev, next) => {
    let hasDepsChanged = false;

    if (!next.length) { // If dependencies are empty
        hasDepsChanged = false; // No change
    }

    for (let i = 0; i < next.length; i++) { // Loop through each dependency
        const prevValue = prev[i]; // Previous value at index i
        const nextValue = next[i]; // Current value at index i
        hasDepsChanged = !Object.is(prevValue, nextValue); // Use Object.is to compare values
        if (hasDepsChanged) break; // Exit early if any dependency changed
    }

    return hasDepsChanged; // Return whether a change was found
};

export default useMyEffect; // Export the custom effect hook
