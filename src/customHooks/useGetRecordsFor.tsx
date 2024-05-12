import React, {useEffect, useState} from "react";

export function useGetRecordsFor<T>(url: string): [T[], boolean, Error | null] {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

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
        fetchData();
    }, [])

    return [data, loading, error];
}
