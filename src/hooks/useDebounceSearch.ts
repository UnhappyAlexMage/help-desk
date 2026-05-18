import { useEffect, useState } from "react";

export const useDebounceSearch = <T>(value: T, delay = 1000) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => { clearTimeout(timeoutId) };
    }, [delay, value]);

    return debounceValue;
};