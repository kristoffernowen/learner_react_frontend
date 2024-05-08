export async function get<T>(url: string) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error('custom fetch failed');
    }
    const data = await response.json() as unknown;
    return data as T;
}

export async function post<T, U>(url: string, body: U ) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error('custom fetch failed');
    }

    const data = await response.json() as unknown;
    return data as T;
}
