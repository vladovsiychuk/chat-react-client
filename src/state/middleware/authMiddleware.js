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
            // refreshToken: localStorage.getItem(REFRESH_TOKEN),
        };
    } catch (e) {
        return {
            accessToken: undefined,
            // refreshToken: undefined,
        };
    }
}

export function getAccessToken() {
    return getHydratedAuth().accessToken;
}

// export function getRefreshToken() {
//     return getHydratedAuth().refreshToken;
// }

// const authMiddleware = () => {
//     /**
//      * @param {{ expires_in: number, access_token: string, refresh_token: string }} authData
//      */
//     const onAuthData = authData => {
//         try {
//             localStorage.setItem(ACCESS_TOKEN, authData.access_token);
//             localStorage.setItem(REFRESH_TOKEN, authData.refresh_token);
//         } catch (e) {
//             // ignore
//         }
//     };
//
//     const clearAuthData = () => {
//         try {
//             localStorage.removeItem(ACCESS_TOKEN);
//             localStorage.removeItem(REFRESH_TOKEN);
//         } catch (e) {
//             // ignore
//         }
//     };
//
//     return () => next => action => {
//         switch (action.type) {
//             case types.AUTH_LOGIN_SUCCESS: {
//                 onAuthData(action.data);
//                 return next(action);
//             }
//             case types.AUTH_REFRESH_SUCCESS: {
//                 onAuthData(action.data);
//                 return next(action);
//             }
//             case types.AUTH_LOGOUT: {
//                 clearAuthData();
//                 return next(action);
//             }
//             default: {
//                 return next(action);
//             }
//         }
//     };
// };

export default getAccessToken();
