export default {
    ROOMS_GET: {
        method: 'GET',
        path: 'http://localhost:8082/v1/rooms',
    },
    CURRENT_USER_GET: {
        method: 'GET',
        path: 'http://localhost:8082/v1/users/currentUser',
    },

    CURRENT_USER_POST: {
        method: 'POST',
        path: 'http://localhost:8082/v1/users/currentUser',
    },

    SEARCH_USERS_GET: {
        method: 'GET',
        path: (query) => `http://localhost:8082/v1/users/?query=${query}`,
    },
}
