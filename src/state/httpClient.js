import axios from './axios';

function isJsonResponse(response = { headers: {} }) {
    const contentType = response.headers['content-type'];
    return !!contentType?.includes('application/json');
}

function getDefaultHeaders() {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
}

function isStreamResponse(response) {
    const contentType = response.headers['content-type'];
    return !!contentType?.includes('application/octet-stream');
}

function isEmptyResponse(response) {
    return response.status === 204;
}

export async function authorized({
    path = '',
    method = 'GET',
    body = undefined,
    query = undefined,
    headers = {},
    multipart = false,
    responseType = undefined,
}) {
    const constructedHeaders = {
        ...getDefaultHeaders(),
        ...headers,
    };
    if (multipart) {
        delete constructedHeaders['Content-Type'];
    }
    try {
        const response = await axios({
            method: method.toLowerCase(),
            url: path,
            data: body,
            headers: constructedHeaders,
            responseType,
            shouldAddToken: true,
        });

        return isEmptyResponse(response)
            ? ''
            : isJsonResponse(response) || isStreamResponse(response)
            ? response.data
            : response;
    } catch (error) {
        if (isJsonResponse(error.response)) {
            throw error.response.data;
        }
        throw error;
    }
}

export async function unauthorized({
    path = '',
    method = 'GET',
    body = undefined,
    query = undefined,
    headers = {},
}) {
    try {
        const response = await axios({
            url:  path,
            method: method.toLowerCase(),
            data: body,
            skipAuthRefresh: true,
        });

        return isJsonResponse(response) ? response.data : response;
    } catch (err) {
        if (isJsonResponse(err.response)) {
            throw err.response.data;
        }
        throw err;
    }
}

export function getErrorFields(error) {
    return error?.errorFields ?? [];
}

export function getErrorDetails(error) {
    return error?.detailErrors ?? [];
}

export function getFormData(keyValueMap) {
    const formData = new FormData();
    Object.keys(keyValueMap).forEach(key => {
        formData.append(key, keyValueMap[key]);
    });
    return formData;
}
