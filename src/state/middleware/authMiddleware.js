// import types from '../auth/types';

const ACCESS_TOKEN = 'JWT';


function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [k,v] = el.split('=');
        cookie[k.trim()] = v;
    })
    return cookie[name];
}

/**
 *
 * @returns {{accessToken: string, refreshToken: string}}
 */
function getHydratedAuth() {
    try {
        return {
            accessToken: getCookie(ACCESS_TOKEN),
        };
    } catch (e) {
        return {
            accessToken: undefined,
        };
    }
}

export function getAccessToken() {
    return getHydratedAuth().accessToken;
}

export default getAccessToken();
