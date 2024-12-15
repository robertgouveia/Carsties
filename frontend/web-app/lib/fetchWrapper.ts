import {auth} from "@/auth";

const baseUrl = 'http://localhost:6001/'

async function handleResponse(response: Response) {
    const text = await response.text();
    const data = text && JSON.parse(text);

    if (response.ok) return data || response.statusText;

    return {
        error: {
            status: response.status,
            statusText: response.statusText,
        }
    };
}

async function getHeaders() {
    const session = await auth();

    const headers = {
        "Content-Type": "application/json",
        "Authorization": "",
    } as any;

    if (session?.access_token) headers.Authorization = "Bearer " + session.access_token;

    return headers;
}

async function get(url: string) {

    const requestOptions = {
        method: 'GET',
        headers: await getHeaders(),
    };

    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

async function post(url: string, body: object) {
    const requestOptions = {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(body)
    };

    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

async function put(url: string, body: object) {
    const requestOptions = {
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify(body)
    };

    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

async function del(url: string) {
    const requestOptions = {
        method: 'DELETE',
        headers: await getHeaders(),
    };

    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

export const fetchWrapper = {
    get,
    post,
    put,
    del
}