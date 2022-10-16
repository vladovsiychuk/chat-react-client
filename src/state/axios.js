import axios from 'axios';
import { getAccessToken } from './middleware/authMiddleware';

const instance = axios.create();

instance.interceptors.request.use(request => {
    if (request.shouldAddToken) {
        const accessToken = getAccessToken();
        request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
});

export default instance;
