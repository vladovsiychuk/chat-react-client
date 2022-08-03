import axios from 'axios';
// import createAuthRefreshInterceptor from 'axios-auth-refresh';
// import store from 'state/store';
// import { refreshAuth } from './auth/actions';
// import { getAccessToken } from './middleware/authMiddleware';

const instance = axios.create();

// instance.interceptors.request.use(request => {
//     if (request.shouldAddToken) {
//         const accessToken = getAccessToken();
//         request.headers['Authorization'] = `Bearer ${accessToken}`;
//     }
//     return request;
// });

// async function refreshAuthLogic(failedRequest) {
//     try {
//         await store.dispatch(refreshAuth());
//         const accessToken = getAccessToken();
//         failedRequest.response.config.headers['Authorization'] = `Bearer ${accessToken}`;
//         return Promise.resolve();
//     } catch (error) {
//         return Promise.reject(error);
//     }
// }

// createAuthRefreshInterceptor(instance, refreshAuthLogic);

export default instance;
