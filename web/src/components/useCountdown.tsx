import { useEffect, useState } from "react";

export const useCountdown = (length: number) => {
    const [seconds, setSeconds] = useState(length);
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSeconds((prevSeconds) => 
                prevSeconds > 0 ? prevSeconds - 1 : prevSeconds, 
            );
        }, 1000);

        return () => clearTimeout(timeoutId)

    }, [seconds]);

    return { seconds };

}