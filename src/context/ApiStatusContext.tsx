import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {urls} from "../utilities/urls";

const ApiStatusContext = createContext<boolean>(false);

const wakeUpApi = async () => {
    try{
        const response = await fetch(urls.getExercises);
        if(!response.ok){
            console.error("Api wakeup call. The first is expected to fail.", response.statusText)
        }
    } catch (error: unknown) {
        if(error instanceof Error){
            console.error("An unexpected error occurred", error.message);
        } else {
            console.error("An unexpected error occurred");
        }
    }
};

export function ApiStatusProvider({ children }: { children: ReactNode }) {
    const [apiReady, setApiReady] = useState(false);

    useEffect(() => {
        wakeUpApi().then(() => setApiReady(true)).then(() => console.log("API wakeup call completed, API should be ready."));
    }, []);

    useEffect(() => {
        if (apiReady) {
            console.log("API is ready for use.");
        } else {
            console.log("API is not ready yet.");
        }
    }, [apiReady]);

    return (
        <ApiStatusContext.Provider value={apiReady}>
            {children}
        </ApiStatusContext.Provider>
    );
}

export function useApiStatus() {
    return useContext(ApiStatusContext);
}
