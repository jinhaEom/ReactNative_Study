import { useEffect, useState } from "react";

const getRandomCookieKey = () => {
    const cookieLen = 15;
    const randomNum = Math.floor(Math.random() * cookieLen);
    return `cookie_${randomNum + 1}`
}

export const useCookies = () => {
    const [cookieKey, setCookieKey] = useState("");

    useEffect(() => {
        const randomCookieKey = getRandomCookieKey();
        setTimeout(() => {
            setCookieKey(randomCookieKey);
        }, 2000);
    }, [])

    return {
        cookieKey,
    }
}

