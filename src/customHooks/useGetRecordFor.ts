import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import { useApiStatus } from "../context/ApiStatusContext";
import { demoLandscapeData } from "../data/data";

export function useGetRecordFor<T>(url:string, initialData: T): [T, Dispatch<SetStateAction<T>>, boolean, Error | null] {

    const apiReady = useApiStatus();
    const [data, setData] = useState<T>(initialData);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    
    if(url.endsWith("/demo-123") && data === initialData){
        setData(demoLandscapeData as unknown as T);
        setLoading(false);
    }

    useEffect(() => {
        async  function fetchData() {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    }
                });
                const data = await response.json();
                setData(data);
            } catch (error: unknown) {
                setError(error as React.SetStateAction<Error | null>);
            } finally {
                setLoading(false);
            }
        }
        if (apiReady && !url.endsWith("/demo-123")) {
            fetchData();
        } else {
            console.log("API is not ready yet, use demoData");
        }
    }, [url, apiReady]);

    return [data, setData, loading, error];
}
