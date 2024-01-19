import { useMemo, useState } from "react";

export const useCountdown = (sec: number) => {
    const [seconds, setSeconds] = useState(sec);
    
    useMemo(() => {
        const timeoutId = setTimeout(() => {
            setSeconds((prevSeconds) => 
                prevSeconds > 0 ? prevSeconds - 1 : prevSeconds, 
            );
        }, 1000);

        return () => clearTimeout(timeoutId)
    }, [seconds]);

    return { seconds };

}