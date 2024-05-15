import React, {Dispatch, SetStateAction, useEffect, useState} from "react";

export function useGetRecordsFor<T>(url: string): [T[], Dispatch<SetStateAction<T[]>>, boolean, Error | null] {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async  function fetchData() {
            try {
                console.log(url)
                setLoading(true);
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
        fetchData();
    }, [url])

    return [data, setData, loading, error];
}
