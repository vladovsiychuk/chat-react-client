const axios = require('axios');

function isJsonResponse(response = { headers: {} }) {
    const contentType = response.headers['content-type'];
    return !!contentType?.includes('application/json');
}

// function isStreamResponse(response) {
//     const contentType = response.headers['content-type'];
//     return !!contentType?.includes('application/octet-stream');
// }
//
// function isEmptyResponse(response) {
//     return response.status === 204;
// }

/**
 * Make an authorized API call to TW's API server
 * @param path
 * @param method
 * @param body
 * @param query
 * @param headers
 * @return {Promise<any>}
 */
// export async function authorized({
//     path = '',
//     method = 'GET',
//     body = undefined,
//     query = undefined,
//     headers = {},
//     multipart = false,
//     aiService,
//     responseType = undefined,
// }) {
//     const constructedHeaders = {
//         ...getDefaultHeaders(),
//         ...headers,
//     };
//     if (multipart) {
//         delete constructedHeaders['Content-Type'];
//     }
//     try {
//         const response = await axios({
//             method: method.toLowerCase(),
//             url: buildUrl({
//                 path,
//                 query,
//                 aiService,
//             }),
//             data: body,
//             headers: constructedHeaders,
//             responseType,
//             shouldAddToken: true,
//         });
//
//         return isEmptyResponse(response)
//             ? ''
//             : isJsonResponse(response) || isStreamResponse(response)
//             ? response.data
//             : response;
//     } catch (error) {
//         if (isJsonResponse(error.response)) {
//             throw error.response.data;
//         }
//         throw error;
//     }
// }

/**
 * Make an unauthorized API call to TW's API server
 * @param path
 * @param method
 * @param body
 * @param query
 * @param headers
 * @return {Promise<any>}
 */
export async function unauthorized({
    path = '',
    method = 'GET',
    body = undefined,
    query = undefined,
    headers = {},
}) {
    // const constructedHeaders = {
    //     ...getDefaultHeaders(),
    //     ...headers,
    // };
    // if (keyCloak) {
    //     constructedHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
    //     delete constructedHeaders['X-App-Lang'];
    //     delete constructedHeaders['X-Transaction-Id'];
    // }
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

/**
 * @param {Error || null}
 * @returns {Array<String>}
 */
export function getErrorFields(error) {
    return error?.errorFields ?? [];
}

/**
 * @param {Error || null}
 * @returns {Array<object>}
 */
export function getErrorDetails(error) {
    return error?.detailErrors ?? [];
}

/**
 * @param {Object} keyValueMap example: {foo: 'bar'}
 */
export function getFormData(keyValueMap) {
    const formData = new FormData();
    Object.keys(keyValueMap).forEach(key => {
        formData.append(key, keyValueMap[key]);
    });
    return formData;
}
