import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue=[]) => {
    if(localStorage.getItem(key)){
        initialValue = JSON.parse(localStorage.getItem(key));
    }
    const [storedValue, setStorageValues] = useState(initialValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [key, storedValue]);
    return [storedValue, setStorageValues]
}

export default useLocalStorage;